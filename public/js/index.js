// Show selected file

const input = document.querySelector("#file-upload");
const srcDomElement = document.querySelector("#src-name");

input.addEventListener("change", (event) => {
  const input = event.srcElement;

  const fileName = input.files[0].name;

  srcDomElement.textContent = `File name: ${fileName}`;
});
