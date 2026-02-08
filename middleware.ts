import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/settings", "/admin"];

// Routes that require MFA verification
const mfaProtectedRoutes = ["/dashboard", "/settings", "/admin"];

// Routes only accessible when NOT authenticated
const authRoutes = ["/login", "/register", "/forgot-password"];

// Admin-only routes
const adminRoutes = ["/admin"];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  
  // Get the JWT token (works in Edge runtime)
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const isLoggedIn = !!token;
  const user = token ? {
    mfaEnabled: token.mfaEnabled as boolean,
    mfaVerified: token.mfaVerified as boolean,
    role: token.role as string,
  } : null;

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isMfaProtected = mfaProtectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isMfaVerifyRoute = nextUrl.pathname.startsWith("/mfa-verify");

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    // If MFA is enabled but not verified, redirect to MFA verify
    if (user?.mfaEnabled && !user?.mfaVerified) {
      return NextResponse.redirect(new URL("/mfa-verify", nextUrl));
    }
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // Check MFA verification for protected routes
  if (isMfaProtected && isLoggedIn && user?.mfaEnabled && !user?.mfaVerified) {
    return NextResponse.redirect(new URL("/mfa-verify", nextUrl));
  }

  // MFA verify page - only accessible if logged in with MFA enabled but not verified
  if (isMfaVerifyRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (!user?.mfaEnabled || user?.mfaVerified) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  // Check admin access
  if (isAdminRoute && isLoggedIn) {
    if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};
