import { Recipe } from '@prisma/client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const RecipeComponent: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { title, time, averageRating, image } = recipe

  const [img, setImg] = useState<string>('')

  useEffect(() => {
    setImg(image)
  }, [image])

  return (
    <div>
      <div>
        <div className='rounded-full h-1/4 w-1/4'>
          <Image src={img} alt="recipe image" layout='fill' objectFit='contain' objectPosition='center' />
        </div>
        <div className='flex flex-col w-3/4'>
          <h1 className='text-2xl'>{title}</h1>
          <p className='text-sm'>Time: {time}</p>
          <p className='text-sm'>{averageRating}/5</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeComponent
