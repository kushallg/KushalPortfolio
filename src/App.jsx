import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import AnimatedString from './components/AnimatedString';
import { Linkedin } from 'lucide-react'; // npm install lucide-react
import VerletClothString from '@/components/VerletClothString';


function App() {

  return (
    <>
      <div>
       <h1 className = "greeting"> Hi!, my name is</h1> 
       <h1 className = "name" >Kushal Gadamsetty</h1> 
       <h1 className = "position">I'm a Software Engineer.</h1> 
       
      

        <VerletClothString 
  position="78%" 
  iconSrc="src/assets/linkedin.png"
  iconSize={32}
  stringLength={350}
  stringColor="#cadf9e"
  stringWidth={3}
  onClick={() => window.open('https://linkedin.com/in/kushalgadamsetty', '_blank')}
/>

        <VerletClothString 
  position="85%" 
  iconSrc="src/assets/github.png"
  iconSize={32}
  stringLength={450}
  stringColor="#cadf9e"
  stringWidth={3}
  onClick={() => window.open('https://github.com/kushallg', '_blank')}
/>



      </div>
    </>
  )
}

export default App
