import * as chroma from "chroma-js";
import { checkTextContrast } from "./checkTextContrast";
import { colorizeSliders } from "./sliders";
import { resetInputs } from "./utils";

const colorDivs = document.querySelectorAll(".color");
const adjustBtnElements = document.querySelectorAll(".adjust");
const lockBtnElements = document.querySelectorAll(".lock");

export let initialColors = [];

// Hex Color Generator
function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

export function randomColors() {
  initialColors = [];

  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    // Add color to the array
    if (div.classList.contains("locked")) {
      initialColors.push(hexText.textContent);
      return;
    } else {
      initialColors.push(chroma(randomColor).hex());
    }

    // Add the color to the background
    div.style.backgroundColor = randomColor;
    div.style.boxShadow = `${randomColor} 0px 0px 0px 1px`;
    hexText.textContent = randomColor;

    // Check for contrast
    checkTextContrast(randomColor, hexText);

    // Initialize Color Sliders
    const color = chroma(randomColor);

    const sliders = div.querySelectorAll(".sliders input");
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeSliders(color, hue, brightness, saturation);
  });
  resetInputs();

  adjustBtnElements.forEach((button, index) => {
    checkTextContrast(initialColors[index], button);
    checkTextContrast(initialColors[index], lockBtnElements[index]);
  });
}
