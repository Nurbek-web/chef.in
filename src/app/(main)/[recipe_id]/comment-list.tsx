import getComments from "@/firebase/firestore/getComments";
import Comment from "./comment";

export default async function ({ recipeId }: { recipeId: any }) {
  // fetch data from firebase
  const comments: any = await getComments(recipeId);
  console.log(comments);

  return (
    <>
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Comments
        </h2>
        <div className="mt-6 space-y-6">
          {comments.map((comment: object) => {
            return <Comment comment={comment} />;
          })}
        </div>
      </div>
    </>
  );
}
