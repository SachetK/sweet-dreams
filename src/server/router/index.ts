// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { recipeRouter } from './recipe'
import { userRouter } from './user'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('recipe.', recipeRouter)
  .merge('user.', userRouter)

// export type definition of API
export type AppRouter = typeof appRouter
