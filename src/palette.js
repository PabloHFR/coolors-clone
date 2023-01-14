import { checkTextContrast } from "./checkTextContrast";
import { updateTextUI, resetInputs } from "./utils";
import { closeLibrary } from "./library";

const colorDivs = document.querySelectorAll(".color");
const currentHexes = document.querySelectorAll(".color h2");
const libraryContainer = document.querySelector(".library-container");
const saveContainer = document.querySelector(".save-container");
const saveInput = document.querySelector(".save-container input");

let initialColors;
let savedPalettes = [];

export function openSavePalette() {
  const popup = saveContainer.children[0];
  saveContainer.classList.add("active");
  popup.classList.add("active");
}

export function closeSavePalette() {
  const popup = saveContainer.children[0];
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
}

export function generatePalette(paletteObj) {
  const palette = document.createElement("div");
  palette.classList.add("custom-palette");

  const title = document.createElement("h4");
  title.textContent = paletteObj.name;

  const preview = document.createElement("div");
  preview.classList.add("small-preview");

  paletteObj.colors.forEach((color) => {
    const smallDiv = document.createElement("div");
    smallDiv.style.backgroundColor = color;
    preview.appendChild(smallDiv);
  });

  const paletteBtn = document.createElement("button");
  paletteBtn.classList.add("pick-palette-btn");
  paletteBtn.classList.add(paletteObj.number);
  paletteBtn.textContent = "Select";

  generateSelectEventListener(paletteBtn);

  palette.appendChild(title);
  palette.appendChild(preview);
  palette.appendChild(paletteBtn);
  libraryContainer.children[0].appendChild(palette);
}

function generateSelectEventListener(paletteBtn) {
  paletteBtn.addEventListener("click", (e) => {
    selectPaletteColors(e);
  });
}

function selectPaletteColors(e) {
  closeLibrary();
  const paletteIndex = e.target.classList[1];
  initialColors = [];
  savedPalettes[paletteIndex].colors.forEach((color, index) => {
    initialColors.push(color);
    colorDivs[index].style.backgroundColor = color;
    colorDivs[index].style.boxShadow = `${color} 0px 0px 0px 1px`;
    const text = colorDivs[index].children[0];
    checkTextContrast(color, text);
    updateTextUI(index);
  });
  resetInputs();
}

export function savePalette() {
  const popup = saveContainer.children[0];
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
  const name = saveInput.value;
  const colors = [];
  currentHexes.forEach((hex) => {
    colors.push(hex.textContent);
  });

  let paletteNumber = savedPalettes.length;

  const paletteObj = { name, colors, number: paletteNumber };
  savedPalettes.push(paletteObj);

  // Save to Local Storage
  saveToLocal(paletteObj);
  saveInput.value = "";

  generatePalette(paletteObj);
}

function saveToLocal(paletteObj) {
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }

  localPalettes.push(paletteObj);
  localStorage.setItem("palettes", JSON.stringify(localPalettes));
}

export function getLocal() {
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
    localPalettes.forEach((paletteObj) => {
      generatePalette(paletteObj);
    });
    savedPalettes.push(...localPalettes);
  }
}
