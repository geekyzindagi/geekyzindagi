import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

  const token = req.cookies.get('access_token')?.value;
  const isLoggedIn = !!token;

  // We don't have user info in middleware easily without decoding JWT.
  // For basic protection, existence of token is enough for redirects.
  // Advanced checks (like MFA/Admin) will be handled in the client components for now
  // or until we add 'jose' to decode JWT here.
  const user = null;

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

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
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
