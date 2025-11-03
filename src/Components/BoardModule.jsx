import React, { useEffect, useState, useRef } from 'react';
import '../style/boardStyle.css';
import KeyboardModule from './KeyboardModule.jsx';

import { validateGuess, checkVictory } from '../utility/gameLogic.js';// import logic
import {RandomWord} from '../utility/words.js' //for random word generation
import fiveLetterWords from '../utility/fiveLetterWords.json'

// set the initial board with empty tiles
const BoardModule = ({difficulty}) => {
  const [board, setBoard] = useState(
    Array(6)
      .fill()
      .map(() => Array(5).fill(' '))
  );

  const boardRef = useRef(null);

  const [currentRow, setCurrentRow] = useState(0);// set current row
  const [currentCol, setCurrentCol] = useState(0);// set current column
  const [dialogMessage, setDialogMessage] = useState(null);


  const [keyboardColors, setKeyboardColors] = useState({});

// sets the background color of tiles
const [validationResult, setValidationResult] = useState(
  Array(6)
    .fill()
    .map(() => Array(5).fill(' '))
);

// Defensive check
const targetWord = useRef(RandomWord(difficulty));

useEffect(() => {
  targetWord.current = RandomWord(difficulty);
  console.log("Difficulty changed:", difficulty, "New target word:", targetWord.current);
}, [difficulty]);


// to change bg of tile
const getTileColor = (rowIndex, colIndex) => {
  const result = validationResult[rowIndex][colIndex];
  if (result === 'correct') {
    return 'bg-green-500';
  } else if (result === 'misplaced') {
    return 'bg-yellow-500';
  } else if (result === 'incorrect') {
    return 'bg-gray-500';
  } else {
    return 'bg-blackbg';
  }
};

// to input from physical keyboard
  const handleKeyDown = (event) => {
    const key = event.key;
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      let newCol = currentCol; // Track the updated column pointer locally
  
      if (key === 'Backspace' && currentCol > 0) {
        newBoard[currentRow][currentCol - 1] = ' ';
        newCol = currentCol - 1;
      } else if (/^[A-Za-z]$/.test(key) && currentCol < 5) {
        newBoard[currentRow][currentCol] = key.toUpperCase();
        newCol = currentCol + 1;
      }

      if(key === 'Enter' && currentCol===5 ) {
        handleSubmit();
      }
  
      // Update the column pointer synchronously
      setCurrentCol(newCol);
  
      return newBoard;
    });
  };
  
  const handleKeyPress = (key) =>{
    console.log(key);
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      let newCol = currentCol; // Track the updated column pointer locally
  
      if (key === 'Backspace' && currentCol > 0) {
        newBoard[currentRow][currentCol - 1] = ' ';
        newCol = currentCol - 1;
      } else if (/^[A-Za-z]$/.test(key) && currentCol < 5) {
        newBoard[currentRow][currentCol] = key.toUpperCase();
        newCol = currentCol + 1;
      }

      if(key === 'Enter' && currentCol===5 ) {
        handleSubmit();
      }
  
      // Update the column pointer synchronously
      setCurrentCol(newCol);
  
      return newBoard;
    });
  }


