import fiveLetterWords from "./fiveLetterWords.json";

export function RandomWord() {
  const targetWord =
    fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
  return targetWord.toUpperCase(); // Convert to uppercase
}
