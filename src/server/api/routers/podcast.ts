import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const PodcastRouter = createTRPCRouter({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: `Hello`,
      };
    }),

  getEps : publicProcedure
    .input( z.object({
      id : z.string()
    }) )
    .query( async ({ctx  , input}) => {

      const podcast = await ctx.prisma.podcast.findUnique({
        where : {
          id : input.id
        },
        include : {
          episodes : true
        }
      })
      
      return podcast?.episodes
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.podcast.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
