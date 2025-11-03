import wordList from "./fiveLetterWordsCategorized_4Levels.json";

export function RandomWord(difficulty ) {
  const words = wordList[difficulty] ; // fallback
  if (!Array.isArray(words) || words.length === 0) {
    console.error(`No words found for difficulty: ${difficulty}`);
    return "ERROR";
  }
  const targetWord = words[Math.floor(Math.random() * words.length)];
  return targetWord.toUpperCase();
}
