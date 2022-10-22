import { Recipe } from '@prisma/client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import homeImage from '../../public/sweet-dreams-main.png'

const RecipeComponent: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { title, time, averageRating, image } = recipe

  const [img, setImg] = useState<string>('')

  useEffect(() => {
    // setImg(image.toString('base64'))
  }, [image])

  return (
    // <p>pp</p>

    <div className="w-auto rounded-3xl bg-yellow">
      <div className="flex h-28 w-full flex-row items-center">
        <div className="relative ml-4 mr-8 h-24 w-24 ">
          <Image
            className="rounded-full"
            src={homeImage}
            alt="recipe image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="flex w-96 flex-col">
          <h1 className="text-2xl">{title}</h1>
          <p className="text-md">Time: {time}</p>
          <p className="text-md">Average Rating: {averageRating}/5</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeComponent
