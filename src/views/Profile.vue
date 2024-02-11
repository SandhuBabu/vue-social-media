<script setup>
import { ref, onBeforeMount, watchEffect, watch} from 'vue'
import { useRoute } from 'vue-router';
import ProfileCard from '@/components/Profile/ProfileCard.vue';
import {getUserDataFromDB} from '../firebase/services'
import { getCurrentUser } from '../firebase/util'

const route = useRoute()
const currentUser = ref(null)


const handlegetUserData = async (uid) => {
   const { error, data } = await getUserDataFromDB(uid);
   if (!error)
      currentUser.value = data
}

// onBeforeMount(() => {
//    handlegetUserData()
// })

watchEffect(() => {
   if(route.params.userUid) {
      handlegetUserData(route.params.userUid)
   } else {
      handlegetUserData(getCurrentUser().uid)
   }
})

// watch(() => route.params, () => handlegetUserData, {deep: true})
</script>

<template>
   <ProfileCard v-if="currentUser" :userData="currentUser" />
</template>

<style>
</style>