import getDocument from "@/firebase/firestore/getDocument";
import RecipePage from "./recipe";
import CommentList from "./comment-list";
import CommentForm from "./add-comment";

export default async function Page({
  params,
}: {
  params: { recipe_id: string };
}) {
  const { recipe_id } = params;

  const recipe: any = await getDocument("recipes", recipe_id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="space-y-8">
        <RecipePage recipe={recipe} />
        <CommentForm recipe_id={recipe_id} />
        <CommentList recipeId={recipe_id} />
      </div>
    </div>
  );
}
