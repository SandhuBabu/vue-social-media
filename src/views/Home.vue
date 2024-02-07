<script setup>
import {auth} from '@/firebase/config'
import {useRouter} from 'vue-router'
import {signOut} from 'firebase/auth'
import PostCard from '../components/Post/PostCard.vue';

const router = useRouter()

const logout = () => {
  signOut(auth).then(() => {
    router.push({name:'login'})
  }).catch((error) => {
    console.log(error);
    alert("Failed to signout")
  });
}

</script>

<template>
  <main>
    <div>
      <PostCard v-for="i in [0,1,2,3]" :key="i" />
    </div>
    <div>
      Something here
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  position: relative;

  div {
    &:first-child {
      display: flex;
      flex: 1;
      flex-direction: column;
      row-gap: 1em;
      align-items: center;
    }

    &:last-child {
      width: 15em;
      height: 20em;
      background-color: red;
      position: sticky;
      top: 4em;

      @media (width < 991px) {
        display: none;
      }
    }
  }
}
</style>