"use client";

import MainNav from "@/components/main-nav";
import getRecipes from "@/firebase/firestore/getRecipes";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

import Recipes from "@/components/recipes";

export default function Home() {
  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const temp = (await getRecipes()).recipes;

      console.log("Out recipes data from firebase", temp);
      setRecipes(temp);
    };
    getData();
  }, []);

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
          {recipes != null ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <Recipes recipes={recipes} />
            </div>
          ) : (
            <Spinner size="large" />
          )}
        </div>
      </section>
    </>
  );
}
