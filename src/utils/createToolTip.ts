import {
  CanvasTexture,
  Color,
  LinearFilter,
  Sprite,
  SpriteMaterial,
} from "three";

export const createTextSprite = (
  text: string,
  color: Color,
  fontSize: string
) => {
  const canvas = document.createElement("canvas");
  const ratio = window.devicePixelRatio || 2;
  const width = 512,
    height = 256;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.scale(ratio, ratio);
    ctx.font = `bold ${fontSize} Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color.getStyle();
    wrapText(ctx, text, width / 2, height / 2, width - 20, 48);
  }

  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;

  const sprite = new Sprite(
    new SpriteMaterial({ map: texture, transparent: true })
  );
  sprite.scale.set(10, 5, 1);
  return sprite;
};

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && line !== "") {
      lines.push(line);
      line = `${word} `;
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  const offsetY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l.trim(), x, offsetY + i * lineHeight));
};
