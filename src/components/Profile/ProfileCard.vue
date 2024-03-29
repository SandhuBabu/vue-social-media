<script setup>
import {ref, computed} from 'vue'
import defaultProfilePicture from '@/assets/images/default_profile_picture.jpg'
import { 
    uploadImageFile, 
    updateUserProfile, 
    deleteFileFromUrl
} from '@/firebase/services'
import { getCurrentUser } from '@/firebase/util'
import { useToast } from 'vue-toast-notification';
import { useUserStore } from '@/store/userStore'
import Modal from '../Common/Modal.vue';
import FollowFollowingButtons from './FollowFollowingButtons.vue';


// for searched user
const { userData } = defineProps({
    userData: {
        type:[Object, null],
        required: true
    }
})

const { user:storeUser, setFollowings } = useUserStore();

const toast = useToast();
const profilePictureRef = ref(null)
const showModal = ref(false)
const currentUser = getCurrentUser()

const isFollowing = computed(() => {
    if(userData.uid === currentUser.uid) return null
    return storeUser.following
        .find((uid) => uid === userData.uid) ? true : false
})


const handleAddProfile = async ({ target: { files } }) => {
    if(currentUser.uid !== userData.uid) return
    showModal.value = false

    const prevImage = currentUser?.photoURL ?? defaultProfilePicture;
    profilePictureRef.value.src = URL.createObjectURL(files[0])
    
    const {url, error} = await uploadImageFile(files[0], `${currentUser.uid}.jpg`)
    
    if(error) {
        profilePictureRef.value.src = prevImage
        toast.error('Failed to update profile pricture.', {position: 'bottom-right'})
        return
    }

    await updateUserProfile({ photoURL: url })
    profilePictureRef.value.src = url
    toast.success('Profile pricture updated succes!', { position: 'bottom-right' })
}

const deleteProfilePicture = async () => {
    if (currentUser.uid !== userData.uid) return
    showModal.value = false
    
    const {error} = await deleteFileFromUrl(currentUser.photoURL)
    if(error) {
        toast.error('Failed to delete profile pricture.', { position: 'bottom-right' })
        return
    }
    profilePictureRef.value.src = defaultProfilePicture
    await updateUserProfile({photoURL: ''})
}

const handleFollow = (uid) => {
    setFollowings([...storeUser.following, uid])
}

const handleUnFollow = (uid) => {
    const newList = storeUser.following.filter(id => id!==uid)
    setFollowings(newList)
}
</script>

<template>
    <div class="profile-card d-flex gap-2">
        <Modal v-if="(userData.uid === currentUser.uid) && showModal" 
            @cancel="showModal = !showModal">
            <template #title>Change Profile Picture</template>
            <template #body>
               <div class="d-flex justify-content-end gap-3" style="margin-top: 20%;">
                    <label for="upload-pic" class="btn btn-primary">Upload Photo</label>
                    <input 
                        type="file" 
                        id="upload-pic" 
                        class="d-none"
                        :multiple="false" 
                        @change="handleAddProfile"
                     />

                    <button 
                        class="btn btn-outline-danger"
                        @click="deleteProfilePicture"
                    >Delete Picture</button>
               </div>
            </template>
        </Modal>
        <div class="position-relative profile-pic-container" >
            <img 
                :src="userData.photoURL? userData.photoURL:defaultProfilePicture" 
                ref="profilePictureRef"
                alt="" 
                @click="showModal=true"
            />
        </div>
        <div class="profile-info p-3">
            <div class="d-flex">
                <h3 class="text-capitalize">{{ userData.displayName }}</h3>
                 <FollowFollowingButtons
                    v-if="userData.uid !== currentUser.uid"
                    :isFollowing="isFollowing"
                    :currentUserUid="currentUser.uid"
                    :userUid="userData.uid" 
                    @follow="handleFollow"
                    @unfollow="handleUnFollow"
                />
            </div>
            <div class="mt-2">
                <p><span>{{ userData.totalPosts }}</span> Posts</p>
                <p><span>{{ userData.following.length }}</span> Followers</p>
                <p><span>{{userData.followers.length}}</span> Following</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile-card {
    @media (width <= 576px) {
        flex-direction: column;
    } 

    .profile-pic-container {
        @media(width < 771px) {
            width: 100%;
            display: grid;
            place-items: center;
        }

        img {
            width: 12em;
            height: 12em;
            object-fit: cover;
            border-radius: 50%;
            -webkit-user-drag: none;
            user-select: none;
            cursor: pointer;
        }
    }


    .profile-info {
        flex: 1;

        div {
            display: flex;
            gap: 1em;

            p {
                span {
                    font-weight: var(--font-bold);
                }
            }
        }
    }
}
</style>