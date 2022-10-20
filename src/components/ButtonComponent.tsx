import Image from 'next/image'
import { FC } from 'react'
import continueIcon from '../../public/continue-main.png'

type ButtonComponentProps = {
  text: string
  color: string
  borderColor: string
  href?: string
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  text,
  color,
  borderColor,
}) => {
  return (
    <>
      <button
        className={`w-fit flex-none rounded-full border-b-8 shadow-xl ${borderColor} ${color} active:border-b-4 active:shadow-md`}
        type="button"
      >
        <div className="flex flex-row items-center justify-center">
          <p className="w-3/5 flex-wrap justify-center p-4 font-sans text-xl font-medium">
            {text}
          </p>
          <div className="relative mt-2 mr-2 w-14 self-center">
            <Image
              src={continueIcon}
              layout="intrinsic"
              height={55}
              width={56}
              alt="Continue button"
            />
          </div>
        </div>
      </button>
    </>
  )
}

export default ButtonComponent
