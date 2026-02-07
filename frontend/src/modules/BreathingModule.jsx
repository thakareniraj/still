import React, { useState, useEffect } from 'react';
import './BreathingModule.css';

export const BreathingModule = ({ onComplete }) => {
  const [phase, setPhase] = useState('inhale');
  const [remainingTime, setRemainingTime] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const pattern = {
    name: '4-7-8 Breathing',
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4
  };

  useEffect(() => {
    if (!isActive || showInstructions) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === 'inhale') {
            setPhase('hold');
            return pattern.hold;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return pattern.exhale;
          } else {
            // Exhale complete, move to next cycle
            const newCycle = cycleCount + 1;
            setCycleCount(newCycle);

            if (newCycle >= pattern.cycles) {
              setIsActive(false);
              return 0;
            }

            setPhase('inhale');
            return pattern.inhale;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, cycleCount, pattern, showInstructions]);

  const startSession = () => {
    setShowInstructions(false);
    setIsActive(true);
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return '';
    }
  };

  const getCircleScale = () => {
    const maxTime = phase === 'inhale' ? pattern.inhale : phase === 'hold' ? pattern.hold : pattern.exhale;
    const progress = (maxTime - remainingTime) / maxTime;

    switch (phase) {
      case 'inhale':
        return 0.5 + progress * 0.4;
      case 'exhale':
        return 0.9 - progress * 0.4;
      default:
        return 0.9;
    }
  };

  return (
    <div className="breathing-module">
      <div className="breathing-container">
        {showInstructions ? (
          <div className="instructions fade-in">
            <div className="instruction-icon">🫁</div>
            <h2>Guided Breathing</h2>
            <p className="pattern-name">{pattern.name}</p>
            <div className="pattern-details">
              <div className="pattern-step">
                <div className="pattern-time">{pattern.inhale}s</div>
                <div className="pattern-label">Inhale</div>
              </div>
              <div className="pattern-step">
                <div className="pattern-time">{pattern.hold}s</div>
                <div className="pattern-label">Hold</div>
              </div>
              <div className="pattern-step">
                <div className="pattern-time">{pattern.exhale}s</div>
                <div className="pattern-label">Exhale</div>
              </div>
            </div>
            <p className="instruction-text">
              {pattern.cycles} cycles, {(pattern.inhale + pattern.hold + pattern.exhale) * pattern.cycles} seconds total
            </p>
            <button className="start-button" onClick={startSession}>
              Start
            </button>
          </div>
        ) : (
          <>
            <div className="breathing-circle-container">
              <div
                className={`breathing-circle ${phase}`}
                style={{
                  transform: `scale(${getCircleScale()})`
                }}
              />
              <div className="phase-label">{getPhaseLabel()}</div>
              <div className="remaining-time">{remainingTime}</div>
            </div>

            <div className="progress-info">
              <div className="cycle-counter">
                Cycle {cycleCount + 1} of {pattern.cycles}
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((cycleCount + 1) / pattern.cycles) * 100}%`
                  }}
                />
              </div>
            </div>

            {!isActive && cycleCount >= pattern.cycles && (
              <div className="completion-message fade-in">
                <p>✓ Session complete</p>
                <p className="subtext">You did great!</p>
                <button className="next-button" onClick={onComplete}>
                  Return Home
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
