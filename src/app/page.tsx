import { Suspense } from "react";

import MainNav from "@/components/main-nav";
import Recipes from "@/components/recipes";
import { getRecipesPage } from "@/firebase/firestore/getRecipes";
import RecipePagination from "@/components/recipe-pagination";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getRecipesPage(query, 4);

  return (
    <>
      <MainNav />

      <section className="w-full py-12">
        <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Recipes</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Explore our collection of delicious recipes.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <Suspense key={query + currentPage} fallback={<>Loading ...</>}>
              <Recipes
                recipesPerPage={4}
                query={query}
                currentPage={currentPage}
              />
            </Suspense>
          </div>
          <RecipePagination totalPages={totalPages} />
        </div>
      </section>
    </>
  );
}
