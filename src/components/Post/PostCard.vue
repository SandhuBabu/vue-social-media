<script setup>
import PostCarousal from './PostCarousal.vue';

const images = [
    {
        src: 'https://www.w3schools.com/html/movie.mp4',
        type:'video'
    },
    {
        src:'https://images.unsplash.com/photo-1535063130681-0fe292a3524b?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDEzfHx8ZW58MHx8fHx8',
        type: "image"
    },
    {
        src:"https://i.pinimg.com/originals/05/11/d6/0511d6b82fc3ab707378b353f5694ddb.jpg",
        type: 'image'
    },
    {
        src:"https://i.pinimg.com/736x/c2/89/33/c2893347e55a2cb5e483f5bcf9d4e590.jpg",
        type: 'image'
    }
]  
</script>

<template>
    <article class="shadow-sm">
        <h6>Post owner</h6>
        <PostCarousal :posts="images" />
    </article>
</template>

<style lang="scss" scoped>
article {
    width: 30em;
    max-width: 30em;
    padding: 1em;
    background-color: rgb(244, 244, 244);

    @media (width <= 771px) {
        width: 100%;
    }
}
</style>