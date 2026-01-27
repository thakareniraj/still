import * as React from 'react';
import { useState, useEffect } from 'react';
import './MindWarmUpModule.css';
import { MindWarmUpContent } from '../types';

interface MindWarmUpModuleProps {
  onComplete: () => void;
}

const SAMPLE_CONTENT: MindWarmUpContent[] = [
  {
    paragraph: 'The morning light filtered through the trees, creating patterns on the forest floor. Each beam carried the promise of a new beginning.',
    questions: ['What season does this remind you of?', 'How does this scene make you feel?'],
    difficulty: 'easy'
  },
  {
    paragraph: 'Innovation often comes from unexpected connections between different ideas. When we allow our minds to wander and make new associations, we unlock creative potential.',
    questions: ['What ideas have you connected recently?', 'How can you encourage more creative thinking?'],
    difficulty: 'medium'
  },
  {
    paragraph: 'The concept of "kairos" refers to the opportune moment—not just any moment, but the right moment when conditions align perfectly for action. Many cultures recognize this principle.',
    questions: ['What is your current kairos moment?', 'Are you ready to seize it?'],
    difficulty: 'hard'
  }
];

export const MindWarmUpModule: React.FC<MindWarmUpModuleProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'instruction' | 'reading' | 'question' | 'complete'>('instruction');
  const [contentIndex, setContentIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  const content = SAMPLE_CONTENT[contentIndex];

  useEffect(() => {
    if (phase !== 'reading' || !isActive) return;

    const timer = setInterval(() => {
      setReadingTime((prev) => {
        if (prev >= 20) {
          setPhase('question');
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, isActive]);

  const startSession = () => {
    setPhase('reading');
    setIsActive(true);
  };

  const handleQuestionAnswered = () => {
    if (questionIndex < content.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setPhase('complete');
    }
  };

  return (
    <div className="mind-warmup-module">
      <div className="mind-warmup-container">
        {phase === 'instruction' && (
          <div className="instruction-screen fade-in">
            <div className="instruction-icon">🧠</div>
            <h2>Mind Warm-Up</h2>
            <p className="instruction-subtitle">Gentle attention training</p>
            <div className="instruction-box">
              <p>Read a short passage and answer gentle questions to warm up your mind.</p>
              <p>No pressure, no right or wrong answers.</p>
            </div>
            <button className="start-button" onClick={startSession}>
              Begin
            </button>
          </div>
        )}

        {phase === 'reading' && (
          <div className="reading-screen fade-in">
            <div className="reading-content">
              <p className="paragraph">{content.paragraph}</p>
            </div>
            <div className="reading-timer">
              {readingTime < 5 && <p className="timer-text">Take your time...</p>}
              {readingTime >= 5 && <p className="timer-text">Continue reading...</p>}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(readingTime / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {phase === 'question' && (
          <div className="question-screen fade-in">
            <p className="question-text">{content.questions[questionIndex]}</p>
            <div className="question-input-area">
              <textarea
                className="question-input"
                placeholder="Your thoughts..."
                autoFocus
              />
              <button
                className="submit-button"
                onClick={handleQuestionAnswered}
              >
                Continue
              </button>
            </div>
            <div className="question-progress">
              Question {questionIndex + 1} of {content.questions.length}
            </div>
          </div>
        )}

        {phase === 'complete' && (
          <div className="completion-screen fade-in">
            <div className="completion-icon">✓</div>
            <h3>Mind warmed up!</h3>
            <p className="completion-text">
              Your attention is ready. Continue your day with focus and clarity.
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
