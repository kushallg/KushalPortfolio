import { useState } from 'react'
import CyclingScrambleText from '@/components/CyclingScrambleText';
import VerletClothString from '@/components/VerletClothString';
import Button from '@/components/Button';


function App() {

  return (
    <>
      <div>
       <h1 className = "greeting"> Hi!, my name is</h1> 
       <h1 className = "name" >Kushal Gadamsetty</h1> 
       <h1 className = "position">I <CyclingScrambleText 
          words={['code', 'lift','build', 'create']}
          interval={2100} // 2.5 seconds between changes
          scrambleConfig={{
            speed: 0.33,
            scramble: 6,
            seed: 1,
            chance: 1,
            tick: 1,
            range: [97, 122], // A-Z, a-z, and some symbols
            
          }}
        />.</h1> 
        
      
      <Button className="resume-button" variant="default" 
      size="default" onClick={() => window.open('/src/assets/resume.pdf', '_blank')}>Resume</Button>



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
