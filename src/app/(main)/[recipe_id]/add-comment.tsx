"use client";

import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserAuth } from "@/context/AuthContext";
import addData from "@/firebase/firestore/addData";

export default function CommentForm({ recipe_id }: { recipe_id: any }) {
  //   "use server";
  const { user, logOut }: any = UserAuth();

  console.log(user);
  const handleSubmit = async (formData: FormData) => {
    const comment = formData.get("comment"); // Get the comment from the form data
    console.log("Comment: ", comment);

    // Generate a unique ID for the comment
    const commentId = uuidv4();

    // Add the comment to Firestore
    const { result, error } = await addData("comments", commentId, {
      // Pass the comment data as an object
      message: comment,
      // You can also include other data such as user ID or timestamp if needed
      user_id: user.id,

      created_at: new Date().toISOString(),
      recipe_id: recipe_id,
    });

    // Handle success or error
    if (error) {
      console.error("Error adding comment:", error);
    } else {
      console.log("Comment added successfully:", result);
      // Optionally, you can clear the form here
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Add a Comment
      </h2>
      <form action={handleSubmit} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            className="min-h-[100px]"
            id="comment"
            name="comment"
            placeholder="Write your comment"
          />
        </div>
        <Button className="w-full" type="submit">
          Submit Comment
        </Button>
      </form>
    </div>
  );
}
