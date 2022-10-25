import { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import HeadComponent from '../components/HeadComponent'
import RecipeComponent from '../components/RecipeComponent'
import { trpc } from '../utils/trpc'

const Search: NextPage = () => {
  const [currPage, setCurrPage] = useState<number>(1)
  const [size, setSize] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    setHeight(window.innerHeight)
    setSize(Math.floor(height / 146))
  }, [height])

  const { data, isLoading, isPreviousData } = trpc.useQuery(
    [
      'recipe.getRecipesByNewest',
      {
        page: currPage,
        recipesPerPage: size,
      },
    ],
    {
      keepPreviousData: true,
    },
  )

  const filteredRecipes = useMemo(() => {
    return data?.recipes.filter((recipe) => {
      return search.trim() === ''
        ? recipe
        : recipe.title.toLowerCase().includes(search.trim().toLowerCase())
    })
  }, [data, search])

  return (
    <main className="flex h-screen flex-col items-center space-y-2 overflow-y-scroll bg-main scrollbar-hide">
      <HeadComponent title="Sweet Dreams - Search" description="Search Page" />
      <div className="mt-2 flex flex-row space-x-2">
        <form>
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Search for recipies"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <button
          type="button"
          className="bg-red"
          onClick={() => setCurrPage((curr) => curr + 1)}
          disabled={isPreviousData || currPage * size >= (data?.count ?? 0)}
        >
          Next
        </button>
        <button
          type="button"
          className="ml-4 bg-red"
          onClick={() => setCurrPage((curr) => curr - 1)}
          disabled={currPage === 1}
        >
          Prev
        </button>
      </div>
      <div className="my-2 w-max space-y-2">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          filteredRecipes?.map((recipe) => {
            return <RecipeComponent key={recipe.id} recipe={recipe} />
          })
        )}
      </div>
    </main>
  )
}

export default Search
