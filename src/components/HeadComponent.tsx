import Head from 'next/head'
import { FC } from 'react'

type HeadComponentProps = {
  title: string
  description: string
}

const HeadComponent: FC<HeadComponentProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default HeadComponent
