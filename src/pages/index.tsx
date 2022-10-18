import type { NextPage } from 'next'
import Image from 'next/image'
import homeImage from '../../public/sweet-dreams-main.png'
import HeadComponent from '../components/HeadComponent'
import ButtonComponent from '../components/ButtonComponent'

const Home: NextPage = () => {
  return (
    <>
      <HeadComponent title="Sweet Dreams" description="Sweet Dreams app" />

      <main className="bg-blue">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex-initial">
            <Image
              src={homeImage}
              alt="Home page image"
              height={homeImage.height}
              width={homeImage.width}
              priority={true}
            />
          </div>
          <ButtonComponent text="Find your favorite recipies!" />
        </div>
      </main>
    </>
  )
}

export default Home
