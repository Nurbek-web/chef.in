import RecipeCard from "./recipe-card";

export default function Recipes({ recipes }: { recipes: any }) {
  return (
    <>
      {recipes.map((recipe: any, key: any) => (
        <RecipeCard key={key} data={recipe} />
      ))}
    </>
  );
}
