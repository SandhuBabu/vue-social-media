import { updateProfile } from 'firebase/auth'
import { auth } from './config'
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL,
    deleteObject
} from 'firebase/storage'

export const uploadImageFile = async (file, imageReference) => {
    if(!file || !imageReference) return

    const storage = getStorage();
    const storageRef = ref(storage, imageReference)

    try {
        const {ref} = await uploadBytes(storageRef, file)
        let downloadUrl = await getDownloadURL(ref)
        // downloadUrl = downloadUrl.split('?')[0] + '?alt=media'

        return {
            error: false,
            url: downloadUrl
        }
    } catch(err) {
        return {
            error: true,
            url: undefined
        }
    }
}

export const updateUserProfile = async (profileOptions) => {
    if(!profileOptions)
        return
    try {
        await updateProfile(auth.currentUser, profileOptions)
    } catch (err) {
        console.log("Failed to update user profile");
    }
}

export const deleteFileFromUrl = async (url) => {
    if(!url) return

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