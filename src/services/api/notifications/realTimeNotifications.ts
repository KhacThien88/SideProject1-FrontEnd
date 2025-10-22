import { notificationService, type Notification } from './notificationService';

export interface NotificationEventData {
  type: 'new_notification' | 'notification_read' | 'notification_deleted';
  notification?: Notification;
  notification_id?: string;
  unread_count?: number;
}

export type NotificationEventHandler = (data: NotificationEventData) => void;

class RealTimeNotificationService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private eventHandlers: NotificationEventHandler[] = [];
  private isConnecting = false;
  private shouldReconnect = true;

  private getWebSocketUrl(): string {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const baseUrl = import.meta.env.VITE_WS_URL || `${wsProtocol}//${window.location.host}`;
    return `${baseUrl}/ws/notifications`;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Connect to WebSocket
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      if (this.isConnecting) {
        reject(new Error('Already connecting'));
        return;
      }

      this.isConnecting = true;
      const token = this.getAuthToken();

      if (!token) {
        this.isConnecting = false;
        reject(new Error('No authentication token available'));
        return;
      }

      try {
        const wsUrl = `${this.getWebSocketUrl()}?token=${encodeURIComponent(token)}`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log('WebSocket connected for notifications');
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data: NotificationEventData = JSON.parse(event.data);
            this.handleNotificationEvent(data);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        this.ws.onclose = (event) => {
          console.log('WebSocket connection closed:', event.code, event.reason);
          this.isConnecting = false;
          this.ws = null;

          if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect();
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.isConnecting = false;
          
          if (this.ws?.readyState === WebSocket.CONNECTING) {
            reject(new Error('Failed to connect to notification service'));
          }
        };

      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  // Disconnect from WebSocket
  disconnect(): void {
    this.shouldReconnect = false;
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  // Schedule reconnection
  private scheduleReconnect(): void {
    if (!this.shouldReconnect) return;

    this.reconnectAttempts++;
    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1), 30000);

    console.log(`Scheduling reconnect attempt ${this.reconnectAttempts} in ${delay}ms`);

    setTimeout(() => {
      if (this.shouldReconnect) {
        this.connect().catch(error => {
          console.error('Reconnection failed:', error);
        });
      }
    }, delay);
  }

  // Handle notification events
  private handleNotificationEvent(data: NotificationEventData): void {
    console.log('Received notification event:', data);

    // Update local notification count cache
    if (data.unread_count !== undefined) {
      this.updateUnreadCountCache(data.unread_count);
    }

    // Notify all event handlers
    this.eventHandlers.forEach(handler => {
      try {
        handler(data);
      } catch (error) {
        console.error('Error in notification event handler:', error);
      }
    });

    // Show browser notification for new notifications
    if (data.type === 'new_notification' && data.notification) {
      this.showBrowserNotification(data.notification);
    }
  }

  // Add event handler
  addEventListener(handler: NotificationEventHandler): void {
    this.eventHandlers.push(handler);
  }

  // Remove event handler
  removeEventListener(handler: NotificationEventHandler): void {
    const index = this.eventHandlers.indexOf(handler);
    if (index > -1) {
      this.eventHandlers.splice(index, 1);
    }
  }

  // Show browser notification
  private async showBrowserNotification(notification: Notification): Promise<void> {
    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      const browserNotification = new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.notification_id,
        requireInteraction: notification.priority === 'urgent',
      });

      browserNotification.onclick = () => {
        window.focus();
        if (notification.action_url) {
          window.location.href = notification.action_url;
        }
        browserNotification.close();
      };

      // Auto close after 5 seconds for non-urgent notifications
      if (notification.priority !== 'urgent') {
        setTimeout(() => {
          browserNotification.close();
        }, 5000);
      }
    }
  }

  // Request notification permission
  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission;
    }

    return Notification.permission;
  }

  // Update unread count cache
  private updateUnreadCountCache(count: number): void {
    // Store in localStorage for persistence
    localStorage.setItem('notification_unread_count', count.toString());
    
    // Update page title with unread count
    this.updatePageTitle(count);
  }

  // Update page title with unread count
  private updatePageTitle(unreadCount: number): void {
    const baseTitle = 'AI Resume Analyzer';
    document.title = unreadCount > 0 ? `(${unreadCount}) ${baseTitle}` : baseTitle;
  }

  // Get cached unread count
  getCachedUnreadCount(): number {
    const cached = localStorage.getItem('notification_unread_count');
    return cached ? parseInt(cached, 10) : 0;
  }

  // Check connection status
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  // Get connection state
  getConnectionState(): string {
    if (!this.ws) return 'disconnected';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      case WebSocket.CLOSING:
        return 'closing';
      case WebSocket.CLOSED:
        return 'closed';
      default:
        return 'unknown';
    }
  }

  // Initialize real-time notifications
  async initialize(): Promise<void> {
    try {
      // Request notification permission
      await this.requestNotificationPermission();
      
      // Connect to WebSocket
      await this.connect();
      
      // Load initial unread count
      const { unread_count } = await notificationService.getUnreadCount();
      this.updateUnreadCountCache(unread_count);
      
    } catch (error) {
      console.error('Failed to initialize real-time notifications:', error);
      throw error;
    }
  }

  // Cleanup
  cleanup(): void {
    this.disconnect();
    this.eventHandlers = [];
    this.shouldReconnect = false;
  }
}

export const realTimeNotificationService = new RealTimeNotificationService();