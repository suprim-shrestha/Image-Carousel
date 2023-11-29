const imageWrapper = document.getElementById("image-wrapper");
const container = document.getElementById("carousel-container");
const navBtns = document.getElementById("nav-btns");
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
  navBtn[activeImage - 1].setActive();
  //   setPosition();
  //   changePosition();
});
btnRight.addEventListener("click", () => {
  activeImage++;
  if (activeImage > maxImages) activeImage = 1;
  navBtn[activeImage - 1].setActive();
  //   setPosition();
  //   changePosition();
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
  container.style.height = (container.clientWidth * 9) / 16 + "px";
  setPosition();
  changePosition();
});

class NavBtn {
  constructor(index) {
    this.index = index;
    this.element = document.createElement("div");
    this.element.classList.add("nav-btn");
    navBtns.appendChild(this.element);
    this.element.addEventListener("click", () => {
      this.setActive();
    });
  }

  setActive() {
    activeImage = this.index + 1;
    navBtn.forEach((value) => {
      value.element.classList.remove("nav-btn--active");
    });
    this.element.classList.add("nav-btn--active");
    setPosition();
    changePosition();
  }
}

let navBtn = [];

[...imgClass].forEach((value, index) => {
  navBtn.push(new NavBtn(index));
  navBtn[0].element.classList.add("nav-btn--active");
});
