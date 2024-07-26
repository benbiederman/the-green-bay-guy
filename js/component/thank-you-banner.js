export function thankYouBanner() {
  const banner = document.querySelector(".thank-you-banner") || null;

  const container = document.createElement("div");
  container.classList.add("thank-you-container");
  banner.appendChild(container);

  const header = document.createElement("h2");
  header.textContent = "Want to say thanks for the helpful content?";
  container.appendChild(header);

  const copy = document.createElement("p");
  copy.textContent = `If you've found the content helpful, consider buying me a coffee to show your appreciation. Your support enables me to create valuable content. I appreciate you!`;
  container.appendChild(copy);

  const button = document.createElement("button");
  button.classList.add("primary-button");
  button.textContent = "Buy me a coffee";
  button.ariaLabel = "Buy me a coffee (opens in new window)";
  container.appendChild(button);

  button.addEventListener("click", () => {
    window.open(
      "https://www.paypal.com/donate/?hosted_button_id=24KTEDXSK6HWE",
      "_blank"
    );
  });
}
