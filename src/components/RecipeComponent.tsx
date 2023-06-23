import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useHistory } from "./HistoryProvider";
import type { RecipeWithRating } from "../utils/types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const RecipeComponent: React.FC<{ recipe: RecipeWithRating }> = ({
  recipe,
}) => {
  const { title, timeToMake, image, ratings } = recipe;
  const saveRecipe = api.user.saveRecipe.useMutation();

  const { data: session } = useSession();
  const { data: user } = api.user.byId.useQuery(
    { id: session?.user?.id ?? "" },
    { enabled: !!session }
  );

  const [img, setImg] = useState<string>("");
  const averageRating = useMemo(() => {
    return ratings.reduce((a, b) => a + b.rating, 0) / ratings.length;
  }, [ratings]);

  useEffect(() => {
    setImg(image?.toString("base64") ?? "/sweet-dreams-main.png");
  }, [image]);

  const { pushRecipe } = useHistory();

  return (
    <Link href={`/recipe/${recipe.id}`} onClick={() => pushRecipe(recipe)}>
      <div
        className="w-auto rounded-3xl bg-yellow"
      >
        <div className="flex h-28 w-full flex-row items-center">
          <div className="relative ml-4 mr-8 h-24 w-24 ">
            <Image
              className="rounded-full object-cover object-center"
              src={img}
              alt="recipe image"
              fill
            />
          </div>
          <div className="flex w-48 flex-col">
            <h1 className="text-2xl">{title}</h1>
            <p className="text-md">Time: {timeToMake} mins</p>
            <p className="text-md">Average Rating: {averageRating}/5</p>
          </div>
          <button
            type="button"
            className="mx-4 bg-red px-4 clip-path-heading"
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
    </Link>
  );
};

export default RecipeComponent;
