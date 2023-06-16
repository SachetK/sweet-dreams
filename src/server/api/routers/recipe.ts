import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const recipeRouter = createTRPCRouter({
  ordered: publicProcedure
    .input(
      z.object({
        page: z.number(),
        recipesPerPage: z.number(),
        type: z.enum(["newest", "rating", "user"]),
      })
    )
    .query(async ({ input: { page, recipesPerPage, type }, ctx }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          authorId: type === "user" ? ctx.session?.user.id : undefined,
        },
        skip: (page - 1) * recipesPerPage,
        take: recipesPerPage,
        orderBy: {
          timestamp: type === "newest" ? "asc" : undefined,
          ratings: {
            _count: type === "rating" ? "asc" : undefined,
          },
        },
        include: {
          ratings: true,
        },
      });

      recipes.sort((a, b) => {
        if (type === "newest") {
          return a.timestamp.getTime() - b.timestamp.getTime();
        } else if (type === "rating") {
          return (
            a.ratings.reduce((a, b) => a + b.rating, 0) / a.ratings.length -
            b.ratings.reduce((a, b) => a + b.rating, 0) / b.ratings.length
          );
        } else {
          return 0;
        }
      });

      const count = await ctx.prisma.recipe.count();

      return {
        recipes,
        count,
      };
    }),

  byNewest: publicProcedure
    .input(
      z.object({
        page: z.number(),
        recipesPerPage: z.number(),
      })
    )
    .query(async ({ input: { page, recipesPerPage }, ctx }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        skip: (page - 1) * recipesPerPage,
        take: recipesPerPage,
        orderBy: {
          timestamp: "asc",
        },
        include: {
          ratings: true,
        },
      });
      const count = await ctx.prisma.recipe.count();
      return {
        recipes,
        count,
      };
    }),

  byRating: publicProcedure
    .input(
      z.object({
        page: z.number(),
        recipesPerPage: z.number(),
        user: z.string().cuid().optional(),
      })
    )
    .query(async ({ input: { page, recipesPerPage }, ctx }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        skip: (page - 1) * recipesPerPage,
        take: recipesPerPage,
        orderBy: {
          timestamp: "asc",
        },
        include: {
          ratings: true,
        },
      });
      const count = await ctx.prisma.recipe.count();
      return {
        recipes,
        count,
      };
    }),

  byUser: publicProcedure
    .input(
      z.object({
        page: z.number(),
        recipesPerPage: z.number(),
        user: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input: { page, recipesPerPage, user } }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          authorId: user,
        },
        skip: (page - 1) * recipesPerPage,
        take: recipesPerPage,
        orderBy: {
          timestamp: "asc",
        },
        include: {
          ratings: true,
        },
      });
      const count = await ctx.prisma.recipe.count();
      return {
        recipes,
        count,
      };
    }),

  byId: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      const recipe = await ctx.prisma.recipe.findUnique({
        where: {
          id,
        },
        include: {
          ratings: true,
        },
      });
      return recipe;
    }),

  byIds: publicProcedure
    .input(
      z.object({
        ids: z.string().cuid().array(),
      })
    )
    .query(async ({ ctx, input: { ids } }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        include: {
          ratings: true,
        },
      });
      return recipes;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        ingredients: z.string().array(),
        instructions: z.string().array(),
        timeToMake: z.number(),
      })
    )
    .mutation(
      async ({
        ctx,
        input: { title, description, ingredients, instructions, timeToMake },
      }) => {
        const recipe = await ctx.prisma.recipe.create({
          data: {
            title,
            description,
            ingredients,
            instructions,
            authorId: ctx.session.user.id,
            timeToMake,
            ratings: {
              create: {
                rating: 0,
                userId: ctx.session.user.id,
              },
            },
          },
        });
        return recipe;
      }
    ),

  rate: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        rating: z.number(),
      })
    )
    .mutation(async ({ ctx, input: { id, rating } }) => {
      const recipe = await ctx.prisma.recipe.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          ratings: true,
        },
      });
      const existingRating = recipe.ratings.find(
        (r) => r.userId === ctx.session.user.id
      );
      if (existingRating) {
        await ctx.prisma.rating.update({
          where: {
            id: existingRating.id,
          },
          data: {
            rating,
          },
        });
      } else {
        await ctx.prisma.rating.create({
          data: {
            rating,
            userId: ctx.session.user.id,
            recipeId: id,
          },
        });
      }
      return recipe;
    }),
});
