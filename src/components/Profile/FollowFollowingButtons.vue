<script setup>
import {ref} from 'vue'
import { handleFollowUnfollow } from '@/firebase/userService'
import { useToast } from 'vue-toast-notification';

const emit = defineEmits(['follow', 'unfollow'])

const {isFollowing, currentUserUid, userUid} = defineProps({
    isFollowing: {
        type: Boolean,
        required: true
    },
    currentUserUid: {
        type: String,
        required: true
    },
    userUid: {
         type: String,
         required: true   
    }
})

const isLoading = ref(false)
const toast = useToast();

const handleFollow = async () => {
    isLoading.value = true
    const {error} = await handleFollowUnfollow(currentUserUid, userUid, "FOLLOW")
    if(error) {
        toast.error('Failed to follow', { position: 'bottom-right' })
        return
    }
    emit('follow', userUid)
    toast.success('Follow Success', { position: 'bottom-right' })
    isLoading.value = false
}

const handleUnFollow = async () => {
    isLoading.value = true
    const { error } = await handleFollowUnfollow(currentUserUid, userUid, "UNFOLLOW")
    if (error) {
        toast.error('Failed to unfollow', { position: 'bottom-right' })
        return
    }
    emit('unfollow', userUid)
    toast.success('Unfollow Success', { position: 'bottom-right' })
    isLoading.value = false
}
</script>

<template>
    <button
        class="btn btn-sm d-flex align-items-center gap-2"
        :class="isFollowing? 'btn-outline-secondary':'btn-primary'"
        :disabled="isLoading"
        @click="() => {
            if(isFollowing)
                handleUnFollow()
            else
                handleFollow()
        }"
    >
        {{isFollowing?'Unfollow': 'Follow'}}
        <span v-if="isLoading" class="spinner-border" role="status"></span>
    </button>
</template>

<style lang="scss" scoped>
span {
    width: 17px;
    height: 17px;
    border-width: 2px;
}
</style>