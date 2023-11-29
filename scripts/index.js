const imageWrapper = document.getElementById("image-wrapper");
const container = document.getElementById("carousel-container");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
const imgClass = document.getElementsByClassName("image");

let speed = 40;
let activeImage = 1;
let position = 0;
let maxImages = imgClass.length;

btnLeft.addEventListener("click", () => {
  activeImage--;
  if (activeImage < 1) activeImage = maxImages;
  console.log(activeImage);
  setPosition();
  changePosition();
});
btnRight.addEventListener("click", () => {
  activeImage++;
  if (activeImage > maxImages) activeImage = 1;
  console.log(activeImage);
  setPosition();
  changePosition();
});

const setPosition = () => {
  position = -(activeImage - 1) * container.clientWidth;
};

const changePosition = () => {
  let interval = setInterval(animate, 1000 / 60);
  function animate() {
    let currentPosition = parseInt(window.getComputedStyle(imageWrapper).left);
    speed = currentPosition > position ? -Math.abs(speed) : Math.abs(speed);
    if (Math.abs(currentPosition - position) < Math.abs(speed)) {
      currentPosition = position;
    } else {
      currentPosition += speed;
    }
    imageWrapper.style.left = currentPosition + "px";
    if (currentPosition === position) {
      clearInterval(interval);
    }
  }
};

window.addEventListener("resize", () => {
  setPosition();
  changePosition();
});
