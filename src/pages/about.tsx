import { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'
import HeadingBanner from '../components/HeadingBanner'
import NavigationBar from '../components/NavigationBar'
import Image from 'next/image'
import JiaXi from '../../public/profile/JiaXi.jpg'
import Sachet from '../../public/profile/Sachet.jpg'
import Anthony from '../../public/profile/Anthony.jpg'

const About: NextPage = () => {
  return (
    <>
  <main className="h-screen overflow-x-hidden bg-main">
    <NavigationBar />
    <div className="flex h-screen flex-col items-center justify-center mt-11">
      <HeadComponent
        title="Sweet Dreams - About"
        description="About Page for Sweet Dreams App"
      />
      <HeadingBanner 
      title="About the Creators" 
      />
    </div>

    <div className="flex-col ml-48 mt-44 space-y-96">
    <Image
      src={JiaXi}
      alt="JiaXi"
      height={400}
      width={300}
      priority={true}
      />

    <Image
      src={Sachet}
      alt="Sachet"
      height={400}
      width={300}
      priority={true}
      />

    <Image
      src={Anthony}
      alt="Anthony"
      height={400}
      width={300}
      priority={true}
      />
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