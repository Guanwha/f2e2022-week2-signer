<template>
  <div class="w-full bg-bg px-4 py-7 flex-ccc gap-6">
    <!-- tabs -->
    <div class="rounded-2xl bg-white">
      <button type="button" class="btn-anim rounded-2xl px-7 py-2 text-lg cursor-pointer" :class="isSignMode ? classTabActive : classTabInactive" @click="tab = 'sign'">手寫簽名</button>
      <button type="button" class="btn-anim rounded-2xl px-7 py-2 text-lg cursor-pointer" :class="isImportMode ? classTabActive : classTabInactive" @click="tab = 'import'">匯入簽名檔</button>
    </div>
    <!-- content -->
    <div class="w-full flex-ccc gap-4" v-if="isSignMode">
      <!-- color -->
      <div class="flex-rcc gap-4">
        <button class="btn-anim w-11 h-11 rounded-full border border-black flex-ccc">
          <div class="w-9 h-9 rounded-full bg-black"/>
        </button>
        <button class="btn-anim w-11 h-11 rounded-full border border-blue flex-ccc">
          <div class="w-9 h-9 rounded-full bg-blue"/>
        </button>
        <button class="btn-anim w-11 h-11 rounded-full border border-red flex-ccc">
          <div class="w-9 h-9 rounded-full bg-red"/>
        </button>
      </div>
      <!-- canvas -->
      <canvas class="w-full rounded-3xl bg-white"></canvas>
    </div>
    <div class="w-full rounded-3xl bg-white p-6 flex-ccc" v-else-if="isImportMode">
      <!-- image preview -->
      <!-- <p class="text-gray text-lg">請選擇檔案</p> -->
      <label class="my-15 btn-anim text-gray text-lg cursor-pointer" >
        請選擇檔案
        <input type='file' class="hidden" @change='selectFile' :value='fileInputValue' accept=".jpg,.jpeg,.pdf"/>
      </label>
    </div>
    <!-- control buttons -->
    <div class="flex-rcc gap-3">
      <button type="button" class="btn-anim rounded-2xl px-10 py-4 bg-white border border-primary text-primary text-lg cursor-pointer">清除</button>
      <button type="button" class="btn-anim rounded-2xl px-10 py-4 bg-gradient-primary text-white text-lg cursor-pointer">建立簽名</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const classTabActive = `bg-gradient-primary text-white`;
const classTabInactive = `text-primary`;
const tab = ref('sign');  // 'sign', 'import'
const isSignMode = computed(() => tab.value === 'sign');
const isImportMode = computed(() => tab.value === 'import');
</script>

<style>
</style>