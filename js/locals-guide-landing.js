import { buildNavigation } from "./component/header.js";
import { buildFooter } from "./component/footer.js";
const buttons = document.querySelectorAll(".lg-button-container button");

buildNavigation();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = `/locals-guide/${button.innerHTML.toLocaleLowerCase()}.html`;
  });
});

buildFooter();
