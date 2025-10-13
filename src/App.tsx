import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/auth/AuthContext';
import { RouterProvider, Route } from './components/Router';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { CVAnalysis } from './pages/CVAnalysis';
import { JobDetailPage } from './pages/JobMatching/JobDetailPage';
import { SavedCandidates } from './pages/Candidates';
import { SavedJobs } from './pages/SavedJobs';
import { Settings } from './pages/Settings';
import { JobPostings } from './pages/JobPostings';
import { JobMatches } from './pages/CandidateMatching';

function App() {
  // Determine initial route based on current URL
  const getInitialRoute = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Check hash first for compatibility
    if (hash === '#register') return '/register';
    if (hash === '#login') return '/login';
    if (hash === '#forgot-password') return '/forgot-password';
    if (hash === '#dashboard') return '/dashboard';
    if (hash === '#cv-analysis') return '/cv-analysis';
    if (hash === '#candidates') return '/dashboard/candidates';
  if (hash === '#saved-jobs') return '/dashboard/saved-jobs';
    if (hash === '#settings') return '/dashboard/settings';
    if (hash === '#job-postings') return '/dashboard/job-postings';
    if (hash.startsWith('#job/')) return hash.replace('#', '');
    
    // Check pathname
    if (path === '/register') return '/register';
    if (path === '/login') return '/login';
    if (path === '/forgot-password') return '/forgot-password';
    if (path === '/dashboard') return '/dashboard';
    if (path === '/cv-analysis') return '/cv-analysis';
    if (path === '/dashboard/candidates') return '/dashboard/candidates';
  if (path === '/dashboard/saved-jobs') return '/dashboard/saved-jobs';
    if (path === '/dashboard/settings') return '/dashboard/settings';
    if (path === '/dashboard/job-postings') return '/dashboard/job-postings';
    if (path.startsWith('/dashboard/job-postings/') && path.includes('/matches')) return path;
    if (path.startsWith('/job/')) return path;
    if (path === '/') return '/';
    
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
            <Route path="/cv-analysis" component={CVAnalysis} exact />
            {/* More specific routes first */}
            <Route path="/dashboard/job-postings/" component={JobMatches} exact={false} />
            <Route path="/dashboard/job-postings" component={JobPostings} exact />
            <Route path="/dashboard/candidates" component={SavedCandidates} exact />
            <Route path="/dashboard/saved-jobs" component={SavedJobs} exact />
            <Route path="/dashboard/settings" component={Settings} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/job/" component={JobDetailPage} exact={false} />
          </RouterProvider>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App
