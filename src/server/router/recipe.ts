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
        include: {
          ratings: true,
        }
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
        include: {
          ratings: true,
        }
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
        include: {
          ratings: true,
        }
      })
      const count = await ctx.prisma.recipe.count()
      return {
        recipes,
        count,
      }
    },
  })
  .query('getRecipeById', {
    input: z.object({
      id: z.string().cuid(),
    }),
    resolve: async ({ ctx, input: { id } }) => {
      const recipe = await ctx.prisma.recipe.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          ratings: true,
        }
      })
      return recipe
    }
  })
  .mutation('createRecipe', {
    input: z.object({
      title: z.string(),
      description: z.string(),
      ingredients: z.string(),
      instructions: z.string(),
      timeToMake: z.number(),
    }),
    resolve: async ({ ctx, input: { title, description, ingredients, instructions, timeToMake } }) => {
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
            }
          }

        },
      })
      return recipe
    }
  })
