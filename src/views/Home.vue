<script setup>
import {ref} from 'vue'
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

const posts = ref([
  {
    owner: {
      uid: '6dsa-sjdh32-kj32',
      name: 'June Luka',
    },
    media: [
      {
        src: 'https://images.unsplash.com/photo-1535063130681-0fe292a3524b?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDEzfHx8ZW58MHx8fHx8',
        type: "image",
      },
      {
        src: "https://i.pinimg.com/originals/05/11/d6/0511d6b82fc3ab707378b353f5694ddb.jpg",
        type: 'image',
        isLiked: false
      },
      {
        src: "https://i.pinimg.com/736x/c2/89/33/c2893347e55a2cb5e483f5bcf9d4e590.jpg",
        type: 'image',
      }
    ],
    isLiked: true // remove this by array of people's id who liked, and calculate isLiked or not in PostCard
  },
  {
    owner: {
      uid: 'bsad65-jsda09-asdn7',
      name: 'Zacks Fed',
      photoUrl: 'https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg'
    },
    media: [
      {
        src: 'https://images.unsplash.com/photo-1535063130681-0fe292a3524b?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDEzfHx8ZW58MHx8fHx8',
        type: "image",
      },
      {
        src: "https://i.pinimg.com/originals/05/11/d6/0511d6b82fc3ab707378b353f5694ddb.jpg",
        type: 'image',
        isLiked: false
      },
      {
        src: "https://i.pinimg.com/736x/c2/89/33/c2893347e55a2cb5e483f5bcf9d4e590.jpg",
        type: 'image',
      }
    ],
    isLiked: false // remove this by array of people's id who liked, and calculate isLiked or not in PostCard
  }
])
</script>

<template>
  <main>
    <div>
      <PostCard 
        v-for="(post, i) in posts" 
        :key="i" :post="post"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  div {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>