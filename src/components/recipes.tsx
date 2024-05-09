"use client";

import RecipeCard from "./recipe-card";
import { useState, useEffect } from "react";
import getRecipes from "@/firebase/firestore/getRecipes";
import { Button } from "./ui/button";
import RecipesSkeleton from "./recipes-skeleton";

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
