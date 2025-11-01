/**
 * Popup Manager Utility
 * Controls popup display frequency and behavior to improve UX
 * Only allows one popup at a time and respects user preferences
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

export type PopupType =
  | 'exit-intent'
  | 'scroll-triggered'
  | 'time-based'
  | 'chat-widget'
  | 'mobile-cta';

export interface PopupState {
  isActive: boolean;
  lastShownAt: number | null;
  dismissedAt: number | null;
  permanentlyDismissed: boolean;
}

export interface PopupConfig {
  cooldownMinutes: number; // Minimum minutes between shows
  maxShowsPerSession: number; // Maximum shows in one session
  priority: number; // Higher = more important (1-10)
}

// ============================================================================
// Default Configurations
// ============================================================================

const DEFAULT_CONFIGS: Record<PopupType, PopupConfig> = {
  'exit-intent': {
    cooldownMinutes: 60, // Show max once per hour
    maxShowsPerSession: 1, // Only once per session
    priority: 8, // High priority
  },
  'scroll-triggered': {
    cooldownMinutes: 120, // Show max once per 2 hours
    maxShowsPerSession: 1,
    priority: 6,
  },
  'time-based': {
    cooldownMinutes: 180, // Show max once per 3 hours
    maxShowsPerSession: 1,
    priority: 5,
  },
  'chat-widget': {
    cooldownMinutes: 0, // Always available (but not intrusive)
    maxShowsPerSession: 999,
    priority: 3,
  },
  'mobile-cta': {
    cooldownMinutes: 0, // Can show multiple times
    maxShowsPerSession: 999,
    priority: 4,
  },
};

// ============================================================================
// Popup Manager Class
// ============================================================================

class PopupManager {
  private readonly STORAGE_KEY = 'popup_manager_state';
  private readonly SESSION_KEY = 'popup_session_counts';
  private currentActivePopup: PopupType | null = null;
  private popupStates: Map<PopupType, PopupState> = new Map();
  private sessionCounts: Map<PopupType, number> = new Map();

  constructor() {
    this.loadState();
    this.loadSessionCounts();
  }

  /**
   * Check if a popup can be shown
   */
  canShow(type: PopupType): boolean {
    const config = DEFAULT_CONFIGS[type];
    const state = this.getState(type);

    // Check if permanently dismissed
    if (state.permanentlyDismissed) {
      return false;
    }

    // Check if another popup is currently active (higher priority only)
    if (this.currentActivePopup && this.currentActivePopup !== type) {
      const currentPriority = DEFAULT_CONFIGS[this.currentActivePopup].priority;
      if (config.priority <= currentPriority) {
        return false;
      }
    }

    // Check session limit
    const sessionCount = this.sessionCounts.get(type) || 0;
    if (sessionCount >= config.maxShowsPerSession) {
      return false;
    }

    // Check cooldown period
    if (state.lastShownAt) {
      const minutesSinceLastShow = (Date.now() - state.lastShownAt) / (1000 * 60);
      if (minutesSinceLastShow < config.cooldownMinutes) {
        return false;
      }
    }

    // Check if recently dismissed (respect user's dismiss action for at least 5 minutes)
    if (state.dismissedAt) {
      const minutesSinceDismiss = (Date.now() - state.dismissedAt) / (1000 * 60);
      if (minutesSinceDismiss < 5) {
        return false;
      }
    }

    return true;
  }

  /**
   * Mark popup as shown
   */
  markAsShown(type: PopupType): void {
    const state = this.getState(type);
    state.isActive = true;
    state.lastShownAt = Date.now();

    this.popupStates.set(type, state);
    this.currentActivePopup = type;

    // Increment session count
    const currentCount = this.sessionCounts.get(type) || 0;
    this.sessionCounts.set(type, currentCount + 1);

    this.saveState();
    this.saveSessionCounts();
  }

  /**
   * Mark popup as dismissed by user
   */
  markAsDismissed(type: PopupType, permanent: boolean = false): void {
    const state = this.getState(type);
    state.isActive = false;
    state.dismissedAt = Date.now();

    if (permanent) {
      state.permanentlyDismissed = true;
    }

    this.popupStates.set(type, state);

    if (this.currentActivePopup === type) {
      this.currentActivePopup = null;
    }

    this.saveState();
  }

  /**
   * Mark popup as closed (without permanent dismissal)
   */
  markAsClosed(type: PopupType): void {
    const state = this.getState(type);
    state.isActive = false;

    this.popupStates.set(type, state);

    if (this.currentActivePopup === type) {
      this.currentActivePopup = null;
    }

    this.saveState();
  }

  /**
   * Get current state for a popup type
   */
  private getState(type: PopupType): PopupState {
    if (!this.popupStates.has(type)) {
      this.popupStates.set(type, {
        isActive: false,
        lastShownAt: null,
        dismissedAt: null,
        permanentlyDismissed: false,
      });
    }
    return this.popupStates.get(type)!;
  }

  /**
   * Load state from localStorage
   */
  private loadState(): void {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.popupStates = new Map(Object.entries(parsed) as [PopupType, PopupState][]);
      }
    } catch (error) {
      console.error('Failed to load popup state:', error);
    }
  }

  /**
   * Save state to localStorage
   */
  private saveState(): void {
    try {
      const obj = Object.fromEntries(this.popupStates);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(obj));
    } catch (error) {
      console.error('Failed to save popup state:', error);
    }
  }

  /**
   * Load session counts from sessionStorage
   */
  private loadSessionCounts(): void {
    try {
      const saved = sessionStorage.getItem(this.SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.sessionCounts = new Map(Object.entries(parsed).map(([k, v]) => [k as PopupType, v as number]));
      }
    } catch (error) {
      console.error('Failed to load session counts:', error);
    }
  }

  /**
   * Save session counts to sessionStorage
   */
  private saveSessionCounts(): void {
    try {
      const obj = Object.fromEntries(this.sessionCounts);
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(obj));
    } catch (error) {
      console.error('Failed to save session counts:', error);
    }
  }

  /**
   * Reset all popup states (for testing)
   */
  resetAll(): void {
    this.popupStates.clear();
    this.sessionCounts.clear();
    this.currentActivePopup = null;
    localStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  /**
   * Get current active popup
   */
  getActivePopup(): PopupType | null {
    return this.currentActivePopup;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const popupManager = new PopupManager();
