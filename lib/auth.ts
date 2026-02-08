import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";
import type { Role, UserStatus } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      role: Role;
      status: UserStatus;
      mfaEnabled: boolean;
      mfaVerified: boolean;
    };
  }

  interface User {
    role: Role;
    status: UserStatus;
    mfaEnabled: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    status: UserStatus;
    mfaEnabled: boolean;
    mfaVerified: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as never,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        // Find user
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        // Check if user is active
        if (user.status !== "ACTIVE") {
          throw new Error("Account is not active");
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email!,
          name: user.name,
          image: user.image,
          role: user.role,
          status: user.status,
          mfaEnabled: user.mfaEnabled,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For OAuth providers, check if user has a valid invite or is already registered
      if (account?.provider !== "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        // If user doesn't exist, check for valid invite
        if (!existingUser) {
          const invite = await prisma.invite.findFirst({
            where: {
              email: user.email!,
              status: "PENDING",
              expires: { gt: new Date() },
            },
          });

          if (!invite) {
            // No valid invite found - deny access (invite-only system)
            return false;
          }

          // Mark invite as accepted
          await prisma.invite.update({
            where: { id: invite.id },
            data: {
              status: "ACCEPTED",
              usedAt: new Date(),
            },
          });
        } else if (existingUser.status !== "ACTIVE") {
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
        token.status = user.status;
        token.mfaEnabled = user.mfaEnabled;
        token.mfaVerified = !user.mfaEnabled; // Auto-verified if MFA not enabled
      }

      // Handle session updates
      if (trigger === "update" && session) {
        if (session.mfaVerified !== undefined) {
          token.mfaVerified = session.mfaVerified;
        }
        if (session.mfaEnabled !== undefined) {
          token.mfaEnabled = session.mfaEnabled;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.status = token.status as UserStatus;
        session.user.mfaEnabled = token.mfaEnabled as boolean;
        session.user.mfaVerified = token.mfaVerified as boolean;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // When a user is created via OAuth, set them as active
      await prisma.user.update({
        where: { id: user.id },
        data: { status: "ACTIVE" },
      });
    },
  },
});
