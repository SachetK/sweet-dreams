import { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'

const About: NextPage = () => {
  return (
    <>
      <HeadComponent
        title="Sweet Dreams - About"
        description="About page for Sweet Dreams app"
      />

      <p>Hi there!</p>
    </>
  )
}

export default About
