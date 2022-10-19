import { FC } from 'react'

type HeadingBannerProps = {
  title: string
}

const HeadingBanner: FC<HeadingBannerProps> = ({ title }) => {
  return (
    <>
      <div className='flex bg-dark-red'>
        <p className="items-center p-2 font-sans text-xl font-medium">
          {title}
        </p>
      </div>
    </>
  )
}

export default HeadingBanner
