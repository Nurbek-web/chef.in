/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4NdIYSKCaW5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card";

export default function Component() {
  return (
    <Card className="w-full max-w-md group">
      <div className="relative overflow-hidden rounded-lg">
        <img
          alt="Recipe Image"
          className="aspect-[3/2] w-full object-cover transition-all duration-300 group-hover:scale-105"
          height={400}
          src="/placeholder.svg"
          width={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white transition-all duration-300 group-hover:translate-y-[-0.25rem] group-hover:opacity-100">
            Creamy Mushroom Risotto
          </h3>
        </div>
      </div>
    </Card>
  );
}
