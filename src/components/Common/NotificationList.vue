<script setup>
import {defineEmits} from 'vue'

const emit = defineEmits(['changeVisibility'])
</script>

<template>
    <div class="notification" style="overflow-y: auto;">
        <div class="px-2 py-3 sticky-top bg-white">
            <h1 style="font-size: 1.2em;">Notifications</h1>
            <i 
                class="bi bi-x-lg fs-4 me-4"
                @click="emit('changeVisibility')"
                style="cursor: pointer;"
            ></i>
        </div>
        <ul class="list-group">
            <li 
                v-for="i in [0,1,2,3,4,5,6,7,8,9,10,11,12,13]"
                :key="i"
                class="list-group-item d-flex gap-3"
            >
                <RouterLink to="/" @click="emit('changeVisibility')">
                    <img 
                        src="../../assets/images/default_profile_picture.jpg" 
                        alt=""
                        class="rounded-circle"
                        style="width: 1.75em; height: 1.75em; object-fit: cover;"
                    />
                </RouterLink>
                <div class="d-block">
                    <p>Someone liked your post</p>
                    <span 
                        style="color: var(--text-c3); 
                        font-weight: var(--font-x-light);
                        font-size: 12px;"
                    >23 mins ago</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.notification {
    width: 20em;
    height: 100vh;
    z-index: 9;
    position: fixed;
    left: 5.2em;
    top: 4em !important;
    background-color: var(--white);
    box-shadow: 12px 0 15px #4f4f4f17;

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media (width < 771px) {
        width: 100%;
        left: 0;
    }
}
</style>