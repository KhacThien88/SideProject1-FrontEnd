import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { Login } from './pages/Auth/Login';

function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <Login />
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App
