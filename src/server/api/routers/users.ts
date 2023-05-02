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
});
