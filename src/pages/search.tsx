import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import HeadComponent from "../components/HeadComponent";
import NavigationBar from "../components/NavigationBar";
import RecipeComponent from "../components/RecipeComponent";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const Search: NextPage = () => {
  useSession({ required: true });

  const [currPage, setCurrPage] = useState(1);
  const [size, setSize] = useState(1);
  const [search, setSearch] = useState("");
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setSize(Math.floor(height / 146));
  }, [height]);

  const { data, isLoading, isPreviousData } = api.recipe.byNewest.useQuery(
    {
      page: currPage,
      recipesPerPage: size,
    },
    {
      keepPreviousData: true,
    }
  );

  const filteredRecipes = useMemo(() => {
    return data?.recipes.filter((recipe) => {
      return search.trim() === ""
        ? recipe
        : recipe.title.toLowerCase().includes(search.trim().toLowerCase());
    });
  }, [data, search]);

  return (
    <main className="flex h-full min-h-screen flex-col items-center space-y-2 overflow-y-scroll bg-main scrollbar-hide">
      <HeadComponent title="Sweet Dreams - Search" description="Search Page" />
      <NavigationBar />
      <div className="mt-2 flex flex-row space-x-4">
        <form>
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Search for recipies"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <button
          type="button"
          className="w-max bg-red clip-path-button-prev"
          onClick={() => setCurrPage((curr) => curr - 1)}
          disabled={currPage === 1}
        >
          <p className="mx-6 pl-3 text-center font-sans text-xl font-medium text-white">
            Previous
          </p>
        </button>
        <button
          type="button"
          className="ml-4 w-max bg-red clip-path-button-next"
          onClick={() => setCurrPage((curr) => curr + 1)}
          disabled={isPreviousData || currPage * size >= (data?.count ?? 0)}
        >
          <p className="mx-6 pr-4 text-center font-sans text-xl font-medium text-white">
            Next
          </p>
        </button>
      </div>
      <div className="my-2 w-max space-y-2">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          filteredRecipes?.map((recipe) => {
            return <RecipeComponent key={recipe.id} recipe={recipe} />;
          })
        )}
      </div>
    </main>
  );
};

export default Search;
