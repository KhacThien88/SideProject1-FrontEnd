// This file provides pre-configured route components for easy use in App.tsx

import React from 'react';
import { ProtectedRoute, PublicRoute, RoleBasedRoute } from './ProtectedRoute';

// Import page components
import { Landing } from '../../pages/Landing';
import { Login } from '../../pages/Auth/Login';
import { Register } from '../../pages/Auth/Register';
import { Dashboard } from '../../pages/Dashboard';
import { CVAnalysis } from '../../pages/CVAnalysis';

// Public Routes (accessible without authentication)
export const PublicLanding = () => (
  <PublicRoute>
    <Landing />
  </PublicRoute>
);

export const PublicLogin = () => (
  <PublicRoute>
    <Login />
  </PublicRoute>
);

export const PublicRegister = () => (
  <PublicRoute>
    <Register />
  </PublicRoute>
);

// Protected Routes (require authentication)
export const ProtectedDashboard = () => (
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
);

export const ProtectedCVAnalysis = () => (
  <ProtectedRoute>
    <CVAnalysis />
  </ProtectedRoute>
);

// Role-based Routes
export const RecruiterOnlyDashboard = () => (
  <RoleBasedRoute allowedRoles={['recruiter', 'admin']}>
    <Dashboard />
  </RoleBasedRoute>
);

export const CandidateOnlyCVAnalysis = () => (
  <RoleBasedRoute allowedRoles={['candidate', 'admin']}>
    <CVAnalysis />
  </RoleBasedRoute>
);

// Admin Routes
export const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <RoleBasedRoute allowedRoles={['admin']}>
    {children}
  </RoleBasedRoute>
);

// Job Detail Route (dynamic routing example)
export const ProtectedJobDetail = () => (
  <ProtectedRoute>
    <div>Job Detail Page - To be implemented</div>
  </ProtectedRoute>
);

// Unauthorized Page Component
export const UnauthorizedPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Access Denied
      </h1>
      <p className="text-gray-600 mb-6">
        You don't have permission to access this page.
      </p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  </div>
);

// Export all components as default for easier importing
export default {
  PublicLanding,
  PublicLogin,
  PublicRegister,
  ProtectedDashboard,
  ProtectedCVAnalysis,
  RecruiterOnlyDashboard,
  CandidateOnlyCVAnalysis,
  AdminRoute,
  ProtectedJobDetail,
  UnauthorizedPage,
};
