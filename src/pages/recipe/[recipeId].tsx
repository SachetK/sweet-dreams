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
    <main className="h-screen overflow-x-hidden overflow-y-hidden bg-main">
      <HeadComponent
        title={'Sweet Dreams - Recipe Page'}
        description={`Recipe page for ${recipe?.title}`}
      />

      <NavigationBar />
      <div className="relative left-[15%] top-12 bottom-12 h-screen w-full md:top-4 md:bottom-4">
        <div className="grid gap-2">
          <h1 className="col-span-3 ml-[30%] text-7xl font-bold">
            {recipe?.title}
          </h1>
          <div className='relative w-96 h-96'>
            <Image
                className='rounded-full'
                layout="fill"
                src={mainImage}
                alt={recipe?.title}
                objectFit="cover"
                objectPosition={'center'}
            />
          </div>
        </div>
      </div>
    </main>
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
