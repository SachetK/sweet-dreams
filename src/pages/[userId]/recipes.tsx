import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import RecipeComponent from "../../components/RecipeComponent";
import { api } from "~/utils/api";
import HeadComponent from "~/components/HeadComponent";

const SavedRecipes: NextPage = () => {
  const { data: session } = useSession({
    required: true,
  });

  const { data: user } = api.user.byId.useQuery(
    { id: session?.user?.id ?? "" },
    { enabled: !!session }
  );

  const { data: recipes } = api.recipe.byIds.useQuery(
    { ids: user?.savedRecipes ?? [] },
    { enabled: !!user }
  );

  return (
    <main className="min-h-screen h-full bg-main">
      <HeadComponent
        title={`${user?.name ?? "Sweet Dreams"} - Saved Recipes`}
        description={`Saved recipes page for ${user?.name ?? "user"}`}
      />
      <h1 className="text-bold text-center text-6xl">Saved Recipes</h1>
      <div className="mx-[32%] my-4 w-max">
        {recipes?.map((recipe) => (
          <RecipeComponent key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default SavedRecipes;
