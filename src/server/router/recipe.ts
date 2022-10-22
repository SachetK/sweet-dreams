import { z } from 'zod'
import { createRouter } from './context'

export const recipeRouter = createRouter().query('getRecipes', {
  input: z.object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().nullish(),
  }),
  async resolve({ ctx, input }) {
    const limit = input?.limit ?? 2

    const recipes = await ctx.prisma.recipe.findMany({
      take: limit + 1,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      orderBy: { time: 'asc' },
    })

    let nextCursor: typeof input.cursor | undefined = undefined
    if (recipes.length > limit) {
      const nextItem = recipes.pop()
      nextCursor = nextItem?.id
    }

    return {
      recipes,
      nextCursor,
    }
  },
})
