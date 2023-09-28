import React from 'react'

const Button = ({ size, text, bgHoverColor, bgColor, color, borderRadius, currentFunction }) => {
   return (
      <button type="button" className={`text-${size} p-3 hover:drop-shadow-xl hover:bg-${bgHoverColor}`} style={{ backgroundColor: bgColor, color, borderRadius }} onClick={currentFunction}>
         <p>{text}</p>
      </button>
   )
}

export default Button;