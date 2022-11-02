import { NextPage } from "next";
import { useSession } from "next-auth/react";
import RecipeComponent from "../../components/RecipeComponent";
import { trpc } from "../../utils/trpc";

const SavedRecipes: NextPage = () => {
    const { data: session } = useSession();
    const { data: user } = trpc.useQuery(['user.getUser', { userId: session?.user?.id as string }]);
    const { data: recipes } = trpc.useQuery(['recipe.getRecipesByIds', { ids: user?.savedRecipes ?? [] }]);
    return (
        <main className="bg-main h-screen">
            <h1 className="text-6xl text-bold text-center">Saved Recipes</h1>
            <div className="w-max mx-[32%] my-4">
            {recipes?.map((recipe) => (
                <RecipeComponent key={recipe.id} recipe={recipe} />
            ))}
            </div>
        </main>
    );
}

export default SavedRecipes;