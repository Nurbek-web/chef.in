import Link from "next/link";
import { Card } from "./ui/card";
import { formatDistanceToNow } from "date-fns";

export default function RecipeCard({ recipe }: { recipe: any }) {
  console.log(recipe);

  const createdAt = recipe.data.created_at.toDate(); // Convert Firebase Timestamp to JavaScript Date object
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <>
      <Link href={`/${recipe.id}`}>
        <Card className="w-full max-w-md group">
          <div className="relative overflow-hidden rounded-lg">
            <img
              alt="Recipe Image"
              className="aspect-[3/2] w-full object-cover transition-all duration-300 group-hover:scale-105"
              height={400}
              src={recipe.data.image}
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-col items-start justify-between gap-2">
                <h3 className="text-2xl font-bold text-white transition-all duration-300 group-hover:translate-y-[-0.25rem] group-hover:opacity-100">
                  {recipe.data.title}
                </h3>
                <div className="flex items-center text-sm text-gray-300">
                  <time dateTime="2023-05-09">{timeAgo}</time>
                  <span className="mx-2">•</span>
                  <span>{recipe.data.author}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </>
  );
}
