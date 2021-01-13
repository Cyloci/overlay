const canvas = document.getElementById("tv-screen");
const ctx = canvas.getContext("2d");

const drawText = (text, x, y, scale) => {
  ctx.font = `bold ${48 * scale}px Calibri`;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 6 * scale;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
};

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const createImage = (src, text) => {
  const image = {
    x: randomNumber(200, 2000),
    y: randomNumber(200, 1000),
    dx: randomNumber(-2, 2),
    dy: randomNumber(-2, 2),
    scale: randomNumber(2, 4),
    text,
  };
  image.image = new Image();
  image.image.src = src;
  return image;
};

const images = [
  createImage("psiloc2L.png", ""),
  createImage("psiloc2L.png", ""),
  createImage("psiloc2L.png", ""),
  createImage("psiloc2L.png", ""),
  createImage("psiloc2L.png", ""),
];

const addImage = (src, text) => {
  images.push(createImage(src, text));
};

const checkHitBox = (image, canvas) => {
  if (
    image.x + image.image.width * image.scale >= canvas.width ||
    image.x <= 0
  ) {
    image.dx *= -1;
  }
  if (
    image.y + image.image.height * image.scale >= canvas.height ||
    image.y <= 0
  ) {
    image.dy *= -1;
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  images.forEach((image) => {
    // drawText(image.text, image.x, image.y, image.scale);

    ctx.drawImage(
      image.image,
      image.x,
      image.y,
      image.image.width * image.scale,
      image.image.height * image.scale
    );
    image.x += image.dx;
    image.y += image.dy;
    checkHitBox(image, canvas);
  });
  requestAnimationFrame(animate);
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
animate();
