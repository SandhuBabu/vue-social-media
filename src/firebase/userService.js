import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";


export const searchUsers = async (searchQuery) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("displayName", "==", searchQuery));

    let users = []
    try {
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            users.push(doc.data())
        });
    } catch {
        console.error("Failed to search users");
    } finally {
        return users
    }
}