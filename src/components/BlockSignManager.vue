<template>
  <div class="w-full bg-bg px-4 py-7 flex-ccc gap-6">
    <!-- tabs -->
    <div class="rounded-2xl bg-white">
      <button type="button" class="btn-anim rounded-2xl px-7 py-2 text-lg cursor-pointer" :class="isSignMode ? classTabActive : classTabInactive" @click="tab = 'sign'">手寫簽名</button>
      <button type="button" class="btn-anim rounded-2xl px-7 py-2 text-lg cursor-pointer" :class="isImportMode ? classTabActive : classTabInactive" @click="tab = 'import'">匯入簽名檔</button>
    </div>
    <!-- content -->
    <div class="w-full max-w-[600px] mt-12 flex-ccc gap-4" v-show="isSignMode">
      <div class="w-full flex-rsbc">
        <!-- color -->
        <div class="flex-rcc gap-4">
          <button class="btn-anim w-11 h-11 rounded-full border-black flex-ccc" :class="colorIsBlack ? 'border' : ''" @click="setSignColor('black')">
            <div class="w-9 h-9 rounded-full bg-black"/>
          </button>
          <button class="btn-anim w-11 h-11 rounded-full border-blue flex-ccc" :class="colorIsBlue ? 'border' : ''" @click="setSignColor('blue')">
            <div class="w-9 h-9 rounded-full bg-blue"/>
          </button>
          <button class="btn-anim w-11 h-11 rounded-full border-red flex-ccc" :class="colorIsRed ? 'border' : ''" @click="setSignColor('red')">
            <div class="w-9 h-9 rounded-full bg-red"/>
          </button>
        </div>
        <!-- clear button -->
        <button id="clear" type="button" class="btn-anim px-5 text-lg text-primary">清除</button>
      </div>
      <!-- canvas -->
      <canvas id="canvas" class="w-full rounded-3xl bg-white"></canvas>
    </div>
    <div class="w-full max-w-[600px] mt-12 rounded-3xl bg-white p-[10%] flex-ccc" v-show="isImportMode">
      <!-- image preview -->
      <label class="my-15 btn-anim text-gray text-lg cursor-pointer">
        <p v-show="!hasImagePreview">請選擇檔案</p>
        <img v-show="hasImagePreview" id="selected-img" src="" alt="">
        <input type='file' class="hidden" @change='selectImage' :value='fileInputValue' accept=".png,.svg"/>
      </label>
    </div>
    <!-- control buttons -->
    <div class="flex-rcc gap-3">
      <button type="button" class="btn-anim rounded-2xl px-10 py-4 bg-white border border-primary text-primary text-lg cursor-pointer" @click="gotoNext()">略過</button>
      <button type="button" class="btn-anim rounded-2xl px-10 py-4 bg-gradient-primary text-white text-lg cursor-pointer" @click="createSign()">{{ (isSignMode) ? '建立簽名' : '加入簽名' }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { selectImageFile } from '@/utils/file';
import { canvasMeetDOM } from '@/utils/oper';

const store = useStore();
const router = useRouter();
const emit = defineEmits(['close']);

/** tabs *****/
const classTabActive = `bg-gradient-primary text-white`;
const classTabInactive = `text-primary`;
const tab = ref('sign');  // 'sign', 'import'
const isSignMode = computed(() => tab.value === 'sign');
const isImportMode = computed(() => tab.value === 'import');

/** sign canvas */
const canvas = ref(null);
const ctx = ref(null);
const signColors = {
  'black': '#000000',
  'blue': '#0014C7',
  'red': '#CA0000',
};
const signColor = ref('black');   // 'black', 'blue', 'red'
const setSignColor = (color) => {
  if (ctx.value) {
    signColor.value = color;
    ctx.value.strokeStyle = signColors[color];
    ctx.value.stroke();
  }
};
const colorIsBlack = computed(() => signColor.value === 'black');
const colorIsBlue = computed(() => signColor.value === 'blue');
const colorIsRed = computed(() => signColor.value === 'red');

onMounted(() => {
  canvas.value = document.querySelector("#canvas");
  ctx.value = canvas.value.getContext("2d");
  const clearBtn = document.querySelector("#clear");
  canvasMeetDOM(canvas.value);

  // 設定線條的相關數值
  ctx.value.lineWidth = 1;
  ctx.value.lineCap = "round";

  // 設置狀態來確認滑鼠 / 手指是否按下或在畫布範圍中
  let isPainting = false;

  // 開始繪圖時，將狀態開啟
  function startPosition(e) {
    e.preventDefault();
    isPainting = true;
  }

  // 結束繪圖時，將狀態關閉，並產生新路徑
  function finishedPosition() {
    isPainting = false;
    ctx.value.beginPath();
  }

  // 繪圖過程
  function draw(e) {
    // 滑鼠移動過程中，若非繪圖狀態，則跳出
    if (!isPainting) return;

    // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
    const paintPosition = getPaintPosition(e);

    // 移動滑鼠位置並產生圖案
    ctx.value.lineTo(paintPosition.x, paintPosition.y);
    ctx.value.stroke();
  }

  // 取得滑鼠 / 手指在畫布上的位置
  function getPaintPosition(e) {
    const canvasSize = canvas.value.getBoundingClientRect();

    if (e.type === "mousemove") {
      return {
        x: e.clientX - canvasSize.left,
        y: e.clientY - canvasSize.top,
      };
    } else {
      return {
        x: e.touches[0].clientX - canvasSize.left,
        y: e.touches[0].clientY - canvasSize.top,
      };
    }
  }

  // 重新設定畫布
  function reset() {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }

  // event listener 電腦板
  canvas.value.addEventListener("mousedown", startPosition);
  canvas.value.addEventListener("mousemove", draw);
  canvas.value.addEventListener("mouseup", finishedPosition);
  canvas.value.addEventListener("mouseleave", finishedPosition);

  // event listener 手機板
  canvas.value.addEventListener("touchstart", startPosition);
  canvas.value.addEventListener("touchmove", draw);
  canvas.value.addEventListener("touchend", finishedPosition);
  canvas.value.addEventListener("touchcancel", finishedPosition);

  clearBtn.addEventListener("click", reset);
});

/** load image */
const fileInputValue = ref(null);
// selected image
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
const selectedImage = ref(null);
const hasImagePreview = ref(false);
onMounted(() => {
  selectedImage.value = document.querySelector("#selected-img");
});
const selectImage = (e) => {
  store.dispatch('startLoading', '讀檔中...');
  selectImageFile(e, 500000, '500 KB',)
    .then((image) => {
      setTimeout(() => {
        selectedImage.value.src = image.preview;
        hasImagePreview.value = true;
      }, 1000);
    })
    .catch((err) => console.log(err, false, false, true))
    .finally(() => store.dispatch('endLoading'));
};

/** add base64 image to store */
const createSign = () => {
  if (canvas.value) {
    // image.value.src = canvas.value.toDataURL("image/png");
    store.dispatch('startLoading', '簽名優化中...');

    if (isSignMode.value) {
      store.dispatch('sign/addSignFile', canvas.value.toDataURL("image/png"));
    }
    else if (isImportMode.value && hasImagePreview.value) {
      store.dispatch('sign/addSignFile', selectedImage.value.src);
    }

    setTimeout(() => {
      store.dispatch('endLoading');
      // [TODO] go to next route
      router.push('/pdf/add');
    }, 1000);
  }
};

const gotoNext = () => {
  emit('close');
  router.push('/pdf/add');
};

</script>

<style>
</style>