import { degToRad, rotatePoint } from './helpers';

export function drawCircle(ctx, camera, x, y, size) {
  ctx.arc(-(camera.x - x), camera.y - y, size, 0, 2 * Math.PI);
}

export function drawUnRotatedRectangle(ctx, camera, x, y, width, height) {
  ctx.rect(-(camera.x - x), camera.y - y, width, -height);
}

export function renderImage(ctx, camera, img, x, y, width, height, deg) {
  ctx.translate(-(camera.x - x), camera.y - y);
  ctx.rotate(deg);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
}

export function renderMap(ctx, camera, img, width, height) {
  ctx.drawImage(img, -camera.x - width / 2, camera.y - height / 2);
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
