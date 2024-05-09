"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

import RecipesSkeleton from "./recipes-skeleton";
import getRecipes from "@/firebase/firestore/getRecipes";
import RecipeCard from "./recipe-card";

export default function Recipes({
  query,
  recipesPerPage,
}: {
  query: string;
  recipesPerPage: number;
}) {
  const [recipes, setRecipes]: any = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const { recipes: fetchedRecipes, lastVisible: newLastVisible } =
          await getRecipes(query, recipesPerPage, lastVisible, currentPage);
        setRecipes(fetchedRecipes);
        setLastVisible(newLastVisible);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [query, recipesPerPage, currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1 && !loading) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (!loading) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          <>
            <RecipesSkeleton />
          </>
        ) : recipes.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="max-w-md w-full space-y-4 text-center">
                <FrownIcon className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400" />
                <h2 className="text-2xl font-bold">No recipes found</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  It looks like there are no recipes to display at the moment.
                  Please check back later.
                </p>
              </div>
            </div>
          </>
        ) : (
          recipes.map((recipe: any) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={goToPreviousPage}
          className="flex items-center gap-2"
          disabled={currentPage === 1 || loading}
          variant="outline"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-gray-500 dark:text-gray-400">{currentPage}</span>
        <Button
          disabled={recipes.length < recipesPerPage || loading}
          className="flex items-center gap-2"
          onClick={goToNextPage}
          variant="outline"
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FrownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
