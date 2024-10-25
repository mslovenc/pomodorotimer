import React from 'react';
import { motion } from 'framer-motion';

interface TimerDisplayProps {
  timeLeft: number;
  mode: 'work' | 'break';
  completedPomodoros: number;
}

export default function TimerDisplay({ timeLeft, mode, completedPomodoros }: TimerDisplayProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center mb-6">
      <h2 className="text-white text-xl mb-2">
        {mode === 'work' ? 'Work Time' : 'Break Time'}
      </h2>
      <div className="text-6xl font-bold text-white mb-2">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-white text-sm"
      >
        Completed Pomodoros: {completedPomodoros}
      </motion.div>
    </div>
  );
}