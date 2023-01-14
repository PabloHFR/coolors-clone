const popupElement = document.querySelector(".copy-container");

export function copyToClipboard(hex) {
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
