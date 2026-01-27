import './styles.css';
import * as React from 'react';
import { useState } from 'react';
import { SessionType } from '../types';

interface HomeScreenProps {
  onSelectSession: (type: SessionType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectSession }) => {
  const [showMenu, setShowMenu] = useState(true);

  const sessions: Array<{
    type: SessionType;
    title: string;
    description: string;
    icon: string;
  }> = [
    {
      type: 'breathing',
      title: 'Breathing',
      description: 'Calm your mind with guided breathing',
      icon: '🫁'
    },
    {
      type: 'eyes',
      title: 'Eyes',
      description: 'Rest your eyes with the 20-20-20 rule',
      icon: '👁️'
    },
    {
      type: 'mindwarmup',
      title: 'Mind',
      description: 'Warm up your attention gently',
      icon: '🧠'
    },
    {
      type: 'declutter',
      title: 'Declutter',
      description: 'Clear your mind with a brain dump',
      icon: '📝'
    }
  ];

  return (
    <div className="home-screen">
      <div className="home-container">
        <div className="logo">
          <h1>Still</h1>
          <p>Mental Reset & Focus</p>
        </div>

        {showMenu && (
          <div className="session-menu fade-in">
            {sessions.map((session) => (
              <button
                key={session.type}
                className="session-button"
                onClick={() => onSelectSession(session.type)}
              >
                <div className="session-icon">{session.icon}</div>
                <div className="session-content">
                  <div className="session-title">{session.title}</div>
                  <div className="session-desc">{session.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="footer-hint">
        Choose a session to begin
      </div>
    </div>
  );
};
