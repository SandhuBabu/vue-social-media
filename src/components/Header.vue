<script setup>
import {computed} from 'vue'
import {getCurrentUser} from '@/firebase/util'
import { RouterLink } from 'vue-router';

const username = computed(() => getCurrentUser()?.displayName)
</script>

<template>
    <header class="navbar sticky-top bg-light shadow-sm">
        <div style="width: 100%;">
            <RouterLink :to="{name: 'profile'}" style="text-decoration: none;" class="d-flex justify-content-end align-items-center pe-5 text-primary cursor-pointer">
                <i class="bi bi-person-check me-1"></i>
                <h6 class="fw-medium">{{ username }}</h6>
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