import { GeneratorMode, MemorizePasswordSettings, RandomPasswordSettings, RandomSettings } from "./types";

import { getRandomValue, getRandomLower, getRandomUpper, getRandomSymbol, getRandomNumber, getRandomWord } from "./generators";


/**
 * @property {Function} generateRandom - Generate random password/ generate PIN
 */
export const generateRandom = function (
 currentMode: GeneratorMode,
 passwordLength: number,
 settings: RandomPasswordSettings
): string | undefined {
 let result = "";

 // PIN generation
 if (currentMode === GeneratorMode.Pin) {
  for (let i = 0; i < passwordLength; i++) {
   result += getRandomNumber();
  }
 }
 // Random generation
 else {
  const randomSettings: RandomSettings = {
   uppercase: [settings.uppercaseSetting.checked, getRandomUpper],
   lowercase: [settings.lowercaseSetting.checked, getRandomLower],
   numbers: [settings.numbersSetting.checked, getRandomNumber],
   symbols: [settings.symbolsSetting.checked, getRandomSymbol],
  };

  const activeFunctions: Function[] = [];

  for (const setting of Object.values(randomSettings)) {
   if (setting[0]) activeFunctions.push(setting[1]);
  }

  // If all options disabled
  if (activeFunctions.length === 0) {
   return;
  }

  for (let i = 0; i < passwordLength; i++) {
   const fnIndex = getRandomValue(activeFunctions.length);
   result += activeFunctions[fnIndex]();
  }
 }

 // Display password
 return result;
}


/**
 * @property {Function} generateWords - Generate random words
 */
export const generateWords = async function (
 passwordLength: number,
 settings: MemorizePasswordSettings,
 wordsCache: string[]
): Promise<string> {

 let result = [];
 let spliceStarts = [0, 1];
 let spliceCounts = [4, 5];

 const upperStart: boolean = settings.upperStartSetting.checked;
 const wholeWord: boolean = settings.wholeWordSetting.checked;

 for (let i = 0; i < passwordLength; i++) {
  let randomWord = await getRandomWord(wordsCache);
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

 return result.join("-");
}