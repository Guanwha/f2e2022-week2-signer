<template>
  <div class="w-full h-full bg-bg p-4 flex-csbc gap-6">
    <!-- page + send -->
    <section class="w-full bg-bg flex-rsbc gap-2">
      <div class="h-full px-4 py-3 rounded-2xl bg-white flex-rsbc gap-3">
        <button type="button" class="btn-anim rounded-xl" @click="prevPage()">
          <img src="@/assets/pdf/btn_prev.svg" alt="previous page">
        </button>
        <p>{{ `${pdfCurrentPage} / ${pdfTotalPage}` }}</p>
        <button type="button" class="btn-anim rounded-xl" @click="nextPage()">
          <img src="@/assets/pdf/btn_next.svg" alt="next page">
        </button>
      </div>
      <button type="button" class="btn-anim rounded-2xl px-7 py-4 bg-gradient-primary text-lg text-white">完成簽署</button>
    </section>
    <!-- pdf -->
    <section id="canvas-root" class="w-full overflow-auto relative">
      <canvas id="canvas2" class="mx-auto"></canvas>
      <img id="delete-obj-btn" src="@/assets/sign/btn_delete_x.svg" class="absolute cursor-pointer" :style="styleDeleteObjBtn" @click="deleteActiveObject()"/>
    </section>
    <!-- edit operations -->
    <section class="w-full rounded-2xl bg-white p-2">
      <ul class="flex-rcc gap-2">
        <li :class=classBtnEditModeLi @click="selectEditMode('sign')">
          <button type="button" :class="[classBtnEditMode, (editMode === 'sign') ? classBtnEditModeIconActive : classBtnEditModeIconInactive]" @click="addSign()">
            <svg width="24" height="24" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.9337 19.8395C21.5217 19.8395 22 20.3241 22 20.9198C22 21.5166 21.5217 22 20.9337 22H14.9063C14.3183 22 13.84 21.5166 13.84 20.9198C13.84 20.3241 14.3183 19.8395 14.9063 19.8395H20.9337ZM16.7537 3.7379L18.3107 4.97472C18.9492 5.47398 19.3748 6.1321 19.5204 6.82427C19.6884 7.58565 19.5092 8.33341 19.0052 8.98019L9.73064 20.9739C9.305 21.5186 8.67774 21.8249 8.00567 21.8363L4.30931 21.8817C4.10769 21.8817 3.93967 21.7455 3.89486 21.5526L3.05478 17.9102C2.90917 17.2408 3.05478 16.5486 3.48042 16.0153L10.0555 7.50508C10.1675 7.36892 10.3691 7.34736 10.5035 7.44835L13.2702 9.64965C13.4494 9.79716 13.6958 9.87659 13.9535 9.84255C14.5023 9.77447 14.872 9.27521 14.8159 8.7419C14.7823 8.46957 14.6479 8.24263 14.4687 8.07243C14.4127 8.02704 11.7804 5.91651 11.7804 5.91651C11.6124 5.78035 11.5788 5.53072 11.7132 5.36165L12.7549 4.01023C13.7182 2.77341 15.3984 2.65994 16.7537 3.7379Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <p :class="(editMode === 'sign') ? classBtnEditModeTextActive : classBtnEditModeTextInactive">簽名</p>
        </li>
        <!-- <li :class=classBtnEditModeLi @click="selectEditMode('check')">
          <button type="button" :class="[classBtnEditMode, (editMode === 'check') ? classBtnEditModeIconActive : classBtnEditModeIconInactive]">
            <svg width="24" height="24" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99324 19.3627C9.51999 19.3627 9.04673 19.1831 8.68545 18.8219L3.67192 13.8083C2.94937 13.0858 2.94937 11.9153 3.67192 11.1949C4.39448 10.4723 5.56282 10.4702 6.28538 11.1927L9.99324 14.9006L18.7146 6.17922C19.4372 5.45666 20.6055 5.45666 21.3281 6.17922C22.0506 6.90177 22.0506 8.07223 21.3281 8.79479L11.301 18.8219C10.9397 19.1831 10.4665 19.3627 9.99324 19.3627Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <p :class="(editMode === 'check') ? classBtnEditModeTextActive : classBtnEditModeTextInactive">勾選</p>
        </li> -->
        <li :class=classBtnEditModeLi @click="selectEditMode('date')">
          <button type="button" :class="[classBtnEditMode, (editMode === 'date') ? classBtnEditModeIconActive : classBtnEditModeIconInactive]">
            <svg width="24" height="24" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.3524 1.94443C16.8006 1.94338 17.1549 2.29154 17.1559 2.75575L17.157 3.54702C20.0647 3.7749 21.9854 5.75624 21.9885 8.79472L22 17.6886C22.0042 21.0014 19.9229 23.0397 16.5869 23.045L8.43811 23.0555C5.12293 23.0597 3.01565 20.9729 3.01148 17.6506L3.00001 8.86119C2.99585 5.80267 4.84884 3.8266 7.75652 3.55968L7.75548 2.76841C7.75444 2.3042 8.09836 1.95498 8.55692 1.95498C9.01547 1.95393 9.35939 2.30209 9.36044 2.7663L9.36148 3.50482L15.552 3.49638L15.551 2.75786C15.5499 2.29365 15.8939 1.94549 16.3524 1.94443ZM16.7776 16.9248H16.7672C16.2878 16.9364 15.9032 17.3383 15.9137 17.8236C15.9147 18.309 16.3014 18.7088 16.7808 18.7194C17.2695 18.7183 17.6656 18.3163 17.6645 17.8205C17.6645 17.3246 17.2675 16.9248 16.7776 16.9248ZM8.19007 16.9258C7.71067 16.9469 7.33548 17.3489 7.33652 17.8342C7.35841 18.3195 7.75444 18.6993 8.23384 18.6772C8.70386 18.6561 9.078 18.2541 9.05612 17.7688C9.0457 17.294 8.65905 16.9248 8.19007 16.9258ZM12.4838 16.9205C12.0044 16.9427 11.6303 17.3436 11.6303 17.8289C11.6522 18.3142 12.0482 18.693 12.5276 18.6719C12.9966 18.6497 13.3718 18.2488 13.3499 17.7625C13.3395 17.2887 12.9528 16.9195 12.4838 16.9205ZM8.18486 13.1277C7.70545 13.1488 7.33131 13.5508 7.33235 14.0361C7.3532 14.5214 7.75027 14.9012 8.22967 14.8791C8.69865 14.858 9.07279 14.456 9.05091 13.9707C9.04049 13.4959 8.65488 13.1267 8.18486 13.1277ZM12.4797 13.0908C12.0003 13.1119 11.6251 13.5139 11.6261 13.9992C11.647 14.4845 12.044 14.8632 12.5234 14.8421C12.9924 14.82 13.3666 14.4191 13.3457 13.9338C13.3343 13.459 12.9487 13.0897 12.4797 13.0908ZM16.7735 13.0961C16.2941 13.1066 15.9189 13.497 15.9199 13.9823V13.9939C15.9303 14.4792 16.3264 14.8474 16.8068 14.8369C17.2758 14.8253 17.6499 14.4233 17.6395 13.938C17.6176 13.4738 17.2414 13.095 16.7735 13.0961ZM15.5541 5.12112L9.36356 5.12956L9.3646 5.98308C9.3646 6.43779 9.02173 6.7965 8.56317 6.7965C8.10461 6.79756 7.75965 6.4399 7.75965 5.98519L7.75861 5.17282C5.72636 5.37644 4.60184 6.57073 4.60496 8.85908L4.60601 9.18719L20.3846 9.16609V8.79683C20.3398 6.52852 19.2017 5.33845 17.1591 5.16121L17.1601 5.97358C17.1601 6.42724 16.8068 6.78701 16.3587 6.78701C15.9001 6.78806 15.5552 6.42935 15.5552 5.97569L15.5541 5.12112Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <p :class="(editMode === 'date') ? classBtnEditModeTextActive : classBtnEditModeTextInactive">日期</p>
        </li>
        <li :class=classBtnEditModeLi @click="selectEditMode('word')">
          <button type="button" :class="[classBtnEditMode, (editMode === 'word') ? classBtnEditModeIconActive : classBtnEditModeIconInactive]">
            <svg width="24" height="24" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7268 21.6539V6.44259H5.5V3.34616H19.5V6.44259H14.2839V21.6516H10.7268V21.6539Z" fill="currentColor" />
            </svg>
          </button>
          <p :class="(editMode === 'word') ? classBtnEditModeTextActive : classBtnEditModeTextInactive">插入文字</p>
        </li>
      </ul>
    </section>
    <!-- dialog -->
    <DialogSignList
      v-if="showSignListDialog"
      @close="showSignListDialog = false"
      @selected="selectSign()"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { fabric } from 'fabric';
