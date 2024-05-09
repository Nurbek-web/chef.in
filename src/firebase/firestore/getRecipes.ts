import firebase_app from "../config";
import {
  getDocs,
  collection,
  query,
  startAfter,
  getFirestore,
  where,
  limit,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getRecipes(
  queryText: string,
  recipesPerPage: number,
  lastVisible: any,
  currentPage: number
) {
  const recipesRef = collection(db, "recipes");

  let q = query(
    recipesRef,
    where("title", ">=", queryText),
    where("title", "<=", queryText + "\uf8ff"),
    orderBy("created_at", "desc"),
    limit(recipesPerPage)
  );

  if (lastVisible && currentPage > 1) {
    q = query(
      recipesRef,
      where("title", ">=", queryText),
      where("title", "<=", queryText + "\uf8ff"),
      orderBy("created_at", "desc"),
      startAfter(lastVisible),
      limit(recipesPerPage)
    );
  }

  const recipesSnapshot = await getDocs(q);

  const recipes: any = [];
  let newLastVisible = null;

  recipesSnapshot.forEach((doc) => {
    recipes.push({ id: doc.id, data: doc.data() });
    newLastVisible = doc;
  });

  return { recipes, lastVisible: newLastVisible };
}
