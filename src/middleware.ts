import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    if (!role) {
      return Response.redirect(new URL("/auth/login", req.url));
    }

    // student protection
    if (pathname.startsWith("/student") && role !== "student") {
      return Response.redirect(new URL("/teacher/dashboard", req.url));
    }

    // teacher protection
    if (pathname.startsWith("/teacher") && role !== "teacher") {
      return Response.redirect(new URL("/student/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*"],
};
