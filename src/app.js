import { openLibrary, closeLibrary } from "./library";
import { randomColors } from "./generateColors";
import { updateTextUI } from "./utils";
import { copyToClipboard } from "./copyToClipboard";
import {
  hslControls,
  openAdjustmentPanel,
  closeAdjustmentPanel,
} from "./sliders";
import { lockLayer } from "./lockLayer";
import {
  openSavePalette,
  closeSavePalette,
  savePalette,
  getLocal,
} from "./palette";

const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
const popupElement = document.querySelector(".copy-container");
const adjustBtnElements = document.querySelectorAll(".adjust");
const lockBtnElements = document.querySelectorAll(".lock");
const closeAdjustmentBtnElements =
  document.querySelectorAll(".close-adjustment");
const saveBtnElement = document.querySelector(".save");
const submitSaveBtnElement = document.querySelector(".submit-save");
const closeSaveBtnElement = document.querySelector(".close-save");
const libraryBtnElement = document.querySelector(".library");
const closeLibraryBtnElement = document.querySelector(".close-library");

// Init
randomColors();
getLocal();

// Event Listeners
generateBtn.addEventListener("click", () => {
  randomColors();
});

sliders.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

colorDivs.forEach((div, index) => {
  div.addEventListener("change", () => {
    updateTextUI(index);
  });
});

currentHexes.forEach((hex) => {
  hex.addEventListener("click", () => {
    copyToClipboard(hex);
  });
});

popupElement.addEventListener("transitionend", () => {
  popupElement.classList.remove("active");
  popupElement.children[0].classList.remove("active");
});

adjustBtnElements.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    openAdjustmentPanel(index);
  });
});

closeAdjustmentBtnElements.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    closeAdjustmentPanel(index);
  });
});

lockBtnElements.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    lockLayer(e, index);
  });
});

saveBtnElement.addEventListener("click", openSavePalette);
closeSaveBtnElement.addEventListener("click", closeSavePalette);
submitSaveBtnElement.addEventListener("click", savePalette);
libraryBtnElement.addEventListener("click", openLibrary);
closeLibraryBtnElement.addEventListener("click", closeLibrary);
