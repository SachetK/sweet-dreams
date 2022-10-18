import Image from 'next/image'
import { FC } from 'react'
import continueIcon from '../../public/continue-main.png'

type ButtonComponentProps = {
  text: string
  color?: string
  bgColor?: string
  onClick?: () => void
}

const ButtonComponent: FC<ButtonComponentProps> = ({ text }) => {
  return (
    <>
      <button
        className="w-auto flex-none rounded-full shadow-xl border-b-8 border-dark-red bg-red active:border-b-4 active:shadow-md"
        type="button"
      >
        <div className="flex flex-row items-center justify-center">
          <p className="w-2/3 flex-wrap justify-center p-2 font-sans text-xl font-medium">
            {text}
          </p>
          <div className="relative w-1/4 self-center p-2">
            <Image
              src={continueIcon}
              layout="responsive"
              height={continueIcon.height}
              width={continueIcon.width}
              alt="Continue button"
            />
          </div>
        </div>
      </button>
    </>
  )
}

export default ButtonComponent
