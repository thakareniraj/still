import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import './MentalDeclutterModule.css';

interface MentalDeclutterModuleProps {
  onComplete: () => void;
}

export const MentalDeclutterModule: React.FC<MentalDeclutterModuleProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'instruction' | 'dumping' | 'intention' | 'complete'>('instruction');
  const [thoughtsDump, setThoughtsDump] = useState('');
  const [intention, setIntention] = useState('');
  const [dumpTime, setDumpTime] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setThoughtsDump((prev) => (prev + ' ' + finalTranscript).trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in your browser. Try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    if (phase !== 'dumping' || !isActive) return;

    const timer = setInterval(() => {
      setDumpTime((prev) => {
        if (prev <= 1) {
          setPhase('intention');
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, isActive]);

  const startDumping = () => {
    setPhase('dumping');
    setDumpTime(60);
    setIsActive(true);
  };

  const finishIntention = () => {
    setPhase('complete');
  };

  return (
    <div className="mental-declutter-module">
      <div className="declutter-container">
        {phase === 'instruction' && (
          <div className="instruction-screen fade-in">
            <div className="instruction-icon">📝</div>
            <h2>Mental Declutter</h2>
            <p className="instruction-subtitle">Brain dump & intention reset</p>
            <div className="instruction-box">
              <p>First, we'll clear your mind by writing down everything that's on it.</p>
              <p>No judgment, no organization needed—just let it out.</p>
              <p>Then, we'll set a single intention for what comes next.</p>
            </div>
            <button className="start-button" onClick={startDumping}>
              Start Brain Dump
            </button>
          </div>
        )}

        {phase === 'dumping' && (
          <div className="dumping-screen fade-in">
            <div className="dumping-header">
              <h3>Brain Dump</h3>
              <div className="dump-timer">{dumpTime}s</div>
            </div>
            <div className="dumping-controls">
              <textarea
                className="dump-textarea"
                placeholder="Write everything on your mind... or speak it! Click the mic button below..."
                value={thoughtsDump}
                onChange={(e) => setThoughtsDump(e.target.value)}
                autoFocus
              />
              <button
                className={`voice-button ${isListening ? 'listening' : ''}`}
                onClick={toggleListening}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? '🎤 Listening...' : '🎤 Speak'}
              </button>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((60 - dumpTime) / 60) * 100}%` }}
              />
            </div>
            <p className="dumping-hint">
              {isListening
                ? 'Speak now - your words will appear automatically'
                : 'Type or click the mic button to speak your thoughts'}
            </p>
          </div>
        )}

        {phase === 'intention' && (
          <div className="intention-screen fade-in">
            <h3>Single Intention</h3>
            <p className="intention-subtitle">
              What is one thing you want to focus on next?
            </p>
            <textarea
              className="intention-textarea"
              placeholder="My intention is to..."
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              autoFocus
            />
            <p className="intention-hint">
              One clear intention, nothing more.
            </p>
            <button
              className="submit-button"
              onClick={finishIntention}
              disabled={intention.trim().length === 0}
            >
              Confirm Intention
            </button>
          </div>
        )}

        {phase === 'complete' && (
          <div className="completion-screen fade-in">
            <div className="completion-icon">✓</div>
            <h3>Mind cleared!</h3>
            <div className="completion-box">
              <p className="completion-label">Your intention:</p>
              <p className="intention-display">{intention}</p>
            </div>
            <p className="completion-text">
              Focus on this single intention. You've got this.
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
