import { useState, useCallback,useEffect,useRef } from 'react'


function App() {
  const [length,setlength]=useState(8)
  const [numberAllowed,setNumberAllowed] =useState(false);
  const [charAllowed,setCharAllowed] =useState(false);
  const [password,setPassword]=useState("")

  //useref hook
  const passwordRef =useRef(null)

  const passwordGenerator =useCallback(()=>{
    let pass=""
    let string="QWERTYUIOPASDFGHJLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(numberAllowed) string+="0123456789"
    if(charAllowed) string+="!@#$%^&*_+=[]{}~`"

    for(let i=1;i<=length;i++){
      let char =Math.floor(Math.random()*string.length +1)
      pass+=string.charAt(char)

    }
setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      {/* <h1 className='text-4xl text-center text-white'>
        Password Generator</h1> */}
        <div className='w-full max-w-md mx-auto shodaw-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password generator</h1>
          <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
            <input type="text" 
            value={password} 
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}

            
            />
            <button 
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
              copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setlength(e.target.value)}}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-ceter gap-x-1">
              <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setCharAllowed((prev)=>!prev);
              }}
              />
              <label htmlFor="numberInput" >Numbers</label>
            </div>
            <div className="flex items-ceter gap-x-1">
              <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id="characterInput"
              onChange={()=>{
                setCharAllowed((prev)=>!prev);
              }}
              />
              <label htmlFor="characterInput" >Character</label>
            </div>
          </div>
        </div>
    </>
  )
}

export default App

