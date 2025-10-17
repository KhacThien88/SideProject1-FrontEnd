import type { AuthState, AuthAction, User } from './authTypes';

// Initial auth state
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Auth reducer function
export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_INIT_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_INIT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        error: null,
      };

    case 'AUTH_INIT_ERROR':
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      };

    case 'UPDATE_USER':
      if (!state.user) return state;
      
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        } as User,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;