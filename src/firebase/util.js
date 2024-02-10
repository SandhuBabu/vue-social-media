import { auth } from '@/firebase/config'
import {onAuthStateChanged} from 'firebase/auth'

export const isAuthenticated = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
               resolve(true)
            } else {
                reject(false)
            }
        });
    })
}

export const getCurrentUser = () => {
    return auth?.currentUser
}

export const getUserProfilePicture =(uid) => {
    return `https://firebasestorage.googleapis.com/v0/b/social-media-217e3.appspot.com/o/${uid}.jpg?alt=media`
}