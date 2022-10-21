import { createRouter } from './context'

export const recipeRouter = createRouter().query('getRecipes', {
  async resolve({ ctx }) {
    return await ctx.prisma.recipe.findMany()
  },
})
