"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import { useEffect, useState } from "react";

import { UserAuth } from "@/context/AuthContext";
import { getCommentsOfUser } from "@/firebase/firestore/getComments";
import { deleteComment as deleteCommentOfUser } from "@/firebase/firestore/deleteComment";

export default function ProfilePage() {
  const { user, logOut }: any = UserAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  console.log(comments);

  useEffect(() => {
    async function fetchComments() {
      try {
        const fetchedComments = await getCommentsOfUser(user.uid);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [user]);

  const deleteComment = async (commentId: string) => {
    try {
      setLoading(true); // Set loading state to true
      await deleteCommentOfUser(commentId);

      toast("Comment has been deleted", {
        action: {
          label: "OK",
          onClick: () => console.log("Ok"),
        },
      });

      setComments((prevComments) =>
        prevComments.filter((comment: any) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

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
        {comments.map((comment: any) => (
          <div key={comment.id}>
            <div className="grid gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      {user.email[0] + user.email[1]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium">{user.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.data.timeAgo}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <DeleteIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your comment and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteComment(comment.id)}
                          disabled={loading} // Disable the delete button when loading
                        >
                          {loading ? "Deleting..." : "Continue"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                <p>{comment.data.message}</p>
              </div>
            </div>
          </div>
        ))}
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
