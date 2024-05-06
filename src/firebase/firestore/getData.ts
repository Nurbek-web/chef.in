import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

// Function to retrieve a document from a Firestore collection
export default async function getDocument(collection: string, id: string) {
  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id);
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    result = docSnap.data();
    console.log("Document data:", docSnap.data());
  } else {
    error = 1;
    console.log("No such document!");
  }

  // Return the result and error as an object
  return { result, error };
}
