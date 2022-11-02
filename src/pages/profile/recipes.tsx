import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import RecipeComponent from '../../components/RecipeComponent'
import { trpc } from '../../utils/trpc'

const SavedRecipes: NextPage = () => {
  const { data: session } = useSession()
  const { data: user } = trpc.useQuery([
    'user.getUser',
    { userId: session?.user?.id as string },
  ])
  const { data: recipes } = trpc.useQuery([
    'recipe.getRecipesByIds',
    { ids: user?.savedRecipes ?? [] },
  ])
  return (
    <main className="h-screen bg-main">
      <h1 className="text-bold text-center text-6xl">Saved Recipes</h1>
      <div className="mx-[32%] my-4 w-max">
        {recipes?.map((recipe) => (
          <RecipeComponent key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  )
}

export default SavedRecipes
