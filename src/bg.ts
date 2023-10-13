import { getRandomLower, getRandomUpper, getRandomNumber, getRandomSymbol } from "./generators";

/**
 * 
 * @property {Function} createDigitEl - creates <li></li> element with random character for background
 * @returns {HTMLLIElement} - list item element with random character
 */
function createDigitEl(): HTMLLIElement {
 const randomFunctionsArray = [
  getRandomLower,
  getRandomUpper,
  getRandomNumber,
  getRandomSymbol,
 ];

 const el = document.createElement("li");

 // Set styles of digit
 el.textContent =
  randomFunctionsArray[
   Math.floor(Math.random() * randomFunctionsArray.length)
  ]();
 el.style.left = `${Math.floor(Math.random() * 100)}%`;
 el.style.animationDelay = `${Math.floor(Math.random() * 5)}s`;
 el.style.animationDuration = `${Math.floor(Math.random() * 10) + 5}s`;
 el.style.filter = `blur(${Math.floor(Math.random() * 4)}px)`;

 return el;
}

// Init BG
/**
 * 
 * @property {Function} initBG - generates background in bgContainer
 */
const initBG = function (bgContainer: HTMLUListElement): void {
 window.setInterval(() => {
  let digit = createDigitEl();
  bgContainer.appendChild(digit);
  setTimeout(() => {
   digit.classList.add("hide");
   setTimeout(() => {
    digit.remove();
   }, 3000);
  }, 15000);
 }, 200);
}

export default initBG;