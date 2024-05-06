import RecipeCard from "./recipe-card";

export default function Recipes({ recipes }: { recipes: any }) {
  console.log(recipes);

  return (
    <>
      {recipes.map((recipe: any, key: any) => (
        <RecipeCard key={key} recipe={recipe} />
      ))}
    </>
  );
}
