<script setup>
import {ref} from 'vue'
import defaultProfilePicture from '@/assets/images/default_profile_picture.jpg'
import { 
    uploadImageFile, 
    updateUserProfile, 
    deleteFileFromUrl
} from '@/firebase/services'
import { getCurrentUser } from '@/firebase/util'
import { useToast } from 'vue-toast-notification';
import Modal from '../Common/Modal.vue';


 const { userData } = defineProps({
    userData: {
        type:[Object, null],
        required: true
    }
})


const toast = useToast();
const profilePictureRef = ref(null)
const showModal = ref(false)
const currentUser = getCurrentUser()

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
        <div class="position-relative" style="width: max-content;">
            <img 
                :src="userData.photoURL? userData.photoURL:defaultProfilePicture" 
                ref="profilePictureRef"
                alt="" 
                @click="showModal=true"
            />
        </div>
        <div class="profile-info p-3">
            <h3 class="text-capitalize">{{ userData.displayName }}</h3>
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

    img {
        width: 12em;
        height: 12em;
        object-fit: cover;
        border-radius: 50%;
        -webkit-user-drag: none;
        user-select: none;
        cursor: pointer;
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