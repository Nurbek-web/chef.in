import getDocument from "@/firebase/firestore/getData";
import RecipePage from "./recipe";

export default async function Page({
  params,
}: {
  params: { recipe_id: string };
}) {
  const { recipe_id } = params;

  const recipe: any = await getDocument("recipes", recipe_id);

  return (
    <div>
      <RecipePage recipe={recipe} />
    </div>
  );
}
