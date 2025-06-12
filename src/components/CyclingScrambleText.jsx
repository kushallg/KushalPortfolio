// CyclingScrambleText.jsx
import React, { useState, useEffect } from 'react';
import { useScramble } from 'use-scramble';

const CyclingScrambleText = ({ 
  words = ['coding', 'running', 'rock climbing', 'building', 'creating'],
  interval = 2000, // 2 seconds between changes
  scrambleConfig = {}
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);

  // Configure the scramble animation
  const { ref, replay } = useScramble({
    text: currentWord,
    speed: 0.8,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 2,
    chance: 1.0,
    range: [97, 122], // A-Z, a-z, and some symbols
    playOnMount: true,
    ...scrambleConfig
  });

  useEffect(() => {
    const timer = setInterval(() => {
      // Move to next word in array
      const nextIndex = (currentIndex + 1) % words.length;
      setCurrentIndex(nextIndex);
      setCurrentWord(words[nextIndex]);
      
      // Trigger the scramble animation
      replay();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, words, interval, replay]);

  return <span ref={ref} />;
};

export default CyclingScrambleText;
