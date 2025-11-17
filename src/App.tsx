import React from 'react';
import './App.css';
import './components/styles.css';
import { AuthProvider } from './hooks/useAuth';
import AppRouter from './router/AppRouter';
import { GlobalSpinner } from './components/Spinner';
import { Toasts } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <AppRouter />
        <GlobalSpinner />
        <Toasts />
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
