import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      return await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
    }),

  updateBio: protectedProcedure
    .input(
      z.object({
        bio: z.string().max(1000),
      })
    )
    .mutation(async ({ ctx, input: { bio } }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          bio,
        },
      });
    }),

  updateAllergies: protectedProcedure
    .input(z.string().max(1000))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          allergies: {
            push: input,
          },
        },
      });
    }),

  saveRecipe: protectedProcedure
    .input(
      z.object({
        savedRecipes: z.string().max(1000).array(),
      })
    )
    .mutation(async ({ ctx, input: { savedRecipes } }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          savedRecipes,
        },
      });
    }),
});
