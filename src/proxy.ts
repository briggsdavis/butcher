import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server"

const isAdminAuthRoute = createRouteMatcher(["/admin/login", "/admin/signup"])
const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated()

  if (isAdminAuthRoute(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/admin")
  }

  if (isAdminRoute(request) && !isAdminAuthRoute(request) && !isAuthenticated) {
    const next = `${request.nextUrl.pathname}${request.nextUrl.search}`
    return nextjsMiddlewareRedirect(request, `/admin/login?next=${encodeURIComponent(next)}`)
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
