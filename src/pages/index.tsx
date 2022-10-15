import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import homeImage from '../../public/sweet-dreams-main.png'
import continueIcon from '../../public/continue-main.png'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sweet Dreams</title>
        <meta name="description" content="Home page for Sweet Dreams app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          <button
            className="w-auto flex-none rounded-full bg-red"
            type="button"
          >
            <div className="flex flex-row items-center justify-center">
              <p className="w-2/3 flex-wrap justify-center p-1 font-sans text-lg font-medium">
                Click to find your favorite recipies!
              </p>
              <div className="relative h-auto w-1/4 self-center p-2">
                <Image
                  src={continueIcon}
                  layout="responsive"
                  height={continueIcon.height}
                  width={continueIcon.width}
                  alt="Continue button"
                />
              </div>
            </div>
          </button>
        </div>
      </main>
    </>
  )
}

export default Home
