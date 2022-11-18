
/**
 * select single file(include image)
 * @param  {object} srcEvent
 * @param  {number} maxSize=100000000000
 * @param  {string} maxSizeMsg='100GB'
 * @param  {boolean} includeFile=false
 */
const selectImageFile = (srcEvent, maxSize = 100000000000, maxSizeMsg = '100 GB') => {

  return new Promise((resolve, reject) => {

    if (srcEvent && srcEvent.target && srcEvent.target.files && srcEvent.target.files.length > 0) {
      const file = srcEvent.target.files[0];

      // check file size
      if (file.size > maxSize) {
        const msg = `${file.name} 選擇失敗。(單檔最大不可超過 ${maxSizeMsg}。)`;
        console.log(msg);
        reject(msg);
        srcEvent.target.value = '';  // clear selected
        return;
      }

      // if file is image, generate preview data
      if (/\.(jpe?g|pdf)$/i.test(file.name)) {
        resolve(file);
      }
      else {
        const msg = `${file.name} 格式不符合。`
        console.log(msg);
        reject(msg);
      }
      
      srcEvent.target.value = '';  // clear selected
    }
    else {
      reject('找不到來源檔案，請重新選擇。');
    }
  });
};

export { selectImageFile };
