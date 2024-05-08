import firebase_app from "../config";
import {
  getDocs,
  collection,
  query,
  where,
  getFirestore,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

export default async function getComments(
  recipeId: string,
  pageSize: number = 4,
  startAfterDoc?: any
) {
  const commentsRef = collection(db, "comments");

  let q = query(
    commentsRef,
    where("recipe_id", "==", recipeId),
    orderBy("created_at", "desc"), // Order comments by creation time in descending order
    limit(pageSize) // Limit number of comments per page
  );

  if (startAfterDoc) {
    q = query(q, startAfter(startAfterDoc));
  }

  const comments: any = [];

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const commentData = doc.data();
    const timeAgo = getTimeAgo(commentData.created_at.toMillis());
    const commentWithTimeAgo = {
      id: doc.id,
      data: {
        ...commentData,
        timeAgo,
      },
    };
    comments.push(commentWithTimeAgo);
  });

  return {
    comments,
    lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
}

// Function to calculate "time ago"
function getTimeAgo(timestamp: any) {
  const now = Date.now();
  const elapsed = now - timestamp;
  const seconds = Math.floor(elapsed / 1000);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
