import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HeadComponent from "../components/HeadComponent";
import HeadingBanner from "../components/HeadingBanner";
import NavigationBar from "../components/NavigationBar";
import RecipeComponent from "../components/RecipeComponent";
import { api } from "~/utils/api";
import { getServerAuthSession } from "~/server/auth";

const Feed: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <HeadComponent
        title="Sweet Dreams - Main Feed"
        description="Main landing page with recipies"
      />

      <main className="bg-main h-screen overflow-x-hidden">
        <NavigationBar />
        <div className="relative bottom-12 left-32 top-12 h-screen w-full md:bottom-4 md:left-40 md:top-4">
          <RecipeCard title="New Recipes" query={"newest"} />
          <RecipeCard title="Popular Recipes" query={"rating"} />
          <RecipeCard
            title="Your Recipes"
            query={"user"}
            userId={session?.user?.id}
          />
        </div>
      </main>
    </>
  );
};

export default Feed;

const RecipeCard: React.FC<{
  title: string;
  query: "newest" | "rating" | "user";
  userId?: string;
}> = ({ title, query, userId }) => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [size, setSize] = useState<number>(1);

  useEffect(() => {
    setSize(Math.floor(window.innerHeight / 430));
  }, []);

  const { data, isLoading, isPreviousData } = api.recipe.ordered.useQuery(
    {
      page: currPage,
      recipesPerPage: size,
      type: query,
    },
    {
      keepPreviousData: true,
    }
  );

  return (
    <>
      <div className="scrollbar-hide mb-11 mt-2 w-max space-y-2 overflow-y-scroll">
        <div className="mb-2 flex flex-row items-center space-x-8">
          <HeadingBanner title={title} />
          <div>
            <button
              type="button"
              className="bg-pink-dark clip-path-button-prev w-max"
              onClick={() => setCurrPage((curr) => curr - 1)}
              disabled={currPage === 1}
            >
              <p className="mx-6 py-1 pl-3 text-center font-sans text-lg font-medium text-white">
                Previous
              </p>
            </button>
            <button
              type="button"
              className="bg-pink-dark clip-path-button-next ml-2 w-max"
              onClick={() => setCurrPage((curr) => curr + 1)}
              disabled={isPreviousData || currPage * size >= (data?.count ?? 0)}
            >
              <p className="mx-6 py-1 pr-4 text-center font-sans text-lg font-medium text-white">
                Next
              </p>
            </button>
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.recipes.map((recipe) => {
            return <RecipeComponent key={recipe.id} recipe={recipe} />;
          })
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session,
    },
  };
};
