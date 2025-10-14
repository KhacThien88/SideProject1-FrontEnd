import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/auth/AuthContext';
import { RouterProvider, Route } from './components/Router';
import { Login } from './pages/Auth/Login';
import { ForgotPassword } from './pages/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/Auth/ResetPassword/ResetPassword';
import { Register, VerifyOTP } from './pages/Auth/Register';
import { RoleSelectionPage } from './pages/Auth/RoleSelection';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { CVAnalysis } from './pages/CVAnalysis';
import { JobDetailPage } from './pages/JobMatching/JobDetailPage';

function App() {
  // Determine initial route based on current URL
  const getInitialRoute = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Check hash first for compatibility
    if (hash === '#register') return '/register';
    if (hash === '#login') return '/login';
    if (hash === '#forgot-password') return '/forgot-password';
    if (hash.startsWith('#reset-password')) return '/reset-password';
    if (hash === '#role-selection') return '/role-selection';
    if (hash === '#dashboard') return '/dashboard';
    if (hash === '#cv-analysis') return '/cv-analysis';
    if (hash.startsWith('#job/')) return hash.replace('#', '');
    
    // Check pathname
    if (path === '/register') return '/register';
    if (path === '/login') return '/login';
    if (path === '/forgot-password') return '/forgot-password';
    if (path === '/role-selection') return '/role-selection';
    if (path === '/dashboard') return '/dashboard';
    if (path === '/reset-password') return '/reset-password';
    if (path === '/cv-analysis') return '/cv-analysis';
    if (path.startsWith('/job/')) return path;
    if (path === '/') return '/';
    if (path === '/verify-otp') return '/verify-otp';
    
    // Default to login for auth pages
    return '/login';
  };

  return (
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <RouterProvider initialRoute={getInitialRoute()}>
            <Route path="/" component={Landing} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/forgot-password" component={ForgotPassword} exact />
            <Route path="/reset-password" component={ResetPassword} exact />
            <Route path="/role-selection" component={RoleSelectionPage} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/cv-analysis" component={CVAnalysis} exact />
            <Route path="/job/" component={JobDetailPage} exact={false} />
            <Route path="/verify-otp" component={VerifyOTP} exact />
          </RouterProvider>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App
