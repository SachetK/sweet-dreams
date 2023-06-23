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
  
  const saveRecipe = api.user.saveRecipe.useMutation({
    onSuccess: () => setSaved(true),
  });
  const [saved, setSaved] = useState(false);

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
    
      <div
        className="w-auto rounded-3xl bg-yellow"
      >
        <div className="flex h-28 w-full flex-row items-center">
        <Link href={`/recipe/${recipe.id}`} onClick={() => pushRecipe(recipe)} className="flex h-28 w-full flex-row items-center">
          
            <Image
              className="rounded-full mx-4"
              src={img}
              alt="recipe image"
              height={96}
              width={96}
            />
          
          <div className="flex w-48 flex-col">
            <h1 className="text-2xl">{title}</h1>
            <p className="text-md">Time: {timeToMake} mins</p>
            <p className="text-md">Average Rating: {averageRating}/5</p>
          </div>
          </Link>
          <button
            type="button"
            className="mx-4 bg-red px-8 py-2 clip-path-heading"
            onClick={() =>
              saveRecipe.mutate({
                savedRecipes: [...(user?.savedRecipes ?? []), recipe.id],
              })
            }
          >
            <p className="text-center font-sans text-lg font-medium text-white">
              {saved ? "Saved" : "Save"}
            </p>
          </button>
        </div>
      </div>
    
  );
};

export default RecipeComponent;
