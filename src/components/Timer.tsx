import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import useSound from 'use-sound';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TaskList from './TaskList';

type TimerMode = 'work' | 'break';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  
  const [playStart] = useSound('/sounds/start.mp3');
  const [playComplete] = useSound('/sounds/complete.mp3');

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playComplete();
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60);
        setCompletedPomodoros(prev => prev + 1);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, playComplete]);

  const toggleTimer = () => {
    if (!isRunning) playStart();
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-2xl shadow-xl max-w-md w-full"
    >
      <TimerDisplay 
        timeLeft={timeLeft}
        mode={mode}
        completedPomodoros={completedPomodoros}
      />
      
      <TimerControls 
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={reset}
      />

      <TaskList />
    </motion.div>
  );
}