// handle submission
const handleSubmit = () => {
  setBoard((prevBoard) => {
    return prevBoard.map((row, rowIndex) => [...row]); // safe copy
  });

  setCurrentRow((prevRow) => {
    if (currentCol < 5) {
      alert("Complete the row before submitting.");
      return prevRow;
    }

    const guess = board[prevRow].join("");

    if (!fiveLetterWords.includes(guess.toLocaleLowerCase())) {
      
      return prevRow;
    }

    console.log("Guess:", guess);
    console.log("Target Word:", targetWord.current);

    const result = validateGuess(targetWord.current, guess);
    console.log("Result:", result);

    const gameStatus = checkVictory(result, prevRow);
    console.log("Game Status:", gameStatus);

    // Update tile validation
    setValidationResult((prevResult) => {
      const newResult = prevResult.map((row) => [...row]);
      result.forEach((res, index) => {
        newResult[prevRow][index] = res;
      });
      return newResult;
    });

    // Update keyboard colors
    setKeyboardColors((prevColors) => {
      const newColors = { ...prevColors };
      guess.split("").forEach((char, index) => {
        const upperChar = char.toUpperCase();
        if (result[index] === "correct") {
          newColors[upperChar] = "bg-correct";
        } else if (
          result[index] === "misplaced" &&
          newColors[upperChar] !== "bg-green-500"
        ) {
          newColors[upperChar] = "bg-misplaced";
        } else if (!newColors[upperChar]) {
          newColors[upperChar] = "bg-incorrect";
        }
      });
      return newColors;
    });

    // Win / lose conditions
    if (gameStatus === "won") {
      showDialog("🎉 Congratulations! You won!");
      return prevRow; // stop updates
    } else if (gameStatus === "lost") {
      showDialog("Game over! The word was: " + targetWord.current);
      return prevRow; // stop updates
    }

    // Proceed to next row
    if (prevRow < 5) {
      setCurrentCol(0);
      return prevRow + 1;
    } else {
      showDialog("Game over! The word was: " + targetWord.current);
      return prevRow;
    }
  });
};

 const showDialog = (message) => {
  setDialogMessage(message);

  setTimeout(() => {
    setDialogMessage(null); // hide after 3s
  }, 3000);
};
 
  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentRow, currentCol]);
// for debugging purposes
  useEffect(() => {
    console.log('Current Row:', currentRow, 'Current Col:', currentCol);
    console.log('Board State:', board);
  }, [board, currentRow, currentCol]);

const resetBoard = () => {
  showDialog("The word was: " + targetWord.current);
  setBoard(
    Array(6)
      .fill()
      .map(() => Array(5).fill(' '))
  );

  setValidationResult(
    Array(6)
      .fill()
      .map(() => Array(5).fill(' '))
  );

  setCurrentRow(0);
  setCurrentCol(0);
  setKeyboardColors({});
  targetWord.current = RandomWord(difficulty); // generate a new word

  console.log("Game has been reset. New word:", targetWord.current);

  if (boardRef.current) {
    boardRef.current.focus();
  }
};



  return (
    <main className='relative flex flex-col items-center justify-start min-h-screen w-full overflow-x-hidden px-2 sm:px-0'>
      <div className='w-full h-11 absolute bg-transparent flex items-center justify-center'>
        <div className='w-auto h-10 bg-black text-white '></div>
      </div>
      <div
        className="board-module"
        tabIndex={0}
        style={{ outline: 'none' }}
        ref={boardRef}
      >
        
        <div className="board">
          {board.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="row bg-blackbg w-[320px] h-[52.5px] flex justify-center items-center mx-[10px] my-[5px]"
            >
              {row.map((char, colIndex) => (
                <div
                  key={colIndex}
                  className={`tile aspect-square w-[14vw] sm:w-[52px] border-2 border-borderColor 
  text-[5vw] sm:text-4xl font-bold flex items-center justify-center 
  rounded-sm ${getTileColor(rowIndex, colIndex)}`}
                >
                  {char}
                </div>
              ))}
            </div>
          ))}
        </div>
        
      </div>
      <div className='w-full flex items-center justify-center'>
        <KeyboardModule onKeyPress={handleKeyPress} keyboardColors={keyboardColors} />
      </div>
      <div className='w-full h-10 flex items-center justify-center'>
        <button className='w-1/3 sm:w-1/5 h-12 bg-key_bg rounded-lg font-bold text-2xl text-slate-200 border-2 border-green-500' onClick={resetBoard} >RESET</button>
      </div>

      {dialogMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 
                  bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg 
                  animate-fadeIn z-50">
          {dialogMessage}
        </div>
      )}

    </main>
  );
};

export default BoardModule;
