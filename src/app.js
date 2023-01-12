import * as chroma from "chroma-js";
import { random } from "chroma-js";

const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
const popupElement = document.querySelector(".copy-container");
const adjustBtnElements = document.querySelectorAll(".adjust");
const lockBtnElements = document.querySelectorAll(".lock");
const closeAdjustmentBtnElements =
  document.querySelectorAll(".close-adjustment");
const sliderContainers = document.querySelectorAll(".sliders");

let initialColors;

// Hex Color Generator
function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

function randomColors() {
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
}

function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  luminance > 0.5 ? (text.style.color = "black") : (text.style.color = "white");
}

function colorizeSliders(color, hue, brightness, saturation) {
  // Scale saturation
  const noSat = color.set("hsl.s", 0);
  const fullSat = color.set("hsl.s", 1);
  const scaleSaturation = chroma.scale([noSat, color, fullSat]);

  // Scale brightness
  const midBright = color.set("hsl.l", 0.5);
  const scaleBrightness = chroma.scale(["black", midBright, "white"]);

  // Update input colors
  saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSaturation(
    0
  )}, ${scaleSaturation(1)})`;

  brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBrightness(
    0
  )}, ${scaleBrightness(0.5)}, ${scaleBrightness(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204,204,75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`;
}

function hslControls(e) {
  const index =
    e.target.getAttribute("data-brightness") ||
    e.target.getAttribute("data-saturation") ||
    e.target.getAttribute("data-hue");

  let sliders = e.target.parentElement.querySelectorAll("input[type='range']");
  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];

  const bgColor = initialColors[index];

  let color = chroma(bgColor)
    .set("hsl.h", hue.value)
    .set("hsl.l", brightness.value)
    .set("hsl.s", saturation.value);

  colorDivs[index].style.backgroundColor = color;
  colorDivs[index].style.boxShadow = `${color} 0px 0px 0px 1px`;

  // Colorize inputs/sliders
  colorizeSliders(color, hue, brightness, saturation);
}

function updateTextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);
  const textHex = activeDiv.querySelector("h2");
  const icons = activeDiv.querySelectorAll(".controls button");
  textHex.textContent = color.hex();

  checkTextContrast(color, textHex);

  for (icon of icons) {
    checkTextContrast(color, icon);
  }
}

function resetInputs() {
  const sliders = document.querySelectorAll(".sliders input");
  sliders.forEach((slider) => {
    if (slider.name === "hue") {
      const hueColor = initialColors[slider.getAttribute("data-hue")];
      const hueValue = chroma(hueColor).hsl()[0];
      slider.value = Math.floor(hueValue);
    }
    if (slider.name === "saturation") {
      const saturationColor =
        initialColors[slider.getAttribute("data-saturation")];
      const saturationValue = chroma(saturationColor).hsl()[1];
      slider.value = saturationValue;
    }
    if (slider.name === "brightness") {
      const brightnessColor =
        initialColors[slider.getAttribute("data-brightness")];
      const brightnessValue = chroma(brightnessColor).hsl()[2];
      slider.value = brightnessValue;
    }
  });
}

function copyToClipboard(hex) {
  // Create a temporary textarea element to hold the text
  const textArea = document.createElement("textarea");
  textArea.value = hex.textContent;
  document.body.appendChild(textArea);

  // Select the text in the textarea
  textArea.select();

  // Copy the text to the clipboard
  document.execCommand("copy");

  // Remove the textarea element
  document.body.removeChild(textArea);

  // Popup animation
  popupElement.classList.add("active");
  popupElement.children[0].classList.add("active");
}

function openAdjustmentPanel(index) {
  sliderContainers[index].classList.toggle("active");
}

function closeAdjustmentPanel(index) {
  sliderContainers[index].classList.remove("active");
}

function lockLayer(e, index) {
  const lockSVG = e.target.children[0];
  const activeBg = colorDivs[index];
  activeBg.classList.toggle("locked");

  if (lockSVG.classList.contains("fa-lock-open")) {
    e.target.innerHTML = '<i class="fas fa-lock"></i>';
  } else {
    e.target.innerHTML = '<i class="fas fa-lock-open"></i>';
  }
}

randomColors();

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
