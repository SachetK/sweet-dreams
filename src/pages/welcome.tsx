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
          <ButtonComponent text="Save & Submit" color='bg-red' borderColor='border-dark-red'/>
        </div>

        <h1>Welcome to the world!</h1>
        <p>{`Jessie's world`}</p>
      </main>
    </>
  )
}

export default Welcome
