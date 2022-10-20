import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import HeadComponent from '../components/HeadComponent'
import HeadingBanner from '../components/HeadingBanner'
import NavigationBar from '../components/NavigationBar'

const Feed: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  useEffect(() => {
    setRecipes([
      {
        id: 1,
        title: 'Chocolate Cake',
        description: 'A delicious chocolate cake',
        image:
          'https://images.unsplash.com/photo-1610390000000-000000000000?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        ingredients: [
          {
            id: 1,
            name: 'Flour',
            quantity: '2 cups',
          },
          {
            id: 2,
            name: 'Sugar',
            quantity: '1 cup',
          },
          {
            id: 3,
            name: 'Chocolate',
            quantity: '1 cup',
          },
        ],
        instructions: [
          {
            id: 1,
            step: 'Mix flour and sugar',
          },
          {
            id: 2,
            step: 'Add chocolate',
          },
          {
            id: 3,
            step: 'Bake for 30 minutes',
          },
        ],
      },
    ])
  }, [])
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
            {recipes.map((recipe) => {
              return (
                <div key={recipe.id}>
                  <h1>{recipe.title}</h1>
                  <p>{recipe.description}</p>
                </div>
              )
            })}
            <HeadingBanner title="Popular Recipies" />
            {recipes.map((recipe) => {
              return (
                <div key={recipe.id}>
                  <h1>{recipe.title}</h1>
                  <p>{recipe.description}</p>
                </div>
              )
            })}
            <HeadingBanner title="Cusine Recipies" />
            {recipes.map((recipe) => {
              return (
                <div key={recipe.id}>
                  <h1>{recipe.title}</h1>
                  <p>{recipe.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default Feed
