import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(z.object({ duckType: z.number()}))
    .mutation(async ({ ctx, input }) => {
      const newPost = await ctx.prisma.posts.create({
        data: {
          duckType: input.duckType,
          userId: ctx.session.user.id,
        }
      })
      return newPost;
    }),

  getPost: protectedProcedure.query(async ({ctx}) => {
    const posts = await ctx.prisma.$queryRaw`SELECT * FROM Posts`
    return posts;
  }),
});
