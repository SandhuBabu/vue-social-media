import { updateProfile } from 'firebase/auth'
import { auth } from './config'
import { db } from './config'
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage'


export const uploadImageFile = async (file, imageReference) => {
    if (!file || !imageReference) return

    const storage = getStorage();
    const storageRef = ref(storage, imageReference)

    try {
        const { ref } = await uploadBytes(storageRef, file)
        let downloadUrl = await getDownloadURL(ref)
        // downloadUrl = downloadUrl.split('?')[0] + '?alt=media'

        return {
            error: false,
            url: downloadUrl
        }
    } catch (err) {
        return {
            error: true,
            url: undefined
        }
    }
}

export const updateUserProfile = async (profileOptions) => {
    if (!profileOptions)  return
    try {
        await updateProfile(auth.currentUser, profileOptions)
        await setDoc(doc(db, 'users', auth.currentUser.uid), profileOptions, { merge: true });
        // if(profileOptions?.displayName && profileOptions?.photoURL) {
        //     await setDoc(
        //         doc(db, 'users', auth.currentUser.uid), 
        //         { 
        //             displayName: profileOptions.displayName,
        //             photoURL: profileOptions.photoURL
        //         },
        //         { merge: true }
        //     );
        // }
        // else if(profileOptions?.displayName ) {
        //     await setDoc(doc(db, 'users', auth.currentUser.uid), { displayName: profileOptions.displayName }, { merge: true });
        // }
        // else if (profileOptions?.photoURL) {
        //     await setDoc(doc(db, 'users', auth.currentUser.uid), { photoURL: profileOptions.photoURL }, { merge: true });
        // }
    } catch (err) {
        console.log("Failed to update user profile");
    }
}

export const deleteFileFromUrl = async (url) => {
    if (!url) return

    try {
        const storage = getStorage();
        const storageRef = ref(storage, url)
        await deleteObject(storageRef)
        return {
            error: false
        }
    } catch {
        return {
            error: true
        }
    }
}

export const createNewUserInDB = async (uid, displayName, email) => {
    try {
        await setDoc(doc(db, 'users', uid), {
            uid,
            displayName,
            email,
            followers: [],
            following: [],
            totalPosts: 0,
            createdAt: serverTimestamp()
        })
    } catch (error) {
        console.log("err", error);
    }
}

export const getUserDataFromDB = async (uid) => {
    if(!uid) return {error:true}
    try {
        const snapshot = await getDoc(doc(db, "users", uid))
        if (snapshot.exists()) {
            return {
                error: false,
                data: snapshot.data()
            }
        } else {
            return {error:true}
        }
    } catch(err) {
        console.log("no user", err);
        return {error:true}
    }
}