const img = document.querySelector("img");
const filters = document.querySelector(".filters");
const outputs = filters.querySelectorAll("output");
const inputs = filters.querySelectorAll("input");
const resetButton = document.querySelector(".btn-reset");
const nextButton = document.querySelector(".btn-next");
const imgSelector = document.getElementById("btnInput");
const saveButton = document.querySelector(".btn-save");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const fullScreenButton = document.querySelector(".openfullscreen");
const body = document.querySelector("body");

function draw() {
  canvas.width = img.width;
  canvas.height = img.height;
  filtering();
  ctx.drawImage(img, 0, 0);
}

function filtering() {
  let blurV = inputs.item(0).getAttribute("value") + "px";
  let invertV = inputs.item(1).getAttribute("value") + "%";
  let sepiaV = inputs.item(2).getAttribute("value") + "%";
  let saturateV = inputs.item(3).getAttribute("value") + "%";
  let hueV = inputs.item(4).getAttribute("value") + "deg";
  ctx.filter =
    "blur(" +
    blurV +
    ") invert(" +
    invertV +
    ") sepia(" +
    sepiaV +
    ") saturate(" +
    saturateV +
    ") hue-rotate(" +
    hueV +
    ")        ";
}

function blurf(value) {
  let res = outputs.item(0);
  res.innerHTML = value;
  inputs.item(0).setAttribute("value", value);
  draw();
}
function invertf(value) {
  let res = outputs.item(1);
  res.innerHTML = value;
  inputs.item(1).setAttribute("value", value);
  draw();
}
function sepiaf(value) {
  let res = outputs.item(2);
  res.innerHTML = value;
  inputs.item(2).setAttribute("value", value);
  draw();
}
function saturatef(value) {
  let res = outputs.item(3);
  res.innerHTML = value;
  inputs.item(3).setAttribute("value", value);
  draw();
}
function huef(value) {
  let res = outputs.item(4);
  res.innerHTML = value;
  inputs.item(4).setAttribute("value", value);
  draw();
}

function time() {
  let timeNow = new Date();
  let hours = timeNow.getHours();
  let timeofday = "";
  if (hours >= 6 && hours < 12) {
    timeofday = "morning";
  }
  if (hours >= 12 && hours < 18) {
    timeofday = "day";
  }
  if (hours >= 18 && hours < 24) {
    timeofday = "evening";
  }
  if (hours >= 0 && hours < 6) {
    timeofday = "night";
  }
  return timeofday;
}

let counter = 1;
function nextImg(event) {
  let number = "01";
  let timeofday = time();
  if (counter < 21) {
    counter < 10 ? (number = "0" + counter) : (number = counter);
  } else {
    counter = 1;
    number = "0" + counter;
  }
  img.crossOrigin = "anonymous";
  img.src =
    "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" +
    timeofday +
    "/" +
    number +
    ".jpg";
  img.onload = function uploaded() {
    draw();
  };
  counter++;
}

function reset(event) {
  inputs.forEach((element) => {
    element.value = 0;
    element.setAttribute("value", 0);
  });
  inputs.item(3).value = 100;
  inputs.item(3).setAttribute("value", 100);
  outputs.forEach((element) => {
    element.value = 0;
  });
  outputs.item(3).value = 100;
  draw();
}

function uploading(event) {
  const userImage = imgSelector.files[0];
  img.src = URL.createObjectURL(userImage);
  img.onload = function uploaded() {
    draw();
  };
  URL.revokeObjectURL(userImage);
}

function save() {
  let link = document.createElement("a");
  link.download = "image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function fullScreen(event) {
  if (!document.fullscreenElement) body.requestFullscreen();
  else document.exitFullscreen();
}

nextButton.addEventListener("mousedown", nextImg);
resetButton.addEventListener("mousedown", reset);
imgSelector.addEventListener("mousedown", (event) => {
  event.target.value = null;
});
imgSelector.addEventListener("change", uploading);
saveButton.addEventListener("mousedown", save);
window.addEventListener("load", draw);
fullScreenButton.addEventListener("mousedown", fullScreen);
