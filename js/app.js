const canvas = document.getElementById("tv-screen");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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

const createImage = async (src, text) => {
  const htmlImage = new Image();
  htmlImage.src = src;
  return new Promise((resolve) => {
    htmlImage.onload = () => {
      const scale = randomNumber(0.5, 2);
      const image = {
        x: randomNumber(0, canvas.width - htmlImage.width * scale),
        y: randomNumber(0, canvas.height - htmlImage.height * scale),
        dx: randomNumber(-1, 1) / scale,
        dy: randomNumber(-1, 1) / scale,
        scale,
        text,
        image: htmlImage,
        width: htmlImage.width,
        height: htmlImage.height,
      };
      resolve(image);
    };
  });
};

const images = [];

const addImage = async (src, text) => {
  const image = await createImage(src, text);
  images.push(image);
  images.sort((a, b) => b.scale - a.scale);
};

const checkHitBox = (image, canvas) => {
  if (image.x + image.width * image.scale >= canvas.width || image.x <= 0) {
    image.dx *= -1;
  }
  if (image.y + image.height * image.scale >= canvas.height || image.y <= 0) {
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
      image.width * image.scale,
      image.height * image.scale
    );
    image.x += image.dx;
    image.y += image.dy;
    checkHitBox(image, canvas);
  });
  requestAnimationFrame(animate);
};

await Promise.all([
  addImage("cylociL.png", ""),
  addImage("cylociL.png", ""),
  addImage("cylociL.png", ""),
  addImage("cylociL.png", ""),
  addImage("cylociL.png", ""),
  addImage("cylociL.png", ""),
  addImage("cylociL.png", ""),
  addImage("cylociL.png", ""),
]);

animate();
