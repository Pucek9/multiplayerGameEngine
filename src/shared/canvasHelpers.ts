import { degToRad, rotatePoint } from './helpers';
import { ImageFilter } from './types';

export function drawCircle(ctx, camera, x, y, size) {
  ctx.arc(-(camera.x - x), camera.y - y, size, 0, 2 * Math.PI);
}

export function drawUnRotatedRectangle(ctx, camera, x, y, width, height) {
  ctx.rect(-(camera.x - x), camera.y - y, width, -height);
  // ctx.translate(-(camera.x - x), camera.y - y);
  // ctx.rect(0, 0, width, -height);
}

// export function renderImage(ctx: CanvasRenderingContext2D, camera, img, x, y, width, height, deg) {
//   ctx.translate(-(camera.x - x), camera.y - y);
//   ctx.rotate(deg);
//   if (img.src) {
//     ctx.drawImage(img, width, height);
//   }
// }

export function renderImage(ctx: CanvasRenderingContext2D, camera, img, x, y, width, height, deg) {
  ctx.translate(-(camera.x - x), camera.y - y);
  ctx.rotate(deg);
  if (img.src) {
    ctx.drawImage(
      img,
      (-width * camera.zoom) / 2,
      (-height * camera.zoom) / 2,
      width * camera.zoom,
      height * camera.zoom,
    );
  }
}

export function renderMap(ctx, camera, img, width, height) {
  if (img.src) {
    ctx.drawImage(img, -camera.x - width / 2, camera.y - height / 2);
  }
}

export function drawRotatedRectangle(ctx, camera, x, y, width, height, deg) {
  const realX = -(camera.x - x),
    realY = +(camera.y - y),
    centerX = realX + width / 2,
    centerY = realY + -height / 2,
    w = width,
    h = -height,
    angleOfRad = -degToRad(deg);

  const leftTop = [realX, realY],
    rightTop = [realX + w, realY],
    rightBottom = [realX + w, realY + h],
    leftBottom = [realX, realY + h];

  const rotateLeftTop = rotatePoint([centerX, centerY], leftTop, angleOfRad),
    rotateRightTop = rotatePoint([centerX, centerY], rightTop, angleOfRad),
    rotateRightBottom = rotatePoint([centerX, centerY], rightBottom, angleOfRad),
    rotateLeftBottom = rotatePoint([centerX, centerY], leftBottom, angleOfRad);

  ctx.beginPath();
  ctx.moveTo(rotateLeftTop.x, rotateLeftTop.y);
  ctx.lineTo(rotateRightTop.x, rotateRightTop.y);
  ctx.lineTo(rotateRightBottom.x, rotateRightBottom.y);
  ctx.lineTo(rotateLeftBottom.x, rotateLeftBottom.y);
  ctx.closePath();
}

export async function convertImage(
  src: string,
  filter: ImageFilter,
  params?: any,
): Promise<string> {
  const image = await addImageProcess(src);
  const myCanvas = document.createElement('canvas');
  const myCanvasContext = myCanvas.getContext('2d');

  const imgWidth = image.width || image.naturalWidth;
  const imgHeight = image.height || image.naturalHeight;
  // set the width and height to the same as the image
  myCanvas.width = imgWidth;
  myCanvas.height = imgHeight;

  // draw the image
  myCanvasContext.drawImage(image, 0, 0);
  // get all the image data into an array
  const imageData = myCanvasContext.getImageData(0, 0, imgWidth, imgHeight);
  filter(imageData, params);
  myCanvasContext.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
  return myCanvas.toDataURL('image/png');
}

async function addImageProcess(src): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
