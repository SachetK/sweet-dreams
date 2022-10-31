import { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'
import HeadingBanner from '../components/HeadingBanner'
import NavigationBar from '../components/NavigationBar'

const About: NextPage = () => {
  return (
    <>
      <main className="h-screen overflow-x-hidden bg-main">
        <NavigationBar />
        <div className="mt-11 flex h-screen flex-col items-center justify-center space-y-40">
          <HeadComponent
            title="Sweet Dreams - About"
            description="About page for Sweet Dreams app"
          />

          <HeadingBanner title="About the Creators" />
        </div>

        <div className="ml-48 mt-44 flex h-screen flex-col">
          {/*
      have HeadingBanner with names (should go in ABC order) 
      */}
        </div>

        <div className="">
          {/*
      textboxes with bios 
      */}
        </div>
      </main>
    </>
  )
}

export default About
