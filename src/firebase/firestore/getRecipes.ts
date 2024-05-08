import firebase_app from "../config";
import {
  getDocs,
  collection,
  query,
  orderBy,
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
  recipesPerPage: number
) {
  const recipesRef = collection(db, "recipes");

  let q = query(
    recipesRef,
    where("title", ">=", queryText),
    where("title", "<=", queryText + "\uf8ff"),
    // orderBy("created_at", "desc"), // Order comments by creation time in descending order
    limit(recipesPerPage)
    // limit(pageSize) // Limit number of comments per page
  );

  const recipesSnapshot = await getDocs(q);

  const recipes: any = [];

  recipesSnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    recipes.push({ id: doc.id, data: doc.data() });
  });

  return { recipes };
}

export async function getRecipesPage(
  queryText: string,
  recipesPerPage: number
) {
  const recipesRef = collection(db, "recipes");

  let q = query(
    recipesRef,
    where("title", ">=", queryText),
    where("title", "<=", queryText + "\uf8ff")

    // orderBy("created_at", "desc") // Order comments by creation time in descending order
    // limit(pageSize) // Limit number of comments per page
  );

  const snapshot = await getCountFromServer(q);

  let count = snapshot.data().count;

  count = Math.ceil(count / recipesPerPage);

  console.log("count: ");

  return count;
}
