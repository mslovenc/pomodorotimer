import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export default function TimerControls({ isRunning, onToggle, onReset }: TimerControlsProps) {
  return (
    <div className="flex gap-4 justify-center mb-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="bg-white p-4 rounded-full shadow-lg"
      >
        {isRunning ? <FaPause className="text-purple-500" /> : <FaPlay className="text-purple-500" />}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="bg-white p-4 rounded-full shadow-lg"
      >
        <FaRedo className="text-purple-500" />
      </motion.button>
    </div>
  );
}