import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useHistory } from "../components/HistoryProvider";
import RecipeComponent from "../components/RecipeComponent";
import { trpc } from "../utils/trpc";

const History: NextPage = () => {
    const { history } = useHistory()
    return (
        <main className="bg-main h-screen">
            <h1 className="text-6xl text-bold text-center">History</h1>
            <div className="w-max mx-[32%] my-4">
            {history?.map((recipe) => (
                <RecipeComponent key={recipe.id} recipe={recipe} />
            ))}
            </div>
        </main>
    );
}  

export default History;