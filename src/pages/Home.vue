<template>
  <div class="w-full h-full relative">
    <!-- interactions -->
    <section class="absolute top-0 w-full px-9 pt-6 flex-ctc gap-3">
      <!-- logo + history -->
      <div class="w-full flex-rsbb">
        <img class="h-15" src="@/assets/logo/logo.svg" alt="logo">
        <a class="text-lg text-black" href="#">歷史紀錄</a>
      </div>
      <!-- file region -->
      <div class="w-full h-[57vh] bg-white border-2 border-dashed border-gray rounded-[26px] p-8 relative">
        <img class="absolute top-[10%] inset-x-1/2 -translate-x-1/2 h-[28.6%]" src="@/assets/home/img_file.png" alt="image">
        <div class="absolute-center w-full flex-ccc gap-2 pt-16">
          <button type="button" class="btn-anim rounded-2xl px-16 py-4 bg-gradient-to-b from-gradient-top to-gradient-bottom text-white text-lg" >選擇檔案</button>
          <p class="text-primary">(限10MB 內的PDF或JPG檔)</p>
        </div>
      </div>
    </section>
    <!-- illustrate -->
    <section class="absolute bottom-6 w-full">
      <img class="absolute bottom-0 right-1 w-[94.7%]" src="@/assets/home/lawn_2.png" alt="illus lawn_2">
      <img class="absolute bottom-6 left-[2.5%] w-[37.8%]" src="@/assets/home/person_1.png" alt="illus person 1">
      <img class="absolute bottom-5 right-[38.7%] w-[25.8%]" src="@/assets/home/person_2.png" alt="illus person 2">
      <img class="absolute bottom-8 right-[5%] w-[28.8%]" src="@/assets/home/person_3.png" alt="illus person 3">
      <img class="absolute bottom-5 right-[22.7%] w-[20.2%]" src="@/assets/home/plant_2.png" alt="illus plant_2">
    </section>
    <!-- footer -->
    <footer class="absolute bottom-0 w-full py-2.5 text-center text-xs text-black">
      小綠簽 © Code: Eric Fei  /  Design: KT
    </footer>
  </div>
</template>

<script setup>
</script>

<style>

</style>