import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

  getImage: protectedProcedure
    .input(z.string())
    .query(async ({input, ctx}) => {
      const image = await ctx.prisma.$queryRaw`SELECT image FROM User WHERE id = ${input} `;
      return image;
    }),

  getUserInfo: protectedProcedure
    .input(z.string())
    .query(async ({input, ctx}) => {
      return await ctx.prisma.$queryRaw`SELECT id, image, name, favoriteDuck FROM User WHERE id = ${input}`;
    }),

  followUser: protectedProcedure
    .input(z.string())
    .mutation(async ({input, ctx}) => {
      return await ctx.prisma.followers.create({
        data: {
          followerId: ctx.session.user.id,
          followingId: input,
        }
      });
    }),

  unfollowUser: protectedProcedure
    .input(z.string())
    .mutation(async ({input, ctx}) => {
      return await ctx.prisma.$queryRaw`DELETE FROM Followers WHERE followerId = ${ctx.session.user.id} AND followingId = ${input}`;
    }),

  getFollowing: protectedProcedure
    .query(async ({ctx}) => {
      return await ctx.prisma.followers.findMany({
        where: {
          followerId: ctx.session.user.id
        }
      });
    })

});
