import React from 'react'
import '../style/keyboardstyle.css'
const KeyboardModule = ({onKeyPress, keyboardColors}) => {

  const row1=['Q','W','E','R','T','Y','U','I','O','P'];
  const row2 =['A','S','D','F','G','H','J','K','L'];
  const row3 = ['Z','X','C','V','B','N','M'];

  const getKeyColor = (char) => keyboardColors[char] || '';


  return (
    <div className='mt-10 mb-3 w-[100vw] max-w-[560px] h-auto bg-blackbg flex flex-col gap-2 p-2 rounded-lg '>
      <div className=' flex align-top items-center justify-center'>
        {
          row1.map((char,charIndex)=>(
            <button key={charIndex} className={`key ${getKeyColor(char)}`} onClick={() => onKeyPress(char)}>
              {char}
            </button>
          ))
        }
      </div>
      <div className='row2 flex items-center justify-center'>
        <div className='sidespace'></div>
        {
          row2.map((char,charIndex)=>(
            <button key={charIndex} className={`key ${getKeyColor(char)}`}  onClick={() => onKeyPress(char)}>
              {char}
            </button>
          ))
        }
        <div className='sidespace'></div>
      </div>
      <div className='row3 flex items-center justify-normal'>
        <button className='func_key' onClick={() => onKeyPress('Backspace')}>DELETE</button>
        {
          row3.map((char,charIndex)=>(
            <button key={charIndex} className={`key ${getKeyColor(char)}`} onClick={() => onKeyPress(char)}>
              {char}
            </button>
          ))
        }
        <button className='func_key' onClick={() => onKeyPress('Enter')}>ENTER</button>
      </div>
      
    </div>
  )
}

export default KeyboardModule
