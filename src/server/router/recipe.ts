import { createRouter } from './context'

export const recipeRouter = createRouter()
    .query('recipes', {
        async resolve({ ctx }) {
            return await ctx.prisma.recipe.findMany()
        },
    })
