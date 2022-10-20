import type { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'
import ButtonComponent from '../components/ButtonComponent'
import HeadingBanner from '../components/HeadingBanner'

const Welcome: NextPage = () => {
  return (
    <>
      <HeadComponent
        title="Sweet Dreams - Welcome"
        description="Welcome Page for Sweet Dreams App"
      />

      <main>
        <div className="flex h-screen flex-col items-center justify-center space-y-96">
          <HeadingBanner title="Welcome to Sweet Dreams" />
          <ButtonComponent
            text="Save & Submit"
            color="bg-pink"
            borderColor="border-pink-dark"
          />
        </div>

        <h1>Welcome to the world!</h1>
        <p>{`Jessie's world`}</p>
      </main>
    </>
  )
}

export default Welcome
