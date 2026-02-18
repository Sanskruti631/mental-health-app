import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes and roles
const protectedRoutes = {
  "/dashboard": ["admin"],
  "/therapist-dashboard": ["therapist"],
  "/appointments": ["student", "therapist"],
  "/chat": ["student", "therapist"],
  "/profile": ["student", "admin", "therapist"],
};

// Public pages
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

// API access rules
const apiRoutes = {
  "/api/auth": "public",
  "/api/appointments": ["student", "therapist", "admin"],
  "/api/messages": ["student", "therapist"],
  "/api/users": ["admin"],
};

// ✅ Required proxy function
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("session-token")?.value;
  const userRole = request.cookies.get("user-role")?.value;

  // --- API requests ---
  if (pathname.startsWith("/api/")) {
    return handleApiRoute(request, pathname, sessionToken, userRole);
  }

  // --- Public pages ---
  if (publicRoutes.includes(pathname)) {
    if (sessionToken && ["/login", "/register"].includes(pathname)) {
      return NextResponse.redirect(
        new URL(getDashboardForRole(userRole), request.url)
      );
    }
    return NextResponse.next();
  }

  // --- Protected routes ---
  const requiredRoles = protectedRoutes[pathname as keyof typeof protectedRoutes];

  if (requiredRoles) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!requiredRoles.includes(userRole ?? "")) {
      return NextResponse.redirect(
        new URL(getDashboardForRole(userRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

// --- Handle API rules ---
function handleApiRoute(
  request: NextRequest,
  pathname: string,
  sessionToken?: string,
  userRole?: string
) {
  const apiRoute = Object.keys(apiRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (!apiRoute) return NextResponse.next();

  const requiredRoles = apiRoutes[apiRoute as keyof typeof apiRoutes];

  if (requiredRoles === "public") return NextResponse.next();

  if (!sessionToken) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  if (Array.isArray(requiredRoles) && !requiredRoles.includes(userRole ?? "")) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  return NextResponse.next();
}

// --- Get dashboard by role ---
function getDashboardForRole(role?: string): string {
  switch (role) {
    case "admin":
      return "/dashboard";
    case "therapist":
      return "/therapist-dashboard";
    case "student":
      return "/";
    default:
      return "/";
  }
}
