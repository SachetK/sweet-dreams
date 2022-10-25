import type { NextPage } from 'next'
import Image from 'next/image'
import homeImage from '../../public/sweet-dreams-main.png'
import HeadComponent from '../components/HeadComponent'
import ButtonComponent from '../components/ButtonComponent'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <HeadComponent title="Sweet Dreams" description="Sweet Dreams app" />

      <main className="bg-main">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex-initial" onClick={() => signIn('google')}>
            <Image
              src={homeImage}
              alt="Home page image"
              height={homeImage.height}
              width={homeImage.width}
              priority={true}
            />
          </div>
          <Link href="/welcome">
            <a>
              <ButtonComponent
                text="Find your favorite recipies!"
                borderColor="border-pink-dark"
                color="bg-pink"
              />
            </a>
          </Link>
        </div>
      </main>
    </>
  )
}

export default Home
