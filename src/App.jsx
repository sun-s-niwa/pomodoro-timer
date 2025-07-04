import React, { useState, useEffect, useRef } from 'react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            audioRef.current.play();
            // Change mode after timer ends
            if (mode === 'work') {
              setMode('shortBreak');
              setMinutes(5);
            } else if (mode === 'shortBreak') {
              setMode('work');
              setMinutes(25);
            } else if (mode === 'longBreak') {
              setMode('work');
              setMinutes(25);
            }
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setMode('work');
  };

  const setWorkMode = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setMode('work');
  };

  const setShortBreakMode = () => {
    setIsActive(false);
    setMinutes(5);
    setSeconds(0);
    setMode('shortBreak');
  };

  const setLongBreakMode = () => {
    setIsActive(false);
    setMinutes(15);
    setSeconds(0);
    setMode('longBreak');
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">ポモドーロタイマー</h1>
      <div className="btn-group mb-4" role="group" aria-label="Timer Modes">
        <button type="button" className={`btn ${mode === 'work' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={setWorkMode}>作業 (25分)</button>
        <button type="button" className={`btn ${mode === 'shortBreak' ? 'btn-success' : 'btn-outline-success'}`} onClick={setShortBreakMode}>短い休憩 (5分)</button>
        <button type="button" className={`btn ${mode === 'longBreak' ? 'btn-info' : 'btn-outline-info'}`} onClick={setLongBreakMode}>長い休憩 (15分)</button>
      </div>
      <div className="display-4 mb-4">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className="btn-group" role="group" aria-label="Timer Controls">
        <button type="button" className="btn btn-success" onClick={toggle}>
          {isActive ? '一時停止' : '開始'}
        </button>
        <button type="button" className="btn btn-danger" onClick={reset}>リセット</button>
      </div>
      <audio ref={audioRef} src="https://www.soundjay.com/buttons/beep-07.wav" preload="auto"></audio>
    </div>
  );
};

export default PomodoroTimer;