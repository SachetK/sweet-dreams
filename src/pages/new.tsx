import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useReducer } from "react";
import ButtonComponent from "../components/ButtonComponent";
import HeadComponent from "../components/HeadComponent";
import NavigationBar from "../components/NavigationBar";
import { type RouterInputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";

type RecipeActionTypes =
  | {
      type: "title" | "description";
      value: string;
    }
  | {
      type: "ingredients" | "instructions";
      value: string[];
    }
  | {
      type: "timeToCook";
      value: number;
    };

const NewRecipe: NextPage = () => {
  useSession({ required: true });

  const updateRecipe = (
    recipe: RouterInputs["recipe"]["create"],
    { type, value }: RecipeActionTypes
  ) => {
    switch (type) {
      case "title":
        return { ...recipe, title: value };
      case "description":
        return { ...recipe, description: value };
      case "ingredients":
        return { ...recipe, ingredients: value };
      case "instructions":
        return { ...recipe, instructions: value };
      case "timeToCook":
        return { ...recipe, timeToMake: value };
    }
  };

  const [recipe, update] = useReducer(updateRecipe, {
    title: "",
    description: "",
    ingredients: [] as string[],
    instructions: [] as string[],
    timeToMake: 0,
  });

  const addRecipe = api.recipe.create.useMutation({
    onSuccess: () => {
      void router.push("/");
    },
  });

  const router = useRouter();

  return (
    <main className="h-full min-h-screen bg-main">
      <HeadComponent
        title={"Sweet Dreams - New Recipe"}
        description={"New Recipe for sweet-dreams"}
      />
      <NavigationBar />
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="mt-6 text-4xl font-bold">New Recipe</h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Title</h1>
            <input
              type="text"
              placeholder="Title"
              className="rounded-md border-2 border-black"
              onChange={(e) => update({ type: "title", value: e.target.value })}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Description</h1>
            <input
              type="text"
              placeholder="Description"
              className="rounded-md border-2 border-black"
              onChange={(e) =>
                update({ type: "description", value: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Time to cook</h1>
            <input
              type="number"
              placeholder="Time to cook"
              className="rounded-md border-2 border-black"
              onChange={(e) =>
                update({
                  type: "timeToCook",
                  value: Number.parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Ingredients</h1>
            <h6>Seperate ingredients by commas</h6>
            <input
              type="text"
              placeholder="Ingredients"
              className="rounded-md border-2 border-black"
              onChange={(e) =>
                update({
                  type: "ingredients",
                  value: e.target.value.split(","),
                })
              }
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Steps</h1>
            <h6>Seperate steps by commas</h6>
            <input
              type="text"
              placeholder="Steps"
              className="rounded-md border-2 border-black"
              onChange={(e) =>
                update({
                  type: "instructions",
                  value: e.target.value.split(","),
                })
              }
            />
          </div>
          <ButtonComponent
            text="Submit"
            type="submit"
            onClick={() => void addRecipe.mutateAsync(recipe)}
            color={"bg-pink"}
            borderColor={"border-pink-dark"}
          />
        </div>
      </div>
    </main>
  );
};

export default NewRecipe;
