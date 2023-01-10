import * as chroma from "chroma-js";

const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
let initialColors;

// Hex Color Generator
function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

let randomHex = generateHex();

function randomColors() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    // Add the color to the background
    div.style.backgroundColor = randomColor;
    hexText.textContent = randomColor;
  });
}

randomColors();

generateBtn.addEventListener("click", () => {
  randomColors();
});
