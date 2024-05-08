import firebase_app from "../config";
import {
  getDocs,
  collection,
  query,
  startAfter,
  getFirestore,
  where,
  getCountFromServer,
  limit,
} from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

export default async function getRecipes(
  queryText: string,
  currentPage: number,
  recipesPerPage: number,
  lastVisible: any
) {
  const recipesRef = collection(db, "recipes");

  let q;

  if (lastVisible == null) {
    q = query(
      recipesRef,
      where("title", ">=", queryText),
      where("title", "<=", queryText + "\uf8ff"),
      // orderBy("created_at", "desc"), // Order comments by creation time in descending order
      limit(recipesPerPage)
      // limit(pageSize) // Limit number of comments per page
    );
  } else {
    q = query(
      recipesRef,
      where("title", ">=", queryText),
      where("title", "<=", queryText + "\uf8ff"),
      startAfter(lastVisible),
      limit(recipesPerPage)
      // limit(pageSize) // Limit number of comments per page
    );
  }

  const recipesSnapshot = await getDocs(q);

  const recipes: any = [];

  recipesSnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    recipes.push({ id: doc.id, data: doc.data() });
  });

  console.log("last", lastVisible);

  return { recipes, lastVisible };
}
