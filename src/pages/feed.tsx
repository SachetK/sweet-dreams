import { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'
import HeadingBanner from '../components/HeadingBanner'
import NavigationBar from '../components/NavigationBar'

const Feed: NextPage = () => {
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
            {}
            <HeadingBanner title="Popular Recipies" />
            {}
            <HeadingBanner title="Cusine Recipies" />
            {}
          </div>
        </div>
      </main>
    </>
  )
}

export default Feed
