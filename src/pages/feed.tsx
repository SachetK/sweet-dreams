import { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'
import HeadingBanner from '../components/HeadingBanner'
import NavigationBar from '../components/NavigationBar'
import RecipeComponent from '../components/RecipeComponent'
import { trpc } from '../utils/trpc'

const Feed: NextPage = () => {
  const { data, isLoading } = trpc.useInfiniteQuery(
    [
      'recipe.getRecipes',
      {
        limit: 1,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  )

  return (
    <>
      <HeadComponent
        title="Sweet Dreams - Main Feed"
        description="Main landing page with recipies"
      />

      <main className="h-screen overflow-x-hidden bg-blue">
        <NavigationBar />
        <div className="relative left-32 md:left-40 top-12 md:top-4 h-auto w-full">
          <div className="my-2 w-max space-y-2">
            <HeadingBanner title="New Recipies" />
            <div className="space-y-2 overflow-y-scroll scrollbar-hide">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                data?.pages?.map((page) => {
                  return page.recipes.map((recipe) => {
                    return <RecipeComponent key={recipe.id} recipe={recipe} />
                  })
                })
              )}
            </div>
          </div>

          <div className="my-2 w-max space-y-2">
            <HeadingBanner title="Trending Recipies" />
            <div className="space-y-2 overflow-y-scroll scrollbar-hide">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                data?.pages?.map((page) => {
                  return page.recipes.map((recipe) => {
                    return <RecipeComponent key={recipe.id} recipe={recipe} />
                  })
                })
              )}
            </div>
          </div>

          <div className="my-2 w-max space-y-2">
            <HeadingBanner title="Your Recipies" />
            <div className="space-y-2 overflow-y-scroll scrollbar-hide">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                data?.pages?.map((page) => {
                  return page.recipes.map((recipe) => {
                    return <RecipeComponent key={recipe.id} recipe={recipe} />
                  })
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Feed
