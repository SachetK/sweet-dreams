import { z } from 'zod'
import { createProtectedRouter } from './context'

export const recipeRouter = createProtectedRouter()
  .query('getRecipesByNewest', {
    input: z.object({
      page: z.number(),
      recipesPerPage: z.number(),
      user: z.string().cuid().optional(),
    }),
    resolve: async ({ ctx, input: { page, recipesPerPage } }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        skip: (page - 1) * recipesPerPage,
        take: recipesPerPage,
        orderBy: {
          timestamp: 'asc',
        },
      })
      const count = await ctx.prisma.recipe.count()
      return {
        recipes,
        count,
      }
    },
  })
  .query('getRecipesByPopularity', {
    input: z.object({
      page: z.number(),
      recipesPerPage: z.number(),
      user: z.string().cuid().optional(),
    }),
    resolve: async ({ ctx, input: { page, recipesPerPage } }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        skip: (page - 1) * recipesPerPage,
        take: recipesPerPage,
        orderBy: {
          timestamp: 'asc',
        },
      })
      const count = await ctx.prisma.recipe.count()
      return {
        recipes,
        count,
      }
    },
  })
  .query('getRecipesByUser', {
    input: z.object({
      page: z.number(),
      recipesPerPage: z.number(),
      user: z.string().cuid(),
    }),
    resolve: async ({ ctx, input: { page, recipesPerPage, user } }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          authorId: user,
        },
        skip: (page - 1) * recipesPerPage,
        take: recipesPerPage,
        orderBy: {
          timestamp: 'asc',
        },
      })
      const count = await ctx.prisma.recipe.count()
      return {
        recipes,
        count,
      }
    },
  })
