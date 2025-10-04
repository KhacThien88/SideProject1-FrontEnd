import type { TokenData } from '../../contexts/auth/authTypes';

// Token storage keys
const TOKEN_KEY = 'auth_tokens';
const REFRESH_KEY = 'auth_refresh';

// Interface for stored token data
interface StoredTokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

class TokenService {
  // Check if localStorage is available (for SSR compatibility)
  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && !!window.localStorage;
    } catch {
      return false;
    }
  }

  // Encode token for basic obfuscation (not for security, just to avoid plain text storage)
  private encodeToken(token: string): string {
    try {
      return btoa(token);
    } catch {
      return token;
    }
  }

  // Decode token
  private decodeToken(encodedToken: string): string {
    try {
      return atob(encodedToken);
    } catch {
      return '';
    }
  }

  // Set tokens in secure storage
  setTokens(tokens: TokenData): void {
    if (!this.isLocalStorageAvailable()) {
      console.warn('LocalStorage not available, tokens will not persist');
      return;
    }

    try {
      const expiresAt = Date.now() + (tokens.expiresIn * 1000);
      
      const tokenData: StoredTokenData = {
        accessToken: this.encodeToken(tokens.accessToken),
        refreshToken: this.encodeToken(tokens.refreshToken),
        expiresAt,
      };

      localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
      
      // Store refresh token separately with longer expiration (optional)
      localStorage.setItem(REFRESH_KEY, this.encodeToken(tokens.refreshToken));
      
      // Set a flag to indicate user chose to stay logged in
      if (tokens.expiresIn > 24 * 60 * 60) { // More than 24 hours
        localStorage.setItem('remember_user', 'true');
      }
    } catch (error) {
      console.error('Failed to store tokens:', error);
    }
  }

  // Get access token
  getAccessToken(): string | null {
    if (!this.isLocalStorageAvailable()) return null;

    try {
      const storedData = localStorage.getItem(TOKEN_KEY);
      if (!storedData) return null;

      const tokenData: StoredTokenData = JSON.parse(storedData);
      
      // Check if token is expired
      if (this.isTokenExpired()) {
        return null;
      }

      return this.decodeToken(tokenData.accessToken);
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
      return null;
    }
  }

  // Get refresh token
  getRefreshToken(): string | null {
    if (!this.isLocalStorageAvailable()) return null;

    try {
      const storedData = localStorage.getItem(TOKEN_KEY);
      if (!storedData) {
        // Fallback to separate refresh token storage
        const refreshToken = localStorage.getItem(REFRESH_KEY);
        return refreshToken ? this.decodeToken(refreshToken) : null;
      }

      const tokenData: StoredTokenData = JSON.parse(storedData);
      return this.decodeToken(tokenData.refreshToken);
    } catch (error) {
      console.error('Failed to retrieve refresh token:', error);
      return null;
    }
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    if (!this.isLocalStorageAvailable()) return true;

    try {
      const storedData = localStorage.getItem(TOKEN_KEY);
      if (!storedData) return true;

      const tokenData: StoredTokenData = JSON.parse(storedData);
      
      // Add 1 minute buffer to avoid race conditions
      const bufferTime = 60 * 1000; // 1 minute in milliseconds
      return Date.now() >= (tokenData.expiresAt - bufferTime);
    } catch (error) {
      console.error('Failed to check token expiration:', error);
      return true;
    }
  }

  // Get token expiration time
  getTokenExpiration(): number | null {
    if (!this.isLocalStorageAvailable()) return null;

    try {
      const storedData = localStorage.getItem(TOKEN_KEY);
      if (!storedData) return null;

      const tokenData: StoredTokenData = JSON.parse(storedData);
      return tokenData.expiresAt;
    } catch (error) {
      console.error('Failed to get token expiration:', error);
      return null;
    }
  }

  // Clear all tokens
  clearTokens(): void {
    if (!this.isLocalStorageAvailable()) return;

    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem('remember_user');
      
      // Clear any other auth-related storage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('auth_') || key.includes('token')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  }

  // Check if user has valid authentication
  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    
    return !!(accessToken && refreshToken && !this.isTokenExpired());
  }

  // Check if user chose to remember login
  shouldRememberUser(): boolean {
    if (!this.isLocalStorageAvailable()) return false;
    
    try {
      return localStorage.getItem('remember_user') === 'true';
    } catch {
      return false;
    }
  }

  // Update access token (for refresh scenarios)
  updateAccessToken(newAccessToken: string, expiresIn: number): void {
    if (!this.isLocalStorageAvailable()) return;

    try {
      const storedData = localStorage.getItem(TOKEN_KEY);
      if (!storedData) return;

      const tokenData: StoredTokenData = JSON.parse(storedData);
      const expiresAt = Date.now() + (expiresIn * 1000);
      
      const updatedTokenData: StoredTokenData = {
        ...tokenData,
        accessToken: this.encodeToken(newAccessToken),
        expiresAt,
      };

      localStorage.setItem(TOKEN_KEY, JSON.stringify(updatedTokenData));
    } catch (error) {
      console.error('Failed to update access token:', error);
    }
  }
}

// Export singleton instance
export const tokenService = new TokenService();
export default tokenService;