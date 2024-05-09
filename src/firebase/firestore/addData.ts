import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(
  collection: string,
  id: string,
  data: any
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true, // Merge the new data with existing document data
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
