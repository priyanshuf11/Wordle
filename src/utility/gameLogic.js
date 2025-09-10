export function validateGuess(targetword, guess) {
    const result = Array(targetword.length).fill(' ');
    let targetCharCount = {};
  
    for (const char of targetword) {
      targetCharCount[char] = (targetCharCount[char] || 0) + 1;
    }
  
    // Mark correct letters
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetword[i]) {
        result[i] = 'correct';
        targetCharCount[guess[i]]--;
      }
    }
  
    // Mark misplaced and incorrect letters
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === ' ') {
        if (targetCharCount[guess[i]] > 0) {
          result[i] = 'misplaced';
          targetCharCount[guess[i]]--;
        } else {
          result[i] = 'incorrect';
        }
      }
    }
  
    return result;
  }
  
  export function checkVictory(result, rowindex) {
    // Check if all letters are marked as "correct"
    if (result.every((status) => status === 'correct')) {
      return 'won';
    }
  
    // Check if the user has exhausted their chances
    if (rowindex >=6) {
      return 'lost';
    }
  
    // Otherwise, the game continues
    return 'continue';
  }