import Link from "next/link";
import { Card } from "./ui/card";

export default function RecipeCard({ recipe }: { recipe: any }) {
  console.log(recipe);
  return (
    <>
      <Link href={`/${recipe.id}`}>
        <Card className="w-full group overflow-hidden rounded-lg shadow-sm transition-all hover:scale-[1.02] hover:shadow-md">
          <div className="relative h-full">
            <img
              alt="Recipe Image"
              className="h-full w-full object-cover"
              height={450}
              src={recipe.data.image}
              style={{
                aspectRatio: "600/450",
                objectFit: "cover",
              }}
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <h3 className="text-white font-medium text-lg">
                {recipe.data.title}
              </h3>
            </div>
          </div>
        </Card>
      </Link>
    </>
  );
}
