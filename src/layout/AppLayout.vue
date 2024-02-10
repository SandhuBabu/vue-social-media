<script setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
</script>

<template>
  <div style="display: flex;">
    <Sidebar />
    <div style="flex: 1;">
      <Header />
      <div class="container pt-5 ps-5">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>