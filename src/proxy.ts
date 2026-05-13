import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  "/", 
  "/about", 
  "/clubs", 
  "/events", 
  "/resources", 
  "/news", 
  "/newsletter", 
  "/jobs", 
  "/brand-centre", 
  "/hall-of-fame", 
  "/leaderboard", 
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/login(.*)"
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isAdminRoute(request)) {
    // First: ensure user is authenticated
    await auth.protect();

    // Then: check admin authorization
    const session = await auth();
    const claims = session.sessionClaims as any;
    const userEmail = claims?.email as string | undefined;
    const userRole = claims?.metadata?.role as string | undefined;

    const isAuthorizedByEmail = userEmail === "thejaswinps@gmail.com";
    const isAuthorizedByRole = userRole === "district_admin";

    // Allow access if either condition is met, or in development mode
    if (!isAuthorizedByEmail && !isAuthorizedByRole && process.env.NODE_ENV !== 'development') {
      return (await auth()).redirectToSignIn();
    }
    return; // Allow access
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
