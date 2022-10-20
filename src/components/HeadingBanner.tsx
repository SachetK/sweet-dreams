import { FC } from 'react'

type HeadingBannerProps = {
  title: string
}

const HeadingBanner: FC<HeadingBannerProps> = ({ title }) => {
  return (
    <>
      <div className="bg-red clip-path-heading">
        <p className="mx-6 p-3 text-center font-sans text-xl font-medium text-white">
          {title}
        </p>
      </div>
    </>
  )
}

export default HeadingBanner
