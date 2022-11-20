export const canvasMeetDOM = (canvas) => {
  if (canvas) {
    const canvasDomWidth = canvas.clientWidth;
    const canvasDomHeight = canvas.clientHeight;
    canvas.width = canvasDomWidth;
    canvas.height = canvasDomHeight;
  }
};