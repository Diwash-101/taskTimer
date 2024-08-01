import React, { useEffect, useState } from "react";
import "./timer.css";

export default function App(props) {
  const [initialTime, setInitialTime] = useState(50 * 60 * 1000); // 20 minutes in milliseconds
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [endTime, setendTime] = useState(0);

  let getCurrentTime = () => {
    return new Date().getTime();
  };

  useEffect(() => {
    if (endTime) {
      const interval = setInterval(() => {
        //timeRemaining= formatTime(endTime-getCurrentTime());
        setRemainingTime(() => {
          const newTime = endTime - getCurrentTime();
          if (newTime <= 0) {
            clearInterval(interval);
            setendTime(0);
            setTo50Minutes();
            return 0;
          }
          return newTime;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [endTime]);

  useEffect(() => {
    setRemainingTime(initialTime);
  }, [initialTime]);

  const formatTime = (time) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const setTo50Minutes = () => {
    setInitialTime(50 * 60 * 1000); // 10 minutes in seconds
    setendTime(0);
  };

  const setTo20Minutes = () => {
    setInitialTime(20 * 60 * 1000); // 20 minutes in milliseconds
    setendTime(0);
  };

  const setTo10Minutes = () => {
    setInitialTime(10 * 60 * 1000); // 10 minutes in milliseconds
    setendTime(0);
  };

  const resetTimer = () => {
    endTime ? setendTime(0) : setendTime(getCurrentTime() + initialTime);
    setRemainingTime(initialTime);
  };

  return (
    <div className="stopwatch-container blur">
      <div className="focus-modes">
        <input
          type="radio"
          name="focus-mode"
          id="focus"
          defaultChecked="checked"
        />
        <label htmlFor="focus">
          <div className="Focus focus-mode" onClick={setTo50Minutes}>
            Focus
          </div>
        </label>
        <input type="radio" name="focus-mode" id="shortBreak" />
        <label htmlFor="shortBreak">
          <div className="shortBreak focus-mode" onClick={setTo10Minutes}>
            ShortBreak
          </div>
        </label>
        <input type="radio" name="focus-mode" id="longBreak" />
        <label htmlFor="longBreak">
          <div className="longBreak focus-mode" onClick={setTo20Minutes}>
            LongBreak
          </div>
        </label>
      </div>
      <div className="stopwatch-time">{formatTime(remainingTime)}</div>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={resetTimer}>
          {endTime ? "Reset" : "Start"}
        </button>
      </div>
    </div>
  );
}
