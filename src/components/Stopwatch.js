"use client";

import { useRef, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      });
    }
  };

  const stopStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center p-5 space-y-5 bg-gray-800 text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold">Stopwatch</h1>
      <div className="text-5xl font-mono">{formatTime(time)}</div>
      <div className="space-x-3">
        <button
          onClick={startStopwatch}
          disabled={isRunning}
          className={`px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Start
        </button>
        <button
          onClick={stopStopwatch}
          disabled={!isRunning} 
          className={`px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 ${!isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Stop
        </button>
        <button
          onClick={resetStopwatch}
          disabled={!isRunning && time === 0}
          className={`px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 ${!isRunning && time === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