import DialogSignList from '@/components/DialogSignList.vue';
// 因為是以外部引入的方式使用套件，因此需要做環境設定
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";


/** edit mode */
const editMode = ref('sign');   // 'sign', 'check', 'date', 'word'
const classBtnEditModeLi = computed(() => `flex-ccc gap-1 text-xs`);
const classBtnEditMode = computed(() => `btn-anim rounded-lg p-2`);
const classBtnEditModeIconActive = computed(() => `bg-gradient-primary text-white`);
const classBtnEditModeIconInactive = computed(() => `bg-bg text-gray`);
const classBtnEditModeTextActive = computed(() => `text-primary`);
const classBtnEditModeTextInactive = computed(() => `text-gray`);
const selectEditMode = (mode) => {
  editMode.value = mode;
};
const store = useStore();

/** dialog */
const showSignListDialog = ref(false);


/** pdf viewer */
const pdfFile = computed(() => store.getters['pdf/currentPDF']);
let pdfDoc = null;
const pdfCurrentPage = ref(0);
const pdfTotalPage = ref(0);
let fabCanvas = null;

onMounted(() => {
  if (pdfFile.value) {
    fabCanvas = new fabric.Canvas("canvas2");   // get element by id
    pdfToCanvas();
    registerListeners();
  }
  else {
    useRouter().push('/');
  }
});

