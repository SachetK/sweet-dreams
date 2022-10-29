import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import homeImage from '../../public/sweet-dreams-main.png'
import { useHistory } from './HistoryProvider'
import { RecipeWithRating } from '../utils/types'
import Link from 'next/link'

const RecipeComponent: React.FC<{ recipe: RecipeWithRating }> = ({
  recipe,
}) => {
  const { title, timeToMake, image, ratings } = recipe
  const [img, setImg] = useState<string>('')
  const averageRating = useMemo(() => {
    return ratings.reduce((a, b) => a + b.rating, 0) / ratings.length
  }, [ratings])

  useEffect(() => {
    // setImg(image.toString('base64'))
  }, [image])

  const { setHistory } = useHistory()

  return (
    <Link href={`/recipe/${recipe.id}`}>
      <a>
        <div
          className="w-auto rounded-3xl bg-yellow"
          onClick={() => setHistory((prev) => [...prev, recipe])}
        >
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
              <p className="text-md">Time: {timeToMake}</p>
              <p className="text-md">Average Rating: {averageRating}/5</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default RecipeComponent
