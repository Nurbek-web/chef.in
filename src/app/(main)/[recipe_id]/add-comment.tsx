"use client";

import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserAuth } from "@/context/AuthContext";
import addData from "@/firebase/firestore/addData";

import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { revalidatePath } from "next/cache";
import getComments from "@/firebase/firestore/getComments";
import { useRouter } from "next/navigation";

export default function CommentForm({ recipe_id }: { recipe_id: any }) {
  const { user }: any = UserAuth();

  const router = useRouter();

  const [disabled, setDisabled] = useState(false); // State to manage the disabled state of the button
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    setDisabled(true); // Disable the button when the form is submitted

    // Generate a unique ID for the comment
    const commentId = uuidv4();

    // Add the comment to Firestore
    const { result, error } = await addData("comments", commentId, {
      message: comment,
      user_id: user.uid,
      created_at: Timestamp.now(),
      user_mail: user.email,
      recipe_id: recipe_id,
    });

    // Handle success or error
    if (error) {
      console.error("Error adding comment:", error);
    } else {
      console.log("Comment added successfully:");
      setComment("");
    }

    setDisabled(false); // Enable the button after submission
    router.refresh();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Add a Comment
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-6 space-y-4"
      >
        <div>
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            className="min-h-[100px]"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)} // Handle changes in the textarea input
            placeholder="Write your comment"
          />
        </div>
        <Button disabled={disabled} className="w-full" type="submit">
          Submit Comment
        </Button>
      </form>
    </div>
  );
}
