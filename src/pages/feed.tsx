import { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'
import HeadingBanner from '../components/HeadingBanner'
import NavigationBar from '../components/NavigationBar'
import { trpc } from '../utils/trpc'

const Feed: NextPage = () => {
  const { data: recipes, isLoading } = trpc.useQuery(['recipe.getRecipes'])

  return (
    <>
      <HeadComponent
        title="Sweet Dreams - Main Feed"
        description="Main landing page with recipies"
      />

      <main className="h-screen overflow-x-hidden bg-blue">
        <NavigationBar />
        <div className="relative left-40 top-4 w-full">
          <div className="w-max space-y-2">
            <HeadingBanner title="New Recipies" />
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              recipes?.map((recipe) => {
                return (
                  <div key={recipe.id}>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                  </div>
                )
              })
            )}
            <HeadingBanner title="Popular Recipies" />
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              recipes?.map((recipe) => {
                return (
                  <div key={recipe.id}>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                  </div>
                )
              })
            )}
            <HeadingBanner title="Your Recipies" />
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              recipes?.map((recipe) => {
                return (
                  <div key={recipe.id}>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Feed
