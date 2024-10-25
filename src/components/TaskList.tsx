import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaCheck } from 'react-icons/fa';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-white/10 rounded-lg p-4">
      <h3 className="text-white text-lg mb-4">Tasks</h3>
      
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-white/20 p-2 rounded-lg"
        >
          <FaPlus className="text-white" />
        </motion.button>
      </form>

      <div className="space-y-2">
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-white/20 p-2 rounded-lg"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                task.completed ? 'bg-white' : ''
              }`}
            >
              {task.completed && <FaCheck className="text-purple-500 text-xs" />}
            </button>
            <span className={`text-white ${task.completed ? 'line-through opacity-50' : ''}`}>
              {task.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}