"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

export default function Comment({ comment }: { comment: any }) {
  console.log(comment);

  return (
    <>
      <div key={comment.id} className="flex items-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{comment.data.user_mail}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {comment.data.timeAgo}
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {comment.data.message}
          </p>
        </div>
      </div>
    </>
  );
}
