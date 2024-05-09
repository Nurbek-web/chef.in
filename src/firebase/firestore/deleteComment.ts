import firebase_app from "../config";
import { doc, getFirestore, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function deleteComment(commentId: string) {
  try {
    await deleteDoc(doc(db, "comments", commentId));
    console.log("Comment successfully deleted from Firestore");
  } catch (error) {
    console.error("Error deleting comment from Firestore:", error);
    throw error;
  }
}
