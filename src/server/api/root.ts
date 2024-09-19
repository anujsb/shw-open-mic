import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { organizationRouter } from "./routers/organization";
import { livekitRouter } from "./routers/livekit";
import { knowledgeBaseRouter } from "./routers/knowledgeBase";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  organization: organizationRouter,
  livekit: livekitRouter,
  knowledgeBase: knowledgeBaseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
