import Head from 'next/head'

type HeadComponentProps = {
  title: string
  description: string
}

const HeadComponent: React.FC<HeadComponentProps> = ({
  title,
  description,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default HeadComponent
