import { useState ,useCallback ,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numallowed, setNumallowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState('')
  const passRef = useRef(null)
  const [clicked , setClicked] = useState('Copy')
  const passwordGenerator = useCallback( ()=>{
    let pass = ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed){ str+="0123456789"}
    if(charallowed){ str+="!@#$%^&*()_+<>?:{}"}
    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
    setClicked('Copy')

  } , [length,numallowed,charallowed,setPassword,])

  const copyPassword = useCallback(()=>{
    passRef.current.select();
    passRef.current.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(passRef.current.value)
    setClicked('Copied')
  } ,[password])
  useEffect(()=>{passwordGenerator()},[passwordGenerator,length,numallowed,charallowed])

  return (
    <>
      <h1 className="text-4xl text-center">Password Generator</h1>
      <div className="bg-gray-700 rounded-4xl w-full max-w-md mx-auto shadow-md text-orange-500 p-5">
        <div className='flex items-center justify-center rounded-lg overflow-hidden m-4'>
           <input
          type="text"
          value={password}
          readOnly
          className="outline-none px-3 py-0.5 w-full bg-gray-100"
          ref={passRef}
        />
        <button onClick={copyPassword} className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700 ">
          {clicked}
        </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> setLength(e.target.value)} 
           />
           <label >Length:{length}</label>
           </div>
           <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={numallowed}
          id='numberInput'
          onChange={() => setNumallowed((prev) => !prev)}
          />
          <label >Number</label>
           </div>
           <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={charallowed}
          id='characterInput'
          onChange={() => setCharallowed((prev) => !prev)}
          />
          <label >Character</label>
           </div>
        </div>
      </div>
    </>
  );
}

export default App
