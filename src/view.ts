import { GeneratorMode, LengthRelatedElements, Note } from "./types";

/**
 * @property {Function} updateSettings- update DOM according to mode
 */
export const updateSettings = function (
 newMode: GeneratorMode,
 checkboxesContainer: HTMLDivElement,
 lengthRelatedElements: LengthRelatedElements,
 resultContainer: HTMLDivElement
): GeneratorMode {
 checkboxesContainer.className = `checkboxes-container ${newMode.toLowerCase()}`;

 // Turn on all options by default
 checkboxesContainer.querySelectorAll("input").forEach((checkbox) => {
  checkbox.checked = true;
 });

 // Set length of length slider accorfing to mode
 lengthRelatedElements.lengthSlider.min = newMode === GeneratorMode.Random ? '8' : newMode === GeneratorMode.Pin ? '4' : '5';
 lengthRelatedElements.lengthSlider.max = newMode === GeneratorMode.Random ? '40' : newMode === GeneratorMode.Pin ? '12' : '16';

 if (newMode === GeneratorMode.Memorize) resultContainer.classList.add("memorize-field");
 else resultContainer.classList.remove("memorize-field");
 // Set default length
 let length = newMode === GeneratorMode.Random ? '12' : newMode === GeneratorMode.Pin ? '8' : '5';

 updateLengthDOM(length, lengthRelatedElements, newMode);

 return newMode;
}

/**
 * @property {Function} updateLengthDOM - update DOM elements related to length of password
 * @param {string} length - length DOM elements related to password length 
 */
export const updateLengthDOM = function (
 length: string,
 lengthRelatedElements: LengthRelatedElements,
 mode: GeneratorMode
): void {
 lengthRelatedElements.lengthLabel.textContent = length
 if (mode === GeneratorMode.Memorize) {
  lengthRelatedElements.lengthType.textContent = "блоков";
 } else {
  lengthRelatedElements.lengthType.textContent = "символов";
 }
 lengthRelatedElements.lengthSlider.value = length
}

/**
 * @property {Function} showNote - show notification
 * @param {string} text 
 * @param {string} noteMode 
 */
export const showNote = function (
 noteContainer: HTMLDivElement,
 noteTextEl: HTMLParagraphElement,
 text: string,
 noteMode: Note
): void {
 if (noteMode === Note.Info) {
  noteContainer.classList.remove("error");
  noteContainer.classList.add("info");
 } else {
  noteContainer.classList.remove("info");
  noteContainer.classList.add("error");
 }

 noteContainer.classList.remove("hide");
 noteTextEl.textContent = text;

 setTimeout(() => {
  noteContainer.classList.add("hide");
 }, 3000);
}