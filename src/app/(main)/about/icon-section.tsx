import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersRound } from "lucide-react";

export default function IconSectionStackedCards() {
  return (
    <>
      <div className="container py-24 lg:py-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10">
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <ChefHatIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Discover New Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              Explore a variety of delicious recipes from around the world.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <RecipeBookIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Create Your Cookbook</CardTitle>
            </CardHeader>
            <CardContent>
              Organize your favorite recipes and create your personalized
              cookbook.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4 flex-row items-center gap-4">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-2 bg-primary">
                <UsersRound className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Socialize</CardTitle>
            </CardHeader>
            <CardContent>
              Write comments and share opinion with others! You can comment on
              any recipe!
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export function ChefHatIcon(props: any) {
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
      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
      <path d="M6 17h12" />
    </svg>
  );
}

export function RecipeBookIcon(props: any) {
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
      <path d="M3 3h18v18H3V3z" />
      <path d="M9 9h6v6H9z" />
    </svg>
  );
}

export function SpiceJarIcon(props: any) {
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
      <path d="M19 20H5V10h14m0-4H5l2-8h10l2 8h4z" />
      <path d="M17 18H7v-6h10m0-4H7V4h10m-3 8v4m-4-4v4" />
    </svg>
  );
}
