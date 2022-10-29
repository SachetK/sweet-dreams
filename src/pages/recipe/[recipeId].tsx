import type { GetServerSidePropsContext, NextPage } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'
import { useRouter } from 'next/router'
import HeadComponent from '../../components/HeadComponent'
import { appRouter } from '../../server/router'
import { createContextInner } from '../../server/router/context'
import { trpc } from '../../utils/trpc'
import { getServerAuthSession } from '../../server/common/get-server-auth-session'

const RecipePage: NextPage = () => {
  const recipeId = useRouter().query.recipeId as string
  const { data: recipe } = trpc.useQuery([
    'recipe.getRecipeById',
    { id: recipeId },
  ])

  return (
    <>
      <HeadComponent
        title={'Sweet Dreams - Recipe Page'}
        description={`Recipe page for ${recipe?.title}`}
      />
    </>
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
