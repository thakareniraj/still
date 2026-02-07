import React, { useState, useEffect } from 'react';
import './EyeExercisesModule.css';

export const EyeExercisesModule = ({ onComplete }) => {
  const [phase, setPhase] = useState('instruction');
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const LOOK_AWAY_TIME = 20;
  const PERIPHERAL_TIME = 30;

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          if (phase === 'looking-away') {
            setPhase('peripheral');
            return PERIPHERAL_TIME;
          } else if (phase === 'peripheral') {
            setPhase('complete');
            setIsActive(false);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const startExercise = () => {
    setPhase('looking-away');
    setRemainingTime(LOOK_AWAY_TIME);
    setIsActive(true);
  };

  return (
    <div className="eye-exercises-module">
      <div className="eye-exercises-container">
        {phase === 'instruction' && (
          <div className="instruction-screen fade-in">
            <div className="instruction-icon">👁️</div>
            <h2>Eye Exercises</h2>
            <p className="instruction-subtitle">The 20-20-20 Rule</p>
            <div className="rule-explanation">
              <p>Every 20 minutes of screen time,</p>
              <p>look at something 20 feet away</p>
              <p>for 20 seconds.</p>
            </div>
            <p className="instruction-detail">
              This session guides you through one cycle plus a peripheral vision exercise.
            </p>
            <button className="start-button" onClick={startExercise}>
              Begin Exercise
            </button>
          </div>
        )}

        {phase === 'looking-away' && (
          <div className="exercise-screen fade-in">
            <div className="look-away-prompt">
              <p className="prompt-text">Look away from the screen</p>
              <p className="prompt-subtext">Focus on something at least 20 feet away</p>
            </div>
            <div className="timer-display">
              <div className="timer-circle">
                <div className="timer-number">{remainingTime}</div>
                <div className="timer-label">seconds</div>
              </div>
            </div>
            <div className="progress-indicator">
              Looking away...
            </div>
          </div>
        )}

        {phase === 'peripheral' && (
          <div className="exercise-screen fade-in">
            <div className="peripheral-container">
              <div className="center-dot" />
              <p className="peripheral-text">Keep your eyes on the center dot</p>
              <p className="peripheral-subtext">Notice movement in your peripheral vision</p>
            </div>
            <div className="timer-display">
              <div className="timer-circle">
                <div className="timer-number">{remainingTime}</div>
                <div className="timer-label">seconds</div>
              </div>
            </div>
            <div className="progress-indicator">
              Peripheral vision exercise...
            </div>
          </div>
        )}

        {phase === 'complete' && (
          <div className="completion-screen fade-in">
            <div className="completion-icon">✓</div>
            <h3>Eyes refreshed!</h3>
            <p className="completion-text">
              Great job! Remember to take eye breaks throughout your day.
            </p>
            <button className="next-button" onClick={onComplete}>
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
