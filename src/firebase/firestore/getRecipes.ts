import firebase_app from "../config";
import {
  getDocs,
  collection,
  query,
  orderBy,
  getFirestore,
} from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

export default async function getRecipes() {
  const recipesRef = query(collection(db, "recipes"));

  const recipesSnapshot = await getDocs(recipesRef);

  const recipes = recipesSnapshot.docs.map((doc) => doc.data());
  return { recipes };
}
