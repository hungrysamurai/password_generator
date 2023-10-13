// Generation functions

/**
 * @property {Function} getRandomValue - Generate random value between 0 and max via crypto API
 */
export const getRandomValue = function (max: number): number {
 return Math.floor(
  (window.crypto.getRandomValues(new Uint32Array(1))[0] /
   (Math.pow(2, 32) - 1)) *
  max
 );
}


/**
 * @property {Function} getRandomWord - get random word from words array
 */
export const getRandomWord = async function (wordsCache: string[]): Promise<string> {

 if (wordsCache.length === 0) {

  const words = (await import('./words')).default;
  words.forEach(w => wordsCache.push(w))
 }

 return wordsCache[getRandomValue(wordsCache.length)];
}


/**
 * @property {Function} getRandomLower - get random lowercase letter
 */
export const getRandomLower = function (): string {
 return String.fromCharCode(getRandomValue(26) + 97);
}


/**
 * @property {Function} getRandomUpper - get random uppercase letter
 */
export const getRandomUpper = function (): string {
 return String.fromCharCode(getRandomValue(26) + 65);
}


/**
 * @property {Function} getRandomNumber - get random number
 */
export const getRandomNumber = function (): string {
 return String.fromCharCode(getRandomValue(10) + 48);
}


/**
 * @property {Function} getRandomSymbol - get random symbol
 */
export const getRandomSymbol = function (): string {
 const symbols = "!@#$^&*(){}[]=<>/,.";
 return symbols[getRandomValue(symbols.length)];
}