import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getDocument(collection: string, id: string) {
  const docRef = doc(db, collection, id);
  let result = null;
  let error = null;

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    result = docSnap.data();
    console.log("Document data:", docSnap.data());
    error = 0;
  } else {
    error = 1;
    console.log("No such document!");
  }

  return { result, error, id };
}
