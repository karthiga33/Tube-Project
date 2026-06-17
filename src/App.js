import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import DashboardPage from './pages/DashboardPage';
import ValidationPage from './pages/ValidationPage';
import StatusPage from './pages/StatusPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <TopNav />
        <div className="app-body">
          <Routes>
            <Route path="/"           element={<DashboardPage />} />
            <Route path="/validate"   element={<ValidationPage />} />
            <Route path="/status"     element={<StatusPage />} />
            <Route path="*"           element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
