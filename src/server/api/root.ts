import { createTRPCRouter } from "~/server/api/trpc";
import { PodcastRouter } from "~/server/api/routers/podcast";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  podcast : PodcastRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
