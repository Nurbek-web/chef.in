"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getCommentsOfUser } from "@/firebase/firestore/getComments";
import { UserAuth } from "@/context/AuthContext";
import { deleteComment as deleteCommentOfUser } from "@/firebase/firestore/deleteComment";
import { updateComment as updateCommentOfUser } from "@/firebase/firestore/updateComment";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import CommentsSkeleton from "./comments-skeleton";

export default function CommentsOfUser({ user }: { user: any }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId]: any = useState(null);
  const [loadingOfComments, setLoadingOfComments]: any = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchComments() {
      setLoadingOfComments(true);
      try {
        const fetchedComments = await getCommentsOfUser(user.uid);
        setComments(fetchedComments);
        setLoadingOfComments(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [user]);

  const handleEditComment = async (commentId: string) => {
    try {
      setLoading(true);
      await updateCommentOfUser(commentId, editedComment);

      toast("Comment updated successfully", {
        action: {
          label: "OK",
          onClick: () => console.log("Ok"),
        },
      });

      setComments((prevComments: any) =>
        prevComments.map((comment: any) =>
          comment.id === commentId
            ? { ...comment, data: { ...comment.data, message: editedComment } }
            : comment
        )
      );

      setEditMode(null);
      setEditedComment("");
    } catch (error) {
      console.error("Error editing comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDialogOpen = (commentId: string) => {
    setDeleteDialogOpen(true);
    setSelectedCommentId(commentId);
  };

  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      await deleteCommentOfUser(selectedCommentId);

      toast("Comment deleted successfully", {
        action: {
          label: "OK",
          onClick: () => console.log("Ok"),
        },
      });

      setComments((prevComments) =>
        prevComments.filter((comment: any) => comment.id !== selectedCommentId)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loadingOfComments ? (
        <>
          <CommentsSkeleton />
        </>
      ) : (
        comments.map((comment: any) => (
          <div key={comment.id}>
            <div className="grid gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid gap-1">
                    <div className="font-medium">{user.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.data.timeAgo}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setEditMode(comment.id)}
                  >
                    <EditIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteDialogOpen(comment.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this comment?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteComment}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(`/${comment.data.recipe_id}`)}
                  >
                    <LinkIcon className="h-4 w-4" /> <span> Go to recipe</span>
                    <span className="sr-only">Go to recipe</span>
                  </Button>
                </div>
              </div>
              {editMode === comment.id ? (
                <div className="mt-4">
                  <Textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    rows={3}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="destructive"
                      onClick={() => setEditMode(null)}
                      className="mr-2"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleEditComment(comment.id)}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  <p>{comment.data.message}</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}

function EditIcon(props: any) {
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
