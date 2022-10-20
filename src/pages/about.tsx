import { NextPage } from 'next'
import HeadComponent from '../components/HeadComponent'

const About: NextPage = () => {
  return (
    <>
      <HeadComponent
        title="Sweet Dreams - About"
        description="About Page for Sweet Dreams App"
      />

      <p>Hi there!</p>
    </>
  )
}

export default About
