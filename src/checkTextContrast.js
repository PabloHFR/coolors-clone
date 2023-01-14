import * as chroma from "chroma-js";

// Checks text element color contrast and changes text color for better reading
export function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  luminance > 0.5 ? (text.style.color = "black") : (text.style.color = "white");
}
