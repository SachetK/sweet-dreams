import { z } from 'zod'
import { createProtectedRouter } from './context'

export const userRouter = createProtectedRouter()
  .query('getUser', {
    input: z.object({
      userId: z.string().cuid(),
    }),
    resolve: async ({ ctx, input: { userId } }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      })
      return user
    },
  })
  .mutation('updateBio', {
    input: z.object({
      bio: z.string().max(1000),
    }),
    resolve: async ({ ctx, input: { bio } }) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          bio,
        },
      })
      return user
    },
  })
  .mutation('updateAllergy', {
    input: z.object({
      allergies: z.string().max(1000).array(),
    }),
    resolve: async ({ ctx, input: { allergies } }) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          allergies,
        },
      })
      return user
    },
  })
