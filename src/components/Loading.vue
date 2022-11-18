<template>
  <div class="absolute inset-0 bg-bg flex-ccc">
    <div class="w-32 h-32" ref="bodyAnimation"/>
    <slot/>
    <div class="w-32 h-32"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import lottie from 'lottie-web';
import animLoading from '@/assets/lottie/anim_loading.json';

const bodyAnimation = ref(null);
onMounted(() => {
  lottie.loadAnimation({
    container: bodyAnimation.value, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animLoading,          // 更正後
  });
});
</script>

<style>

</style>