import type { NextPage } from "next";
import { useHistory } from "../components/HistoryProvider";
import RecipeComponent from "../components/RecipeComponent";
import { useSession } from "next-auth/react";
import HeadComponent from "~/components/HeadComponent";

const History: NextPage = () => {
  const { history } = useHistory();
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <></>;
  }

  return (
    <main className="h-screen bg-main">
      <HeadComponent
        title={`${session.user.name ?? "Sweet Dreams"} - Saved Recipes`}
        description={`Saved recipes page for ${session.user.name ?? "user"}`}
      />
      <h1 className="text-bold text-center text-6xl">History</h1>
      <div className="mx-[32%] my-4 w-max">
        {history.reverse().map((recipe) => (
          <RecipeComponent key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default History;
