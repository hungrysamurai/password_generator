import { words } from "./words";

// DOM elements
const bgContainer = document.querySelector(".digits");
const resultContainer = document.querySelector(".result-container");
const resultEl = document.querySelector("#result");
const refreshBtn = document.querySelector("#refresh");
const copyBtn = document.querySelector("#clipboard");
const presetsSelect = document.querySelector("#presets-select");
const lengthLabel = document.querySelector("#length-label");
const lengthType = document.querySelector("#length-type");
const lengthSlider = document.querySelector("#length");
const checkboxesContainer = document.querySelector(".checkboxes-container");
const generateBtn = document.querySelector("#generate");

// Checkboxes
const uppercaseSetting = document.querySelector("#uppercase");
const lowercaseSetting = document.querySelector("#lowercase");
const numbersSetting = document.querySelector("#numbers");
const symbolsSetting = document.querySelector("#symbols");
const upperStartSetting = document.querySelector("#upperStart");
const wholeWordSetting = document.querySelector("#wholeWord");

// Notifications elements
const noteContainer = document.querySelector(".note-container");
const noteText = noteContainer.querySelector(".note-text");

// Init default settings

/**
 * Mode of generato, by default - random
 * @type {string}
 */
let mode = "random";

updateSettings(mode);

// DOM functions

/**
 * @property {Function} updateSettings- update DOM according to mode
 * @param {string} newMode 
 * @returns {void}
 */
function updateSettings(newMode) {
  mode = newMode;
  checkboxesContainer.className = `checkboxes-container ${mode}`;

  // Turn on all options by default
  checkboxesContainer.querySelectorAll("input").forEach((checkbox) => {
    checkbox.checked = true;
  });

  // Set length of length slider accorfing to mode
  lengthSlider.min = mode === "random" ? 8 : mode === "pin" ? 4 : 5;
  lengthSlider.max = mode === "random" ? 40 : mode === "pin" ? 12 : 16;

  if (mode === "memorize") resultContainer.classList.add("memorize-field");
  else resultContainer.classList.remove("memorize-field");
  // Set default length
  let length = mode === "random" ? 12 : mode === "pin" ? 8 : 5;
  updateLengthDOM(length);
}

/**
 * @property {Function} updateLengthDOM - update DOM elements related to length of password
 * @param {number} length - length DOM elements related to password length 
 * @returns {void}
 */
function updateLengthDOM(length) {
  lengthLabel.textContent = length;
  if (mode === "memorize") {
    lengthType.textContent = "блоков";
  } else {
    lengthType.textContent = "символов";
  }
  lengthSlider.value = length;
}

/**
 * @property {Function} showNote - show notification
 * @param {string} text 
 * @param {string} noteMode 
 * @returns {void}
 */
function showNote(text, noteMode) {
  if (noteMode === "info") {
    noteContainer.classList.remove("error");
    noteContainer.classList.add("info");
  } else {
    noteContainer.classList.remove("info");
    noteContainer.classList.add("error");
  }

  noteContainer.classList.remove("hide");
  noteText.textContent = text;

  setTimeout(() => {
    noteContainer.classList.add("hide");
  }, 3000);
}


/**
 * @property {Function} generateRandom - Generate random password/ generate PIN
 * @returns {void}
 */
function generateRandom() {
  const passwordLength = +lengthSlider.value;
  let result = "";

  // PIN generation
  if (mode === "pin") {
    for (let i = 0; i < passwordLength; i++) {
      result += getRandomNumber();
    }
  }
  // Random generation
  else {
    const randomSettings = {
      uppercase: [uppercaseSetting.checked, getRandomUpper],
      lowercase: [lowercaseSetting.checked, getRandomLower],
      numbers: [numbersSetting.checked, getRandomNumber],
      symbols: [symbolsSetting.checked, getRandomSymbol],
    };

    const activeFunctions = [];

    for (const data of Object.values(randomSettings)) {
      if (data[0]) activeFunctions.push(data[1]);
    }

    // If all options disabled
    if (activeFunctions.length === 0) {
      showNote("Нужно выбрать хотя бы одну опцию!", "error");
      return;
    }

    for (let i = 0; i < passwordLength; i++) {
      const index = getRandomValue(activeFunctions.length);
      result += activeFunctions[index]();
    }
  }

  // Display password
  resultEl.textContent = result;
}

/**
 * @property {Function} generateWords - Generate random words
 * @returns {void}
 */
function generateWords() {
  const passwordLength = +lengthSlider.value;

  let result = [];
  let spliceStarts = [0, 1];
  let spliceCounts = [4, 5];

  const upperStart = upperStartSetting.checked;
  const wholeWord = wholeWordSetting.checked;

  for (let i = 0; i < passwordLength; i++) {
    let randomWord = getRandomWord();
    if (wholeWord) {
      result.push(randomWord);
    } else {
      let substr = randomWord.substring(
        spliceStarts[getRandomValue(2)],
        spliceCounts[getRandomValue(2)]
      );
      result.push(substr);
    }
  }

  // Capitalize first letter
  if (upperStart) {
    result.forEach((word, i) => {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      result[i] = word;
    });
  }
  resultEl.textContent = result.join("-");
}


/**
 * @property {Function} getRandomValue - Generate random value between 0 and max via crypto API
 * @returns {number}
 */
function getRandomValue(max) {
  return Math.floor(
    (window.crypto.getRandomValues(new Uint32Array(1))[0] /
      (Math.pow(2, 32) - 1)) *
    max
  );
}

// Generation functions

/**
 * @property {Function} getRandomWord - get random word from words array
 * @returns {string}
 */
function getRandomWord() {
  const word = words[getRandomValue(words.length)];
  return word;
}

/**
 * @property {Function} getRandomLower - get random lowercase letter
 * @returns {string}
 */
function getRandomLower() {
  return String.fromCharCode(getRandomValue(26) + 97);
}

/**
 * @property {Function} getRandomUpper - get random uppercase letter
 * @returns {string}
 */
function getRandomUpper() {
  return String.fromCharCode(getRandomValue(26) + 65);
}

/**
 * @property {Function} getRandomNumber - get random number
 * @returns {string}
 */
function getRandomNumber() {
  return String.fromCharCode(getRandomValue(10) + 48);
}

/**
 * @property {Function} getRandomSymbol - get random symbol
 * @returns {string}
 */
function getRandomSymbol() {
  const symbols = "!@#$^&*(){}[]=<>/,.";
  return symbols[getRandomValue(symbols.length)];
}

// Background

/**
 * 
 * @property {Function} createDigitEl - creates <li></li> element with random character for background
 * @returns {HTMLElement} - list item element with random character
 */
function createDigitEl() {
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


// Events listeners
presetsSelect.addEventListener("change", (e) => {
  updateSettings(e.target.value);
  resultEl.textContent = "";
});

lengthSlider.addEventListener("input", (e) => {
  updateLengthDOM(e.target.value);
});

generateBtn.addEventListener("click", () => {
  if (mode === "random" || mode === "pin") {
    generateRandom();
  } else {
    generateWords();
  }
});

refreshBtn.addEventListener("click", () => {
  if (mode === "random" || mode === "pin") {
    generateRandom();
  } else {
    generateWords();
  }
});

copyBtn.addEventListener("click", () => {
  if (resultEl.textContent) {
    navigator.clipboard.writeText(resultEl.textContent);
    showNote("Пароль скопирован в буфер обмена", "info");
  }
});