import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import HeadComponent from '../components/HeadComponent'
import HeadingBanner from '../components/HeadingBanner'
import NavigationBar from '../components/NavigationBar'
import RecipeComponent from '../components/RecipeComponent'
import { getServerAuthSession } from '../server/common/get-server-auth-session'
import { trpc } from '../utils/trpc'

const Feed: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <HeadComponent
        title="Sweet Dreams - Main Feed"
        description="Main landing page with recipies"
      />

      <main className="h-screen overflow-x-hidden bg-main">
        <NavigationBar />
        <div className="relative left-32 top-12 bottom-12 h-screen w-full md:left-40 md:top-4 md:bottom-4">
          <RecipeCard title="New Recipes" query={'recipe.getRecipesByNewest'} />
          <RecipeCard
            title="Popular Recipes"
            query={'recipe.getRecipesByPopularity'}
          />
          <RecipeCard
            title="Your Recipes"
            query={'recipe.getRecipesByUser'}
            userId={session?.user?.id}
          />
        </div>
      </main>
    </>
  )
}

export default Feed

const RecipeCard: React.FC<{
  title: string
  query:
    | 'recipe.getRecipesByNewest'
    | 'recipe.getRecipesByPopularity'
    | 'recipe.getRecipesByUser'
  userId?: string
}> = ({ title, query, userId }) => {
  const [currPage, setCurrPage] = useState<number>(1)
  const [size, setSize] = useState<number>(1)

  useEffect(() => {
    setSize(Math.floor(window.innerHeight / 430))
  }, [])

  const { data, isLoading, isPreviousData } = trpc.useQuery(
    [
      query,
      {
        page: currPage,
        recipesPerPage: size,
        user: userId,
      },
    ],
    {
      keepPreviousData: true,
    },
  )

  return (
    <>
      <div className="my-2 w-max space-y-2 overflow-y-scroll scrollbar-hide">
        <HeadingBanner title={title} />
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
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.recipes.map((recipe) => {
            return <RecipeComponent key={recipe.id} recipe={recipe} />
          })
        )}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session: session,
    },
  }
}
