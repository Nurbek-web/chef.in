"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

import { UserAuth } from "@/context/AuthContext";
import SearchBar from "./search-bar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";

export default function MainNav() {
  const { user, logOut }: any = UserAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="#"
        >
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="/"
        >
          Recipes
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="#"
        >
          Customers
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
              href="#"
            >
              <Package2Icon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="/"
            >
              Recipes
            </Link>
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="#"
            >
              About
            </Link>
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="#"
            >
              Customers
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <SearchBar />
        {!user ? (
          <Link
            className="text-muted-foreground hover:text-foreground"
            href="/signin"
          >
            Sign in
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="secondary">
                <CircleUserIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                My account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

function CircleUserIcon(props: any) {
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
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

// function MenuIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </svg>
//   );
// }

function Package2Icon(props: any) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
