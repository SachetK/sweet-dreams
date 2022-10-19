import type { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'
import ButtonComponent from '../components/ButtonComponent'

const Welcome: NextPage = () => {
  return (
    <>
      <HeadComponent
        title="Sweet Dreams - Welcome"
        description="Welcome Page for Sweet Dreams App"
      />

      <main>
        <div className="flex h-screen flex-col items-center justify-center space-y-96">
          <h1>Welcome</h1>
          <ButtonComponent text="Save & Submit" />
        </div>

        <h1>Welcome to the world!</h1>
        <p>{`Jessie's world`}</p>
      </main>
    </>
  )
}

export default Welcome
