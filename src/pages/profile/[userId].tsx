import { createSSGHelpers } from '@trpc/react/ssg';
import { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router';
import HeadComponent from '../../components/HeadComponent';
import { getServerAuthSession } from '../../server/common/get-server-auth-session'
import { appRouter } from '../../server/router';
import { createContextInner } from '../../server/router/context';
import { trpc } from '../../utils/trpc'

const Profile: NextPage = () => {
  const userId = useRouter().query.userId as string;
  const { data: user } = trpc.useQuery(['user.getUser', {userId: userId}]);
  return <>
    <HeadComponent title={"Sweet Dreams - Profile Page"} description={`Profile page for ${user?.name}`}/>
  </>
}

export default Profile

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(context)
  const userId = context.params?.userId as string
  
  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({session}),
  });    
  
  try {
    await ssg.fetchQuery('user.getUser', {userId})
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
