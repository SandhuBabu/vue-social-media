<script setup>
import {computed} from 'vue'
import {getCurrentUser} from '@/firebase/util'
import { RouterLink } from 'vue-router';

const user = computed(() => getCurrentUser())
</script>

<template>
    <header class="navbar sticky-top bg-light shadow-sm">

        <a 
            target="_blank" 
            class="d-block ms-2" 
            href="https://console.firebase.google.com/u/2/project/social-media-217e3/"
        >Go to Firebase console</a>

        <div style="width: 100%;" class="d-flex justify-content-end align-items-center gap-1 pe-5 text-primary cursor-pointer">
            <RouterLink :to="{name: 'profile'}" style="text-decoration: none; width: max-content;" >
                <h3 
                    class="text-capitalize fs-5"
                >{{ user.displayName }}</h3>
            </RouterLink>
        </div>
    </header>
</template>

<style scoped>
header {
    height: 4em;
    z-index: 9;
}

div {
    h6 {
        letter-spacing: 0.18px;
    }

    i {
        font-size: 1.25em;
        margin-bottom: 5px;
    }

    h6,i {
        cursor: pointer;
    }
}
</style>