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
      <main className="h-screen bg-blue overflow-x-hidden">
        <NavigationBar />
        <div className="relative left-40 top-10 w-full">
          <div className='flex flex-row items-center justify-center w-56 bg-purple'>
            <h1 className="text-6xl font-sans font-bold">Feed</h1>
          </div>
        </div>
      </main>
    </>
  )
}

export default Feed
