/**
 * v0 by Vercel.
 * @see https://v0.dev/t/hKsI4wnECmw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
      <div className="container max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <Link className="flex items-center gap-2" href="#">
          <ChefHatIcon className="h-6 w-6" />
          <span className="font-medium">nFactorial Incubator 2024</span>
        </Link>
        <p className="text-gray-500 dark:text-gray-400">
          © 2024 Taizhanov Nurbek. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function ChefHatIcon(props: any) {
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
