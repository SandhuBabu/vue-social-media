<script setup>
import { ref } from 'vue';
import PostCarousal from './PostCarousal.vue';
import defaultProfilePicture  from '@/assets/images/default_profile_picture.jpg'

const { post } = defineProps({
    post: {
        type: Object,
        required: true
    }
})

const isDescFull = ref(false)
</script>

<template>
    <article class="shadow-sm">
        <div class="post-owner">
            <img :src="post.owner.photoUrl ?? defaultProfilePicture" alt="">
            <RouterLink :to="{name:'user', params: {userUid: post.owner.uid}}">
                <h2>{{ post.owner.name }}</h2>
            </RouterLink>
        </div>
        <PostCarousal :posts="post.media" />
        <div class="action-container">
            <i class="bi like" 
            @click="post.isLiked = !post.isLiked"
            :class="post.isLiked ? 'bi-suit-heart-fill' : 'bi-suit-heart'"></i>
            <p>8743 likes</p>
        </div>
        <div class="description" :style="{
            flexDirection: isDescFull?'column':'row'
        }">
            <p
            :class="{full: isDescFull}"
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ipsam quasi quidem qui, aperiam repellendus alias in iste at error tenetur illum iure eos eum omnis quis voluptatibus ad? Inventore?
            </p>
            <span @click="isDescFull=!isDescFull">
            {{ isDescFull?'less':'more' }}
            </span>
        </div>
    </article>
</template>

<style lang="scss" scoped>
article {
    width: 30em;
    max-width: 30em;
    padding: 1em;
    background-color:var(--card-c1);

    .post-owner {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 5px;

        img {
            width: 2.5em;
            height: 2.5em;
            border-radius: 50%;
            object-fit: cover;
        }

        a {
            text-decoration: none;
            color: var(--text-c2);

            h2 {
                font-size: 1em;
            }
        }
    }

    .action-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 5px;

        .like {
            font-size: 1.5em;
            cursor: pointer;

            &.bi-suit-heart-fill {
                color: var(--like);
            }

            &.bi-suit-heart {
                color: var(--text-c1);
            }
        }

        p {
            margin: 0;
        }
    }

    .description {
        display: flex;
        padding: 0 5px;
        
        p {
            font-size: 14px;
            display: -webkit-inline-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            
            &.full {
                display: block;
            }
        }

        span {
            width: max-content;
            cursor: pointer;
            font-size: 0.9em;
            color: var(--text-c4);
        }
    }

    @media (width <=771px) {
        width: 100%;
    }
}
</style>