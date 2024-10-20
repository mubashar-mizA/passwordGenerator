import { useEffect, useState } from "react"

export default function PasswordGenerator(){

  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [numAllowed, setNumAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [notification, setNotification] = useState('')


  

  // generating a random password
  function randomPassword (){
    let letters = 'abcdefghijklmnopqrstuvwxyz'
    if (numAllowed)  letters += '123456789'
    if (charAllowed) letters += '~!@$%^&*()_+}{|":?><'
    let pass = ''
    for(let i=1; i<= length; i++){
      pass += letters[Math.floor(Math.random() * letters.length)]
    }
    setPassword(pass)
    console.log('Password is', pass)

  }

  // determinig strength
  // if(length <= 10 && numAllowed) setStrength('Its fair buddy')
  // if(length > 10 && numAllowed || charAllowed ) setStrength('Excellent buddy. Its hard to catch')
  // if(length > 15 && numAllowed || charAllowed) setStrength('Excellent buddy. Its hard to catch')

  // creating effect
  useEffect( ()=>{
    randomPassword()
  }, [length, numAllowed, charAllowed] )

  // handling copy 
  function copyToClipBoard(){
    try{
      navigator.clipboard.writeText(password)
      .then( ()=>{
        setNotification(<p className="text-sm text-green-500">Password copied to clipboard</p>)
        setTimeout( ()=> setNotification(''), 3000 )
      } )
    }catch(error){
      setNotification(<p className="text-sm text-red-600">Failed to copy password</p>)
        setTimeout( ()=> setNotification(''), 3000 )
    }
  }  


  return(
    <>
      <div className="">
        <div className="mx-auto lg:w-1/2 border lg:my-3 lg:p-3 rounded-md inset-0 absolute">
          {
            notification
          }
          <div className="lg:m-2 m-1 lg:p-2 lg:text-3xl text-2xl font-bold text-center ">Password Generator</div>

          <div className="m-2 mt-3 rounded-md overflow-hidden border">
            <div className="flex items-center justify-between">
              <input type="text" className="bg-inherit pl-5" disabled placeholder={ password ? password :'Password' } />
              <button className="bg-blue-700 p-1 text-white "
                onClick={copyToClipBoard}
              >Copy</button>
            </div>
          </div>

          <div className="">
            <div className="m-2  flex  gap-x-2 flex-wrap">
              <div>
                <input type="checkbox" id="numAllowed" 
                  defaultChecked={numAllowed}
                  onChange={()=>{
                    setNumAllowed( preVal => !preVal )
                  }}
                />
                <label htmlFor="numAllowed"> Numbers Allowed</label>
              </div>
              <div>
                <input type="checkbox" id="charAllowed" 
                  defaultChecked={charAllowed}
                  onChange={()=>{
                    setCharAllowed( preVal => !preVal )
                  }}
                />
                <label htmlFor="charAllowed"> Characters Allowed </label>
              </div>
            </div>
            
            <div className=" p-2 ">
              <input type="range" id="length" 
                max={20}
                min={6}
                value={length}
                onChange={(e)=>{
                  setLength(e.target.value)
                }}
              />
              <label htmlFor="length">Length:{length}</label>

                <div className="font-bold text-green-400">Password Strength:
                  <span className="text-red-500">
                    {numAllowed && charAllowed && length >= 12 ? 'Excellent : Hard To Catch' : ''}
                    {numAllowed && charAllowed && length <= 10 || numAllowed && charAllowed && length < 12 ? 'Great buddy' : ''}
                    
                    
                    {!numAllowed  && !charAllowed && !length < 10 ? 'Fair' : ''}
                    {numAllowed  && !charAllowed && !length < 10 ? 'Fair' : ''}
                    {!numAllowed  && charAllowed && !length < 10 ? 'Fair' : ''}
                  </span>
                    
                    
                </div>
            </div>
          </div>

          <div className="bg-gray-200  mb-8 rounded-md p-1 m-2 text-black text-center text-sm">
            <p className=" text-blue-900 text-2xl ">Note that</p>
            <div className="ml-4">
              <p className="">It is highly recomanded to change you'r password every week to protect you'r accounts.</p>
              <p className="">Developed and maintained by <a href="#"
                className="bold text-green-600"
              >Mubashar Siddique </a>using React and Tailwind</p>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
