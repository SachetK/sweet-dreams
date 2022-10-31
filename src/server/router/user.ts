import { z } from 'zod'
import { createProtectedRouter } from './context'

export const userRouter = createProtectedRouter().query('getUser', {
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
