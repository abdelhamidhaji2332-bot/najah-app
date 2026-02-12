
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Exams from './pages/Exams.tsx';
import Pomodoro from './pages/Pomodoro.tsx';
import Planner from './pages/Planner.tsx';
import Admin from './pages/Admin.tsx';
import AITutor from './pages/AITutor.tsx';
import Profile from './pages/Profile.tsx';
import About from './pages/About.tsx';
import Subjects from './pages/Subjects.tsx';
import SubjectDetail from './pages/SubjectDetail.tsx';
import Onboarding from './components/Onboarding.tsx';

const App: React.FC = () => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('najah_onboarded') === 'true';
  });

  const handleFinishOnboarding = () => {
    localStorage.setItem('najah_onboarded', 'true');
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <Onboarding onComplete={handleFinishOnboarding} />;
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:subjectId" element={<SubjectDetail />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
