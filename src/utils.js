import * as chroma from "chroma-js";
import { checkTextContrast } from "./checkTextContrast";
import { initialColors } from "./generateColors";

const colorDivs = document.querySelectorAll(".color");

export function resetInputs() {
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

export function updateTextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);
  const icons = activeDiv.querySelectorAll(".controls button");
  const textHex = activeDiv.querySelector("h2");
  textHex.textContent = color.hex();

  checkTextContrast(color, textHex);
  icons.forEach((icon) => {
    checkTextContrast(color, icon);
  });
}
