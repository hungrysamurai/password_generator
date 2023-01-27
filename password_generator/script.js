// BG animation
const bgContainer = document.querySelector(".digits");

const randomFunctionsArray = [
  getRandomLower,
  getRandomUpper,
  getRandomNumber,
  getRandomSymbol,
];

function createDigit() {
  const el = document.createElement("li");

  // Set styles of digit
  el.textContent =
    randomFunctionsArray[
      Math.floor(Math.random() * randomFunctionsArray.length)
    ]();
  el.style.left = `${Math.floor(Math.random() * 100)}%`;
  el.style.animationDelay = `${Math.floor(Math.random() * 5)}s`;
  el.style.animationDuration = `${Math.floor(Math.random() * 10) + 5}s`;
  el.style.filter = `blur(${Math.floor(Math.random() * 3)}px)`;

  return el;
}

// Init BG
window.setInterval(() => {
  let digit = createDigit();
  bgContainer.appendChild(digit);
  setTimeout(() => {
    digit.classList.add("hide");
    setTimeout(() => {
      digit.remove();
    }, 3000);
  }, 15000);
}, 200);



function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
