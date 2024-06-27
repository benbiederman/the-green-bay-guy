import { buildNavigation } from "./component/header.js";
import { buildFooter } from "./component/footer.js";

const buttons = document.querySelectorAll(".lg-button-container button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = `/locals-guide/${button.innerHTML.toLocaleLowerCase()}.html`;
  });
});

buildNavigation();
buildFooter();
