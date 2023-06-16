import type { Prisma } from "@prisma/client";

export type RecipeWithRating = Prisma.RecipeGetPayload<{
  include: {
    ratings: true;
  };
}>;
