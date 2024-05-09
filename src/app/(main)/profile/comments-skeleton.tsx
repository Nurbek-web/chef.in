import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CommentsSkeleton() {
  return (
    <div
      key="1"
      className="flex flex-col items-center gap-6 px-4 py-8 md:px-6 md:py-12"
    >
      <div className="grid w-full max-w-2xl gap-6">
        <div className="grid gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="grid gap-1">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <DeleteIcon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button size="icon" variant="ghost">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Link
                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-gray-50 transition-colors hover:bg-gray-900/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80 dark:focus-visible:ring-gray-300"
                href="#"
              >
                <LinkIcon className="h-4 w-4" />
                <span className="sr-only">View recipe page</span>
              </Link>
            </div>
          </div>
          <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="grid gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="grid gap-1">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <DeleteIcon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button size="icon" variant="ghost">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
          <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteIcon(props: any) {
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
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function LinkIcon(props: any) {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
