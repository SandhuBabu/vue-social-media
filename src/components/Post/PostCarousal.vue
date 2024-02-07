<script setup>
import { ref } from 'vue';

const {posts} = defineProps({
  posts: {
    type: Array,
    required: true
  }
})  

const currentViewing = ref({post:posts[0], count: 0})

const handleChangePost = (type) => {
  const currentIndex = currentViewing.value.count
  if(type === "next" && currentIndex < posts.length) {
      currentViewing.value = {
        post: posts[currentIndex+1],
        count: currentIndex+1
      }
      return
  }

  if(currentIndex > 0) {
    currentViewing.value = {
      post: posts[currentIndex - 1],
      count: currentIndex - 1
    }
  }
}
</script>

<template>
  <div class="carousal ">
    <div class="posts">
      <img
        v-if="currentViewing.post.type==='image'"
        :src="currentViewing.post.src" 
        alt="post not available to show"
      >
      <video v-if="currentViewing.post.type === 'video'" controls>
        <source :src="currentViewing.post.src" type="video/mp4">
      </video>

      <div v-if="posts?.length>1" class="next-prev">
        <svg 
          @click="handleChangePost('prev')" 
          type="button"
          role="button"
          class="next-prev-button bi bi-arrow-left-circle-fill"
          :class="{disabled: currentViewing.count === 0}" 
          xmlns="http://www.w3.org/2000/svg"
          width="23" height="23"  
          viewBox="0 0 16 16">
           <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
        </svg>
  
        <svg 
          @click="handleChangePost('next')" 
          class="next-prev-button bi bi-arrow-right-circle-fill"
          :class="{disabled: currentViewing.count === posts.length-1}" 
          xmlns="http://www.w3.org/2000/svg" 
          width="23" height="23"
          viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousal {
  max-width: 30em;

   @media (width <= 771px) {
        width: 100%;
        max-width: 100%;
    }

  .posts {
    width: 100%;
    height: 35em;
    overflow: hidden;
    position: relative;
    user-select: none;

    img {
      width: 100%;
      min-height: 30em;
      max-height: 35em;
      object-fit: cover;
    }

    video {
      width: 100%;
      height: auto;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .next-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;

    .next-prev-button {
      fill: #ffffff9c;
      cursor: pointer;

      &:hover {
        fill: #ffffffc8;
        transition: color 200ms;
      }

      &.disabled,
      &.disabled:hover{
        fill: rgba(255, 255, 255, 0.268);
        cursor: not-allowed;
      }
    }
  }
}
</style>