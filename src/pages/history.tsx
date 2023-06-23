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
    <main className="min-h-screen h-full p-2 bg-main">
      <HeadComponent
        title="History"
        description={`History page for ${session.user.name ?? "user"}`}
      />
      <h1 className="text-bold text-center text-6xl">History</h1>
      <div className="mx-[32%] my-4 w-max">
        <div className="flex flex-col space-y-2">
        {history.reverse().map((recipe) => (
          <RecipeComponent key={recipe.id} recipe={recipe} />
        ))}
        </div>
      </div>
    </main>
  );
};

export default History;
