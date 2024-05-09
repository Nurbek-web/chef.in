import firebase_app from "../config";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function updateComment(commentId: string, updatedMessage: string) {
  try {
    const commentRef = doc(db, "comments", commentId);
    await updateDoc(commentRef, {
      message: updatedMessage,
    });
    console.log("Comment updated successfully");
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
}
