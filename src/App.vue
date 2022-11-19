<template>
  <div class="w-full min-w-[320px] h-full relative">
    <router-view></router-view>
    <Loading class="transition-all duration-500" :class="isLoading ? 'z-50 opacity-100' : '-z-10 opacity-0'">{{ loadingMsg }}</Loading>
  </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { computed } from 'vue';
import { useStore } from 'vuex'
import Loading from '@/components/Loading.vue';

const loadingMsg = computed(() => useStore().state.loadingMsg);
const isLoading = computed(() => useStore().state.isLoading);
</script>

<style scoped>
</style>
