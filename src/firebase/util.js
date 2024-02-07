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