<template>
  <div class="w-full h-full xl:bg-white relative">
    <!-- interactions (~1279px) -->
    <section class="absolute top-0 w-full px-9 pt-6 flex-ctc gap-3 xl:hidden">
      <!-- logo + history -->
      <div class="w-full flex-rsbb">
        <img class="h-15" src="@/assets/logo/logo.svg" alt="logo">
        <a class="text-lg text-black" href="#">歷史紀錄</a>
      </div>
      <!-- file region -->
      <div class="w-full h-[57vh] bg-white border-2 border-dashed border-gray rounded-[26px] p-8 relative">
        <img class="absolute top-[10%] inset-x-1/2 -translate-x-1/2 h-[28.6%]" src="@/assets/home/img_file.png" alt="image">
        <div class="z-10 absolute-center w-full flex-ccc gap-2 pt-16">
          <label class="btn-anim rounded-2xl px-16 py-4 bg-gradient-primary text-white text-lg cursor-pointer" >
            選擇檔案
            <input type='file' class="hidden" @change='selectFile' :value='fileInputValue' accept=".jpg,.jpeg,.pdf"/>
          </label>
          <p class="text-primary">(限10MB 內的PDF或JPG檔)</p>
        </div>
      </div>
    </section>
    <!-- interactions (1280px~) -->
    <section class="absolute inset-0 w-auto mt-6 mx-9 mb-14 hidden xl:block">
      <!-- logo + history -->
      <div class="w-full flex-rsbb">
        <img class="h-15" src="@/assets/logo/logo.svg" alt="logo">
        <a class="text-lg text-black mr-28" href="#">歷史紀錄</a>
      </div>
      <!-- description (1280px~) -->
      <div class="absolute inset-x-20 top-20 bottom-0 bg-bg rounded-[34px]">
        <div class="absolute top-0 left-0 bg-gradient-primary px-12 py-3 text-2xl text-white rounded-tl-[34px] rounded-br-[34px]">免費試用版</div>
        <div class="absolute top-[19%] left-[7%] flex-ctl gap-4">
          <h1 class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-primary">小綠簽</h1>
          <div class="text-black">
            <p>護樹、永續、減碳的綠色生活</p>
            <p>響應環保無紙化電子簽署，</p>
            <p>省時便利又環保。</p>
          </div>
        </div>
      </div>
      <!-- file region -->
      <div class="absolute top-[13%] right-[15%] w-[32.6%] h-[52%] bg-white border-2 border-dashed border-gray rounded-[26px] p-8">
        <img class="absolute top-[10%] inset-x-1/2 -translate-x-1/2 h-[28.6%]" src="@/assets/home/img_file.png" alt="image">
        <div class="z-10 absolute-center w-full flex-ccc gap-2 pt-16">
          <label class="btn-anim rounded-2xl px-16 py-4 bg-gradient-primary text-white text-lg cursor-pointer" >
            選擇檔案
            <input type='file' class="hidden" @change='selectFile' :value='fileInputValue' accept=".jpg,.jpeg,.pdf"/>
          </label>
          <p class="text-primary">(限10MB 內的PDF或JPG檔)</p>
        </div>
      </div>
    </section>
    <!-- illustrate -->
    <section class="absolute bottom-0 w-full h-full">
      <img class="lawn-1" src="@/assets/home/lawn_1.png" alt="illus lawn 1">
      <img class="lawn-2" src="@/assets/home/lawn_2.png" alt="illus lawn 2">
      <img class="person-1" src="@/assets/home/person_1.png" alt="illus person 1">
      <img class="person-2" src="@/assets/home/person_2.png" alt="illus person 2">
      <img class="person-3" src="@/assets/home/person_3.png" alt="illus person 3">
      <img class="plant-1" src="@/assets/home/plant_1.png" alt="illus plant 1">
      <img class="plant-2" src="@/assets/home/plant_2.png" alt="illus plant 2">
      <img class="plant-3" src="@/assets/home/plant_3.png" alt="illus plant 3">
    </section>
    <!-- footer -->
    <footer class="absolute bottom-0 w-full py-2.5 text-center text-xs text-black">
      小綠簽 © Code: Eric Fei  /  Design: KT
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'
import { selectImageFile } from '@/utils/file';

const store = useStore();

// selected hero image
// non-upload FILE: {
//   name: "<圖檔名稱>.png",
//   type: "image/png",
//   size: 220939,
//   preview: "data:image/png;base64,...",
//
//   lastModified: 1584459505672,
//   lastModifiedDate: "<Time Object>",
//   webkitRelativePath: ""
// }
const selectedFile = ref(null);
const fileInputValue = ref(null);
const selectFile = (e) => {
  store.dispatch('startLoading', '上傳中...');
  selectImageFile(e, 10000000, '10 MB', 1, '', true)
    .then((file) => {
      setTimeout(() => {
        selectedFile.value = file;
        store.dispatch('pdf/setCurrentPDF', file);
        store.dispatch('endLoading');
        // [TODO] go to next route
      }, 1000);
    })
    .catch((err) => { console.log(err, false, false, true); });
};
</script>

<style lang="scss" scoped>
.lawn-1 {
  @apply absolute hidden;
  @apply xl:block xl:bottom-[22%] xl:left-0 xl:w-[19%];
}
.lawn-2 {
  @apply absolute bottom-6 right-1 w-[94.7%];
  @apply xl:bottom-5 xl:right-[9.5%] xl:w-[52.3%];
}
.person-1 {
  @apply absolute bottom-12 left-[2.5%] w-[37.8%];
  @apply xl:bottom-18 xl:left-auto xl:right-[42.9%] xl:w-[14.7%];
}
.person-2 {
  @apply absolute bottom-11 right-[38.7%] w-[25.8%];
  @apply xl:bottom-14 xl:right-[28.6%] xl:w-[10.1%];
}
.person-3 {
  @apply absolute bottom-14 right-[5%] w-[28.8%];
  @apply xl:bottom-19 xl:right-[15.7%] xl:w-[11.1%];
}
.plant-1 {
  @apply absolute hidden;
  @apply xl:block xl:bottom-0 xl:left-0 xl:w-[11.8%];
}
.plant-2 {
  @apply absolute bottom-11 right-[22.7%] w-[20.2%];
  @apply xl:bottom-14 xl:right-[22.5%] xl:w-[7.8%];
}
.plant-3 {
  @apply absolute hidden;
  @apply xl:block xl:top-0 xl:right-0 xl:w-[9.5%];
}
</style>