async function pdfToCanvas() {
  // pdf file => pdf document => pdf page => viewport => canvas
  await pdfToDoc(pdfFile.value);
  await renderPDFPage();
};

// const Base64Prefix = "data:application/pdf;base64,";
async function pdfToDoc(file) {
  // get pdf document
  //== method 1 (file 需使用 readAsDataURL() 載入)
  // const blob = atob(file.preview.substring(Base64Prefix.length));
  // const pdfDoc = await pdfjsLib.getDocument({ data: blob }).promise;  // Using DocumentInitParameters object to load binary data.
  //== method 2 (file 需使用 readAsArrayBuffer() 載入)
  pdfDoc = await pdfjsLib.getDocument(file).promise;
  pdfTotalPage.value = pdfDoc.numPages;
}

async function renderPDFPage(page = 1) {
  const pdfCanvas = await docToCanvas(page);
  const pdfImage = new fabric.Image(pdfCanvas, { scaleX: 1, scaleY: 1 });

  fabCanvas.requestRenderAll();
  fabCanvas.setWidth(pdfImage.width);
  fabCanvas.setHeight(pdfImage.height);
  fabCanvas.setBackgroundImage(pdfImage, fabCanvas.renderAll.bind(fabCanvas));
  console.log(`canvas: ${fabCanvas.width} x ${fabCanvas.height}`);
};

async function docToCanvas(page) {
  if (!pdfDoc) return;

  // get page
  pdfCurrentPage.value = page;
  const pdfPage = await pdfDoc.getPage(pdfCurrentPage.value);

  // get viewport size
  const canvasRoot = document.querySelector('#canvas-root');
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let viewport = pdfPage.getViewport({ scale: 1 });
  viewport = pdfPage.getViewport({ scale: (canvasRoot.clientWidth - 15) / viewport.width });  // rescale viewport
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  // output pdf in canvas
  return pdfPage.render({
    canvasContext: ctx,
    viewport: viewport,
  }).promise.then(() => canvas);
}


/** switch page */
const prevPage = () => {
  pdfCurrentPage.value = (pdfCurrentPage.value <= 1) ? 1 : pdfCurrentPage.value-1;
  refreshPDFPage();
};
const nextPage = () => {
  pdfCurrentPage.value = (pdfCurrentPage.value >= pdfTotalPage.value) ? pdfTotalPage.value : pdfCurrentPage.value+1;
  refreshPDFPage();
};
async function refreshPDFPage() {
  await renderPDFPage(pdfCurrentPage.value);
};


/** fabric canvas objejct operation */
function registerListeners() {
  // http://fabricjs.com/events
  fabCanvas.on('selection:created', function(e) {
    addDeleteObjBtn(e);
  });
  fabCanvas.on('selection:updated', function(e) {
    addDeleteObjBtn(e);
  });
  fabCanvas.on('object:moving', function(e) {
    removeDeleteObjBtn();
  });
  fabCanvas.on('object:modified', function(e) {
    addDeleteObjBtn(e);
  });
  fabCanvas.on('selection:cleared', function(e) {
    removeDeleteObjBtn();
  });
};

// delete objject button
const styleDeleteObjBtn = ref('top:0; left:0; display:none;');
function addDeleteObjBtn(e) {
  if (!e && !e.selected && !e.target) return;

  const target = (e.selected?.[0]) ? (e.selected[0]) : e.target;
	let btnLeft = target.aCoords.tl.x - 12;
	let btnTop = target.aCoords.tl.y - 12;
  styleDeleteObjBtn.value = `top:${btnTop}px; left:${btnLeft}px;`;
};
function removeDeleteObjBtn(){
  styleDeleteObjBtn.value ='top:0; left:0; display:none;';
};
const deleteActiveObject = () => {
  const target = fabCanvas.getActiveObject();
  fabCanvas.remove(target);
};


/** sign */
const signData = computed(() => store.getters['sign/currentSign']);
const addSign = () => {
  showSignListDialog.value = true;
};
const selectSign = () => {
  showSignListDialog.value = false;
  if (!signData.value) return;
  fabric.Image.fromURL(signData.value, function (image) {
    image.top = 0;
    image.scaleX = 0.5;
    image.scaleY = 0.5;
    fabCanvas.add(image);
  });
};


/** check */
/** date */
/** text */


</script>

<style>
</style>
