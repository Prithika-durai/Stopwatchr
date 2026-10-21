import { useEffect, useRef, useState } from "react";

function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef(null);
  const elapsedRef = useRef(0);
  const intervalRef = useRef(null);

  
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;

      elapsedRef.current = elapsed;
      setTime(elapsed);
    }, 10);

    
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  
  const handleStart = () => {
    if (isRunning) return;

    startTimeRef.current = Date.now() - elapsedRef.current;
    setIsRunning(true);
  };

  
  const handlePause = () => {
    if (!isRunning) return;

    elapsedRef.current = Date.now() - startTimeRef.current;
    setTime(elapsedRef.current);
    setIsRunning(false);
  };

 
  const handleReset = () => {
    clearInterval(intervalRef.current);

    startTimeRef.current = null;
    elapsedRef.current = 0;

    setTime(0);
    setIsRunning(false);
  };

 
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>

      {!isRunning ? (
        <button onClick={handleStart} className="but1">Start</button>
      ) : (
        <button onClick={handlePause} className="but3">Pause</button>
      )}

      <button onClick={handleReset} className="but2">Reset</button>
    </div>
  );
}

export default StopWatch;
