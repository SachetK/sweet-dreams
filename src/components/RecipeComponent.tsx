import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useHistory } from "./HistoryProvider";
import { RecipeWithRating } from "../utils/types";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";

const RecipeComponent: React.FC<{ recipe: RecipeWithRating }> = ({
  recipe,
}) => {
  const { title, timeToMake, image, ratings } = recipe;
  const saveRecipe = trpc.useMutation("user.saveRecipe");

  const { data: session } = useSession();
  const { data: user } = trpc.useQuery([
    "user.getUser",
    { userId: session?.user?.id as string },
  ]);

  const [img, setImg] = useState<string>("");
  const averageRating = useMemo(() => {
    return ratings.reduce((a, b) => a + b.rating, 0) / ratings.length;
  }, [ratings]);

  useEffect(() => {
    setImg(image?.toString("base64") ?? "/sweet-dreams-main.png");
  }, [image]);

  const { setHistory } = useHistory();

  return (
    <Link href={`/recipe/${recipe.id}`}>
      <a>
        <div
          className="bg-yellow w-auto rounded-3xl"
          onClick={() => setHistory((prev) => [...prev, recipe])}
        >
          <div className="flex h-28 w-full flex-row items-center">
            <div className="relative ml-4 mr-8 h-24 w-24 ">
              <Image
                className="rounded-full"
                src={img}
                alt="recipe image"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                unoptimized={true}
              />
            </div>
            <div className="flex w-48 flex-col">
              <h1 className="text-2xl">{title}</h1>
              <p className="text-md">Time: {timeToMake} mins</p>
              <p className="text-md">Average Rating: {averageRating}/5</p>
            </div>
            <button
              type="button"
              className="bg-red clip-path-heading mx-4 px-4"
              onClick={() =>
                saveRecipe.mutate({
                  savedRecipes: [...(user?.savedRecipes ?? []), recipe.id],
                })
              }
            >
              <p className="text-center font-sans text-lg font-medium text-white">
                Save Recipe
              </p>
            </button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default RecipeComponent;
