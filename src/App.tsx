import { LanguageProvider } from './contexts/LanguageContext';
import { Landing } from './pages/Landing';

function App() {
  return (
    <LanguageProvider>
      <Landing />
    </LanguageProvider>
  );
}

export default App
