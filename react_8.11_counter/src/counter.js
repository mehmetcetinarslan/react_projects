import React from 'react'
import { useState } from 'react'

function Counter() {
    const[count, setCounter] = useState(0)
    const increase = ()=> 
    {
      if(count < 10){
      setCounter(count + 1)}
      else
      return
    }
    const decrase = ()=> 
    {
        if(count > 0){
        setCounter(count - 1)}
        else 
        return
        }

  return (
    <div  className='Counter'>
    <div>{count}</div>
    <button onClick={increase}>Arttır</button>
    <button onClick={decrase}>Azalt</button>
    </div>
  )
}

export default Counter