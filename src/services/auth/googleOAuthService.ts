// Google OAuth Service for handling Google Sign-In integration

import type { 
  GoogleAuthResponse, 
  GoogleUserInfo
} from '../../contexts/auth/authTypes';

// Google Sign-In configuration interface (moved to avoid conflicts)

// Google Sign-In response interface
interface GoogleSignInResponse {
  credential: string;
  select_by?: string;
}

// Google user data from JWT token
interface GoogleCredentialPayload {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

// Google OAuth types are now defined in LoginForm.tsx to avoid conflicts

class GoogleOAuthService {
  private clientId: string;
  private isInitialized = false;

  constructor() {
    // Get client ID from environment variables
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
    
    if (!this.clientId) {
      console.warn('Google OAuth Client ID not configured. Set VITE_GOOGLE_CLIENT_ID in environment variables.');
    }
  }

  // Initialize Google OAuth library
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load Google Identity Services script
      await this.loadGoogleScript();
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Google OAuth:', error);
      throw error;
    }
  }

  // Load Google Identity Services script
  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.getElementById('google-identity-script')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-identity-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Wait a bit for Google library to be available
        setTimeout(() => {
          if (window.google && window.google.accounts) {
            resolve();
          } else {
            reject(new Error('Google library not loaded properly'));
          }
        }, 100);
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Identity Services script'));
      };

      document.head.appendChild(script);
    });
  }

  // Configure Google Sign-In
  configureGoogleSignIn(callback: (response: GoogleSignInResponse) => void): void {
    if (!this.isInitialized || !window.google) {
      throw new Error('Google OAuth not initialized');
    }

    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback,
      auto_select: false,
      cancel_on_tap_outside: true,
      context: 'signin',
    });
  }

  // Render Google Sign-In button
  renderButton(
    element: HTMLElement, 
    options: {
      theme?: 'outline' | 'filled_blue' | 'filled_black';
      size?: 'large' | 'medium' | 'small';
      text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
      shape?: 'rectangular' | 'pill' | 'circle' | 'square';
      width?: number;
    } = {}
  ): void {
    if (!this.isInitialized || !window.google) {
      throw new Error('Google OAuth not initialized');
    }

    const buttonConfig = {
      theme: options.theme || 'outline',
      size: options.size || 'large',
      text: options.text || 'signin_with',
      shape: options.shape || 'rectangular',
      width: options.width || 250,
    };

    window.google.accounts.id.renderButton(element, buttonConfig);
  }

  // Parse JWT credential from Google
  private parseCredential(credential: string): Promise<GoogleUserInfo> {
    return new Promise((resolve, reject) => {
      try {
        // Decode JWT token (Google sends base64url encoded)
        const parts = credential.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid JWT format');
        }

        // Decode payload (second part of JWT)
        const payload = parts[1];
        // Add padding if needed for base64 decoding
        const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
        const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));
        
        const userInfo: GoogleCredentialPayload = JSON.parse(decodedPayload);

        // Verify the token is not expired
        const now = Math.floor(Date.now() / 1000);
        if (userInfo.exp < now) {
          throw new Error('Google credential has expired');
        }

        // Convert to our GoogleUserInfo format
        const googleUser: GoogleUserInfo = {
          sub: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          email_verified: userInfo.email_verified,
          given_name: userInfo.given_name,
          family_name: userInfo.family_name,
        };

        resolve(googleUser);
      } catch (error) {
        reject(new Error('Failed to parse Google credential: ' + error));
      }
    });
  }

  // Exchange credential for auth tokens via backend
  private async exchangeCredentialForTokens(
    credential: string, 
    _userInfo: GoogleUserInfo
  ): Promise<GoogleAuthResponse> {
    try {
      // Import authService dynamically to avoid circular dependency
      const { authService } = await import('./authService');
      
      // Send credential to backend for verification and token exchange
      const response = await authService.googleSignIn(credential);
      return response;
    } catch (error) {
      throw new Error('Failed to exchange credential for tokens: ' + error);
    }
  }

  // Main sign-in method
  async signIn(): Promise<GoogleAuthResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      try {
        this.configureGoogleSignIn(async (response: GoogleSignInResponse) => {
          try {
            // Parse the JWT credential
            const userInfo = await this.parseCredential(response.credential);
            
            // Exchange for our app tokens
            const authResponse = await this.exchangeCredentialForTokens(
              response.credential, 
              userInfo
            );

            resolve(authResponse);
          } catch (error) {
            reject(error);
          }
        });

        // Trigger the sign-in prompt
        window.google.accounts.id.prompt();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Sign out from Google
  async signOut(email?: string): Promise<void> {
    if (!this.isInitialized || !window.google) {
      console.warn('Google OAuth not initialized');
      return;
    }

    return new Promise((resolve) => {
      if (email) {
        window.google.accounts.id.revoke(email, () => {
          resolve();
        });
      } else {
        window.google.accounts.id.disableAutoSelect();
        resolve();
      }
    });
  }

  // Check if Google OAuth is available
  isAvailable(): boolean {
    return !!(this.clientId && this.isInitialized && window.google);
  }

  // Get configuration status
  getStatus(): {
    clientId: string;
    isInitialized: boolean;
    isLibraryLoaded: boolean;
    isConfigured: boolean;
  } {
    return {
      clientId: this.clientId ? 'configured' : 'missing',
      isInitialized: this.isInitialized,
      isLibraryLoaded: !!(window.google && window.google.accounts),
      isConfigured: !!(this.clientId && this.isInitialized),
    };
  }
}

// Export singleton instance
export const googleOAuthService = new GoogleOAuthService();
export default googleOAuthService;
