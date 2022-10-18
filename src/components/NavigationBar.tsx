import { FC } from 'react'
import Image from 'next/image'
import homeIcon from '../../public/nav-home-icon.png'
import searchIcon from '../../public/nav-search-icon.png'
import profileIcon from '../../public/nav-person-icon.png'
import insertIcon from '../../public/nav-insert-icon.png'

const NavigationBar: FC = () => {
  return (
    <div className="fixed flex top-1/2 translate-y-[-50%] inset-x-10 h-4/5 w-24 flex-col gap-3 items-center justify-center rounded-full bg-pink">
      <div className="relative w-full">
        <Image
          src={homeIcon}
          layout="intrinsic"
          height={homeIcon.height}
          width={homeIcon.width}
          alt="Navigation bar"
        />
      </div>
      <div className="relative w-full">
        <Image
          src={searchIcon}
          layout="intrinsic"
          height={searchIcon.height}
          width={searchIcon.width}
          alt="Navigation bar"
        />
      </div>
      <div className="relative w-full">
        <Image
          src={insertIcon}
          layout="intrinsic"
          height={insertIcon.height}
          width={insertIcon.width}
          alt="Navigation bar"
        />
      </div>
      <div className="relative w-full">
        <Image
          src={profileIcon}
          layout="intrinsic"
          height={profileIcon.height}
          width={profileIcon.width}
          alt="Navigation bar"
        />
      </div>
    </div>
  )
}

export default NavigationBar
