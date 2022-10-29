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

const RecipePage: NextPage = () => {
  const recipeId = useRouter().query.recipeId as string
  const { data: recipe } = trpc.useQuery([
    'recipe.getRecipeById',
    { id: recipeId },
  ])

  return (
    <section className="h-screen w-auto overflow-y-hidden bg-main">
      <HeadComponent
        title={'Sweet Dreams - Recipe Page'}
        description={`Recipe page for ${recipe?.title}`}
      />

      <NavigationBar />
      <article className="relative left-[15%] top-12 bottom-12 h-screen w-[85%] md:top-8 md:bottom-8 2xl:left-[10%] 2xl:w-[90%]">
        <div className="grid grid-rows-5 gap-2">
          <h1 className="-ml-[15%] text-center text-6xl font-bold 2xl:text-8xl">
            {recipe?.title}
          </h1>
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
          <h2 className="text-2xl font-bold">Recipe Description</h2>
          <h2 className="text-2xl font-bold">Time</h2>
          <h2 className="text-2xl font-bold">Serving</h2>
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
