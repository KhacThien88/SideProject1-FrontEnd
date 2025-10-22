import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/auth/AuthContext';
import { RouterProvider, Route } from './components/Router';
import { PublicRoute } from './components/auth/PublicRoute';
import { ProtectedRouteWrapper } from './components/auth/ProtectedRouteWrapper';
import { Login } from './pages/Auth/Login';
import { ForgotPassword } from './pages/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/Auth/ResetPassword/ResetPassword';
import { Register, VerifyOTP } from './pages/Auth/Register';
import { RoleSelectionPage } from './pages/Auth/RoleSelection';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { CVAnalysis } from './pages/CVAnalysis';
import { JobDetailPage } from './pages/JobMatching/JobDetailPage';
import { SavedCandidates } from './pages/Candidates';
import { SavedJobs } from './pages/SavedJobs';
import { Settings } from './pages/Settings';
import { JobPostings } from './pages/JobPostings';
import { JobMatches } from './pages/CandidateMatching';
import { UsersPage } from './pages/Users';

// Lazy load Admin Pages - Phase 3
import { lazy, Suspense } from 'react';
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const UserManagement = lazy(() => import('./pages/Admin/UserManagement').then(m => ({ default: m.UserManagement })));
const CVManagement = lazy(() => import('./pages/Admin/CVManagement').then(m => ({ default: m.default })));
const AuditLogs = lazy(() => import('./pages/Admin/AuditLogs').then(m => ({ default: m.AuditLogs })));

// Lazy load API Integration Pages - Phase 2  
const JDUploadPage = lazy(() => import('./pages/JDUpload').then(m => ({ default: m.JDUploadPage })));
const TextExtractionPage = lazy(() => import('./pages/TextExtraction').then(m => ({ default: m.TextExtractionPage })));
const FeedbackPage = lazy(() => import('./pages/Feedback').then(m => ({ default: m.FeedbackPage })));

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
    if (hash === '#candidates') return '/dashboard/candidates';
    if (hash === '#saved-jobs') return '/dashboard/saved-jobs';
    if (hash === '#settings') return '/dashboard/settings';
    if (hash === '#job-postings') return '/dashboard/job-postings';
    if (hash === '#users') return '/dashboard/users';
    if (hash.startsWith('#job/')) return hash.replace('#', '');
    
    // Check pathname
    if (path === '/register') return '/register';
    if (path === '/login') return '/login';
    if (path === '/forgot-password') return '/forgot-password';
    if (path === '/role-selection') return '/role-selection';
    if (path === '/dashboard') return '/dashboard';
    if (path === '/reset-password') return '/reset-password';
    if (path === '/cv-analysis') return '/cv-analysis';
    if (path === '/dashboard/candidates') return '/dashboard/candidates';
    if (path === '/dashboard/saved-jobs') return '/dashboard/saved-jobs';
    if (path === '/dashboard/settings') return '/dashboard/settings';
    if (path === '/dashboard/job-postings') return '/dashboard/job-postings';
    if (path.startsWith('/dashboard/job-postings/') && path.includes('/matches')) return path;
    if (path === '/dashboard/users') return '/dashboard/users';
    
    // Admin routes - Phase 3
    if (path === '/admin/dashboard') return '/admin/dashboard';
    if (path === '/admin/users') return '/admin/users';
    if (path === '/admin/cvs') return '/admin/cvs';
    if (path === '/admin/audit-logs') return '/admin/audit-logs';
    
    // API Integration routes - Phase 2
    if (path === '/jd-upload') return '/jd-upload';
    if (path === '/text-extraction') return '/text-extraction';
    if (path === '/feedback') return '/feedback';
    
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
            {/* Public routes - wrapped with PublicRoute to check auth first */}
            <Route path="/" component={() => <PublicRoute component={Landing} />} exact />
            <Route path="/login" component={() => <PublicRoute component={Login} />} exact />
            <Route path="/register" component={() => <PublicRoute component={Register} />} exact />
            <Route path="/verify-otp" component={VerifyOTP} exact />
            
            {/* Auth recovery routes */}
            <Route path="/forgot-password" component={ForgotPassword} exact />
            <Route path="/reset-password" component={ResetPassword} exact />
            <Route path="/role-selection" component={RoleSelectionPage} exact />
            
            {/* Protected routes - wrapped with ProtectedRouteWrapper */}
            
            {/* Admin routes - Phase 3 */}
            <Route path="/admin/dashboard" component={() => <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}><ProtectedRouteWrapper component={AdminDashboard} /></Suspense>} exact />
            <Route path="/admin/users" component={() => <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}><ProtectedRouteWrapper component={UserManagement} /></Suspense>} exact />
            <Route path="/admin/cvs" component={() => <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}><ProtectedRouteWrapper component={CVManagement} /></Suspense>} exact />
            <Route path="/admin/audit-logs" component={() => <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}><ProtectedRouteWrapper component={AuditLogs} /></Suspense>} exact />
            
            {/* API Integration routes - Phase 2 */}
            <Route path="/jd-upload" component={() => <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}><ProtectedRouteWrapper component={JDUploadPage} /></Suspense>} exact />
            <Route path="/text-extraction" component={() => <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}><ProtectedRouteWrapper component={TextExtractionPage} /></Suspense>} exact />
            <Route path="/feedback" component={() => <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}><ProtectedRouteWrapper component={FeedbackPage} /></Suspense>} exact />

            {/* Job matching routes (most specific first) */}
            <Route path="/dashboard/job-postings/" component={() => <ProtectedRouteWrapper component={JobMatches} />} exact={false} />
            <Route path="/dashboard/job-postings" component={() => <ProtectedRouteWrapper component={JobPostings} />} exact />
            
            {/* Dashboard sub-routes */}
            <Route path="/dashboard/candidates" component={() => <ProtectedRouteWrapper component={SavedCandidates} />} exact />
            <Route path="/dashboard/saved-jobs" component={() => <ProtectedRouteWrapper component={SavedJobs} />} exact />
            <Route path="/dashboard/settings" component={() => <ProtectedRouteWrapper component={Settings} />} exact />
            <Route path="/dashboard/users" component={() => <ProtectedRouteWrapper component={UsersPage} />} exact />
            
            {/* Main routes */}
            <Route path="/dashboard" component={() => <ProtectedRouteWrapper component={Dashboard} />} exact />
            <Route path="/cv-analysis" component={() => <ProtectedRouteWrapper component={CVAnalysis} />} exact />
            
            {/* Dynamic routes (least specific) */}
            <Route path="/job/" component={() => <ProtectedRouteWrapper component={JobDetailPage} />} exact={false} />
          </RouterProvider>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App
