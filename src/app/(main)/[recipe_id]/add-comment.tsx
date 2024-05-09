"use client";

import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { UserAuth } from "@/context/AuthContext";
import addData from "@/firebase/firestore/addData";

export default function CommentForm({ recipe_id }: { recipe_id: any }) {
  const { user }: any = UserAuth();

  const router = useRouter();

  const [disabled, setDisabled] = useState(true);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    setDisabled(true);

    const commentId = uuidv4();

    const { result, error } = await addData("comments", commentId, {
      message: comment,
      user_id: user.uid,
      created_at: Timestamp.now(),
      user_mail: user.email,
      recipe_id: recipe_id,
    });

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      console.log("Comment added successfully:");
      toast("Comment has been added", {
        action: {
          label: "OK",
          onClick: () => console.log("Ok"),
        },
      });
      setComment("");
    }

    setDisabled(false);
    router.refresh();
  };

  const handleChangeInput = (e: any) => {
    setComment(e.target.value);

    if (e.target.value != "") {
      return setDisabled(false);
    }
    setDisabled(true);
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
            onChange={handleChangeInput}
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
