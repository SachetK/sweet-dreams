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
        <div className="ml-52 mt-11">
          <HeadComponent
            title="Sweet Dreams - About"
            description="About Page for Sweet Dreams App"
          />
          <HeadingBanner title="About the Creators" />
          <div className="mt-16 flex w-48 flex-col justify-center space-y-11">
            <div className="flex flex-row gap-x-8">
              <div>
                <Image
                  src={JiaXi}
                  alt="JiaXi"
                  height={300}
                  width={225}
                  priority={true}
                />
              </div>
              <p className="gap-x-8">hi</p>
            </div>
            <div className="flex flex-row">
              <div>
                <Image
                  src={Sachet}
                  alt="Sachet"
                  height={300}
                  width={225}
                  priority={true}
                />
              </div>
              <p>hi</p>
            </div>
            <div className="flex flex-row">
              <div>
                <Image
                  src={Anthony}
                  alt="Anthony"
                  height={300}
                  width={225}
                  priority={true}
                />
              </div>
              <p>hi</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default About
