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
      });
      return newPost;
    }),

  getPost: protectedProcedure.query(async ({ctx}) => {
    const posts = await ctx.prisma.$queryRaw`SELECT * FROM Posts`;
    return posts;
  }),

  getUserPosts: protectedProcedure
    .input(z.string())
    .query(async ({input, ctx}) => {
      return await ctx.prisma.$queryRaw`SELECT * from Posts where userId = ${input}`;
    }),
  
  deletePost: protectedProcedure
    .input(z.string())
    .mutation(async ({input, ctx}) => {
      return await ctx.prisma.$queryRaw`DELETE FROM Posts where id = ${input}`;
    })
});
