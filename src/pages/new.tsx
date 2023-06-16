import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import HeadComponent from "../components/HeadComponent";
import NavigationBar from "../components/NavigationBar";
import { api } from "~/utils/api";

const NewRecipe: NextPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [timeToCook, setTimeToCook] = useState(0);
  const addRecipe = api.recipe.create.useMutation();
  const router = useRouter();

  return (
    <main className="bg-main h-full">
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Description</h1>
            <input
              type="text"
              placeholder="Description"
              className="rounded-md border-2 border-black"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Time to cook</h1>
            <input
              type="number"
              placeholder="Time to cook"
              className="rounded-md border-2 border-black"
              onChange={(e) => setTimeToCook(e.target.valueAsNumber)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Ingredients</h1>
            <h6>Seperate ingredients by commas</h6>
            <input
              type="text"
              placeholder="Ingredients"
              className="rounded-md border-2 border-black"
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Steps</h1>
            <h6>Seperate steps by commas</h6>
            <input
              type="text"
              placeholder="Steps"
              className="rounded-md border-2 border-black"
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <ButtonComponent
            text="Submit"
            type="submit"
            onClick={() => {
              addRecipe.mutate({
                title: title,
                description: description,
                ingredients: ingredients.split(","),
                instructions: instructions.split(","),
                timeToMake: timeToCook,
              });
              router.push("/feed");
            }}
            color={"bg-pink"}
            borderColor={"border-pink-dark"}
          />
        </div>
      </div>
    </main>
  );
};

export default NewRecipe;
