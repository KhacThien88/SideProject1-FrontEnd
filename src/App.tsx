import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { RouterProvider, Route } from './components/Router';
import { Login } from './pages/Auth/Login';
import { Register, VerifyOTP } from './pages/Auth/Register';
import { Landing } from './pages/Landing';

function App() {
  // Determine initial route based on current URL
  const getInitialRoute = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Check hash first for compatibility
    if (hash === '#register') return '/register';
    if (hash === '#login') return '/login';
    
    // Check pathname
    if (path === '/register') return '/register';
    if (path === '/login') return '/login';
    if (path === '/') return '/';
    if (path === '/verify-otp') return '/verify-otp';
    
    // Default to login for auth pages
    return '/login';
  };

  return (
    <LanguageProvider>
      <ToastProvider>
        <RouterProvider initialRoute={getInitialRoute()}>
          <Route path="/" component={Landing} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/verify-otp" component={VerifyOTP} exact />
        </RouterProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App
