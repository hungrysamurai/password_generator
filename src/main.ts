import { GeneratorMode, RandomPasswordSettings, MemorizePasswordSettings, LengthRelatedElements, Note } from "./types";

import { updateSettings, updateLengthDOM, showNote } from "./view";
import { generateRandom, generateWords } from "./executors";

import initBG from "./bg";

// DOM elements
const bgContainer = document.querySelector(".digits") as HTMLUListElement;
const resultContainer = document.querySelector(".result-container") as HTMLDivElement;
const resultEl = document.querySelector("#result") as HTMLSpanElement;
const refreshBtn = document.querySelector("#refresh") as HTMLButtonElement;
const copyBtn = document.querySelector("#clipboard") as HTMLButtonElement;
const presetsSelect = document.querySelector("#presets-select") as HTMLSelectElement;
const checkboxesContainer = document.querySelector(".checkboxes-container") as HTMLDivElement;
const generateBtn = document.querySelector("#generate") as HTMLButtonElement;

const lengthLabel = document.querySelector("#length-label") as HTMLSpanElement;
const lengthType = document.querySelector("#length-type") as HTMLSpanElement;
const lengthSlider = document.querySelector("#length") as HTMLInputElement;

const lengthRelatedElements: LengthRelatedElements = {
  lengthLabel,
  lengthType,
  lengthSlider
}

// Checkboxes
const uppercaseSetting = document.querySelector("#uppercase") as HTMLInputElement;
const lowercaseSetting = document.querySelector("#lowercase") as HTMLInputElement;
const numbersSetting = document.querySelector("#numbers") as HTMLInputElement;
const symbolsSetting = document.querySelector("#symbols") as HTMLInputElement;

const randomPasswordSettings: RandomPasswordSettings = {
  uppercaseSetting,
  lowercaseSetting,
  numbersSetting,
  symbolsSetting
}

const upperStartSetting = document.querySelector("#upperStart") as HTMLInputElement;
const wholeWordSetting = document.querySelector("#wholeWord") as HTMLInputElement;

const memorizePasswordSettings: MemorizePasswordSettings = {
  upperStartSetting,
  wholeWordSetting
}

// Notifications elements
const noteContainer = document.querySelector(".note-container") as HTMLDivElement;
const noteTextEl = noteContainer.querySelector(".note-text") as HTMLParagraphElement;

// Init default settings

/**
 * Mode of generator, by default - random
 */
let mode: GeneratorMode = GeneratorMode.Random;
const wordsCache: string[] = [];


// Events listeners
presetsSelect.addEventListener("change", (e) => {
  if (e.target instanceof HTMLSelectElement) {

    mode = updateSettings(
      e.target.value as GeneratorMode,
      checkboxesContainer,
      lengthRelatedElements,
      resultContainer
    );

    resultEl.textContent = "";
  }
});

lengthSlider.addEventListener("input", (e) => {
  if (e.target instanceof HTMLInputElement) {
    updateLengthDOM(e.target.value, lengthRelatedElements, mode);
  }
});

generateBtn.addEventListener("click", async () => {
  if (mode === GeneratorMode.Random || mode === GeneratorMode.Pin) {
    const pass = generateRandom(
      mode,
      Number(lengthSlider.value),
      randomPasswordSettings
    );
    if (pass) {
      resultEl.textContent = pass;
    } else {
      showNote(noteContainer, noteTextEl, "Нужно выбрать хотя бы одну опцию!", Note.Error);
    }
  } else {
    resultEl.textContent = await generateWords(Number(lengthSlider.value), memorizePasswordSettings, wordsCache);
  }
});

refreshBtn.addEventListener("click", async () => {
  if (mode === GeneratorMode.Random || mode === GeneratorMode.Pin) {
    const pass = generateRandom(
      mode,
      Number(lengthSlider.value),
      randomPasswordSettings
    );
    if (pass) {
      resultEl.textContent = pass;
    } else {
      showNote(noteContainer, noteTextEl, "Нужно выбрать хотя бы одну опцию!", Note.Error);
    }
  } else {
    resultEl.textContent = await generateWords(Number(lengthSlider.value), memorizePasswordSettings, wordsCache);
  }
});

copyBtn.addEventListener("click", () => {
  if (resultEl.textContent) {
    navigator.clipboard.writeText(resultEl.textContent);
    showNote(noteContainer, noteTextEl, "Пароль скопирован в буфер обмена", Note.Info);
  }
});


// Init
window.addEventListener('DOMContentLoaded', () => {
  updateSettings(
    mode,
    checkboxesContainer,
    lengthRelatedElements,
    resultContainer
  );
  initBG(bgContainer);
})
