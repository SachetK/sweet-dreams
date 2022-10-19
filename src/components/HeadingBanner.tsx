import { FC } from 'react'

type HeadingBannerProps = {
  title: string
}

const HeadingBanner: FC<HeadingBannerProps> = ({ title }) => {
  return (
    <>
      <div>
        <p className="w-2/3 flex-wrap justify-center p-2 font-sans text-xl font-medium">
          {title}
        </p>
      </div>
    </>
  )
}

export default HeadingBanner
