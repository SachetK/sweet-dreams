import { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'
import NavigationBar from '../components/NavigationBar'

const Feed: NextPage = () => {
  return (
    <>
      <HeadComponent
        title="Sweet Dreams - Main Feed"
        description="Main landing page with recipies"
      />
      <main className="bg-blue h-screen">
        <NavigationBar />
        <div className='ml-40'>

        </div>
        
      </main>
    </>
  )
}

export default Feed
