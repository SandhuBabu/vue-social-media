import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)

    function setUser(data) {
        user.value = data
        console.log(user.value);
    }

    function setFollowers(followers) {
        user.value.followers = followers
    }
    
    function setFollowings(followings) {
        user.value.following = followings
    }

    return {
        user, 
        setUser, 
        setFollowers, 
        setFollowings
    }
})