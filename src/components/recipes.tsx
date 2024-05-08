import RecipeCard from "./recipe-card";
import getRecipes from "@/firebase/firestore/getRecipes";

export default async function Recipes({
  query,
  currentPage,
  recipesPerPage,
}: {
  query: string;
  currentPage: number;
  recipesPerPage: number;
}) {
  const recipes: any = await getRecipes(query, currentPage, recipesPerPage);

  console.log(recipes);

  return (
    <>
      {recipes.recipes.map((recipe: any, key: any) => (
        <RecipeCard key={key} recipe={recipe} />
      ))}
    </>
  );
}
