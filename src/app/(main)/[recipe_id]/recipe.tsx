import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import CommentList from "./comment-list";

export default function RecipePage({ recipe }: { recipe: any }) {
  console.log(recipe);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {recipe.result.title}
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          By <> </>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {recipe.result.author}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="prose prose-lg dark:prose-invert">
          <p>{recipe.result.description}</p>
        </div>
        <div>
          <img
            alt={recipe.result.title}
            className="rounded-lg object-cover"
            height="400"
            src={recipe.result.image}
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Ingredients
          </h2>
          <ul className="mt-4 space-y-2">
            {recipe.result.ingredients.map((ingredient: any, id: number) => {
              return (
                <li key={id}>
                  {ingredient.name}: {ingredient.quantity}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Instructions
          </h2>
          <ol className="mt-4 space-y-4">
            {recipe.result.instructions.map((instruction: any, id: number) => {
              return <li key={id}>{instruction}</li>;
            })}
          </ol>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Cooking Time
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {recipe.result.cooking_time}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Servings
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {recipe.result.servings} servings
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Difficulty Level
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {" "}
            {recipe.result.difficulty}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Cuisine/Category
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {recipe.result.category}
          </p>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Tags/Keywords
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {recipe.result.tags.map((tag: string, id: number) => {
            return (
              <Badge key={id} variant="secondary">
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          className="w-full inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/"
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          Return Home
        </Link>
      </div>
    </>
  );
}
