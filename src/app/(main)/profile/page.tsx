"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UserAuth } from "@/context/AuthContext";
import CommentsOfUser from "./comments-of-user";

export default function ProfilePage() {
  const { user }: any = UserAuth();

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 md:h-20 md:w-20">
          <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
          <AvatarFallback>{user.email[0] + user.email[1]}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="text-lg font-medium">{user.email}</div>
        </div>
      </div>
      <div className="grid w-full max-w-2xl gap-6">
        <CommentsOfUser user={user} />
      </div>
    </div>
  );
}
