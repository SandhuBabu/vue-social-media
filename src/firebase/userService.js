import { 
    collection, 
    doc, 
    getDocs, 
    query, 
    updateDoc, 
    where,
    arrayUnion, 
    arrayRemove,
    serverTimestamp
} from "firebase/firestore";
import { db } from "./config";
import { NEW_FOLLOWER } from "./enums";


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


export const handleFollowUnfollow = (currentUserUid, userUid, type) => {
    if(!type)
        return {error: true}

    const currentUserRef = doc(db, "users", currentUserUid);
    const userRef = doc(db, "users", userUid);

    if(type === "FOLLOW")
        return follow(currentUserRef, userRef, currentUserUid, userUid)
    
    else if(type === "UNFOLLOW")
        return unfollow(currentUserRef, userRef, currentUserUid, userUid)
    
}

const follow = async (currentUserRef, userRef, currentUserUid, userUid) => {
    try {
        // add following to current user following
        await updateDoc(currentUserRef, {
            following: arrayUnion(userUid)
        })

        // add follower to user followers
        await updateDoc(userRef, {
            followers: arrayUnion(currentUserUid)
        })
        await addNotification(userUid, {
            type: NEW_FOLLOWER,
            title: 'A new follower added to list',
            userId: currentUserUid
        })
        return { error: false }
    } catch (error) {
        console.log(error);
        return { error: true }
    }
}

const unfollow = async (currentUserRef, userRef, currentUserUid, userUid) => {
    try {
        // remove following from current user
        await updateDoc(currentUserRef, {
            following: arrayRemove(userUid)
        })

        // remove follower to user followers
        await updateDoc(userRef, {
            followers: arrayRemove(currentUserUid)
        })
        return { error: false }
    } catch (error) {
        console.log(error);
        return { error: true }
    }
}

export const addNotification = async (userUid, notification) => {
    const userRef = doc(db, "users", userUid);
    return await updateDoc(userRef, {
        'notifications.unread': arrayUnion({...notification, timestamp: new Date()})
    })
}