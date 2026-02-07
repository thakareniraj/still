import React, { useState, useEffect } from 'react';
import './styles/global.css';
import { HomeScreen } from './components/HomeScreen';
import { BreathingModule } from './modules/BreathingModule';
import { EyeExercisesModule } from './modules/EyeExercisesModule';
import { MindWarmUpModule } from './modules/MindWarmUpModule';
import { MentalDeclutterModule } from './modules/MentalDeclutterModule';

export const App = () => {
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);

  useEffect(() => {
    // Load session history from IndexedDB
    loadSessionHistory();
  }, []);

  const loadSessionHistory = async () => {
    // TODO: Implement IndexedDB loading
  };

  const startSession = (type) => {
    setCurrentSession(type);
  };

  const endSession = () => {
    if (currentSession) {
      setSessionHistory([...sessionHistory, currentSession]);
      setCurrentSession(null);
    }
  };

  const handleModuleComplete = () => {
    endSession();
  };

  if (currentSession === 'breathing') {
    return <BreathingModule onComplete={handleModuleComplete} />;
  }

  if (currentSession === 'eyes') {
    return <EyeExercisesModule onComplete={handleModuleComplete} />;
  }

  if (currentSession === 'mindwarmup') {
    return <MindWarmUpModule onComplete={handleModuleComplete} />;
  }

  if (currentSession === 'declutter') {
    return <MentalDeclutterModule onComplete={handleModuleComplete} />;
  }

  return <HomeScreen onSelectSession={startSession} />;
};
