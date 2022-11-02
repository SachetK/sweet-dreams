import type { GetServerSidePropsContext, NextPage } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'
import { useRouter } from 'next/router'
import HeadComponent from '../../components/HeadComponent'
import { appRouter } from '../../server/router'
import { createContextInner } from '../../server/router/context'
import { trpc } from '../../utils/trpc'
import { getServerAuthSession } from '../../server/common/get-server-auth-session'
import Image from 'next/image'
import mainImage from '../../../public/sweet-dreams-main.png'
import NavigationBar from '../../components/NavigationBar'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const RecipePage: NextPage = () => {
  const recipeId = useRouter().query.recipeId as string
  const { data: recipe } = trpc.useQuery([
    'recipe.getRecipeById',
    { id: recipeId },
  ])
  const rateRecipe = trpc.useMutation('recipe.rateRecipe') 

  const { data: session } = useSession()
  const [rating, setRating] = useState<number>(recipe?.ratings.find((r) => r.userId === session?.user?.id )?.rating ?? 0)
  const timeToCook = !recipe?.timeToMake
    ? 0
    : `${
        recipe?.timeToMake / 60 < 0
          ? ''
          : Math.floor(recipe?.timeToMake / 60) + 'hours'
      } ${recipe?.timeToMake / 60 > 0 ? ' and ' : recipe?.timeToMake % 60} mins`
  
  
      return (
    <section className="h-screen w-auto overflow-y-hidden bg-main">
      <HeadComponent
        title={'Sweet Dreams - Recipe Page'}
        description={`Recipe page for ${recipe?.title}`}
      />

      <NavigationBar />
      <article className="relative left-[15%] top-12 bottom-12 h-screen w-[85%] md:top-8 md:bottom-8 2xl:left-[10%] 2xl:w-[90%]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="-ml-[15%] w-full text-center text-6xl font-bold 2xl:-ml-[10%] 2xl:text-8xl">
            {recipe?.title}
          </h1>
          <div className="mr-12 mt-[3%] grid h-full w-full grid-flow-col grid-cols-3 grid-rows-5 place-items-center gap-6">
              <div className='row-span-3 flex flex-col items-center'>
            <figure className="relative h-60 w-60 2xl:h-72 2xl:w-72">
              <Image
                className="rounded-full"
                layout="fill"
                src={mainImage}
                alt={recipe?.title}
                objectFit="cover"
                objectPosition={'center'}
              />
            </figure>
              <input type="range" id="rating" name="rating"
                    min="0" max="5" onChange={(e) => {setRating(e.target.valueAsNumber)}}/>
              <label className="flex flex-row space-x-6" htmlFor="rating">
                <p className='text-lg'>Rating: {rating}</p>
                <button className='bg-red px-4 text-lg font-bold'type='button' onClick={() => {rateRecipe.mutate({id: recipeId, rating})}}>Rate</button>
              </label>
            </div>

            <div className="row-span-2 flex h-full w-full flex-col items-center justify-center rounded-3xl bg-yellow">
              <h2 className="text-2xl font-bold">Recipe Description</h2>
              <p className="text-lg font-medium">{recipe?.description}</p>
            </div>

            <div className="flex h-full w-full flex-wrap items-center justify-center rounded-3xl bg-yellow">
              <h2 className="text-2xl font-bold">
                Time: {!timeToCook ? 'Not given' : timeToCook}
              </h2>
            </div>

            <div className="flex h-full w-full  items-center justify-center rounded-3xl bg-yellow">
              <h2 className="text-2xl font-bold">
                Serving: {recipe?.servings ?? 0} servings
              </h2>
            </div>

            <div className="row-span-3 flex h-full w-full flex-col items-center justify-center rounded-3xl bg-yellow">
              <h2 className="text-2xl font-bold">Ingredients</h2>
              <ol className=" text-2xl font-bold">
                {recipe?.ingredients?.map((ingredient) => {
                  return <li key={ingredient}>{ingredient}</li>
                })}
              </ol>
            </div>

            <div className=" row-span-5 flex h-full w-full  flex-col items-center justify-center rounded-3xl bg-yellow">
              <h2 className="text-2xl font-bold">Instructions</h2>
              <ol className=" text-2xl font-bold">
                {recipe?.instructions?.map((instruction) => {
                  return <li key={instruction}>{instruction}</li>
                })}
              </ol>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerAuthSession(context)
  const recipeId = context.params?.recipeId as string

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session }),
  })

  try {
    await ssg.fetchQuery('recipe.getRecipeById', { id: recipeId })
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
export default RecipePage
