/**
 * Content Management System
 * Provides easy content updates, preview, versioning, and approval workflows
 */

import { errorMonitor } from './errorMonitoring';

export interface ContentVersion {
  id: string;
  content: any;
  author: string;
  timestamp: number;
  message: string;
  status: 'draft' | 'pending' | 'approved' | 'published';
}

export interface ContentApproval {
  versionId: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  timestamp: number;
}

export interface ContentMetadata {
  key: string;
  locale: string;
  lastModified: number;
  lastAuthor: string;
  versions: ContentVersion[];
  approvals: ContentApproval[];
}

/**
 * Content Manager Class
 */
export class ContentManager {
  private static instance: ContentManager;
  private content: Map<string, any> = new Map();
  private metadata: Map<string, ContentMetadata> = new Map();
  private previewMode: boolean = false;
  private previewContent: Map<string, any> = new Map();

  private constructor() {
    this.loadContent();
  }

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  /**
   * Load content from storage
   */
  private loadContent(): void {
    if (typeof localStorage === 'undefined') return;

    try {
      const stored = localStorage.getItem('cms_content');
      if (stored) {
        const data = JSON.parse(stored);
        this.content = new Map(Object.entries(data.content || {}));
        this.metadata = new Map(Object.entries(data.metadata || {}));
      }
    } catch (error) {
      errorMonitor.captureError(error as Error, {
        component: 'ContentManager',
        action: 'loadContent',
      });
    }
  }

  /**
   * Save content to storage
   */
  private saveContent(): void {
    if (typeof localStorage === 'undefined') return;

    try {
      const data = {
        content: Object.fromEntries(this.content),
        metadata: Object.fromEntries(this.metadata),
      };
      localStorage.setItem('cms_content', JSON.stringify(data));
    } catch (error) {
      errorMonitor.captureError(error as Error, {
        component: 'ContentManager',
        action: 'saveContent',
      });
    }
  }

  /**
   * Get content by key
   */
  getContent(key: string, locale: string = 'en'): any {
    const fullKey = `${locale}.${key}`;

    // Return preview content if in preview mode
    if (this.previewMode && this.previewContent.has(fullKey)) {
      return this.previewContent.get(fullKey);
    }

    return this.content.get(fullKey);
  }

  /**
   * Update content
   */
  updateContent(
    key: string,
    value: any,
    locale: string = 'en',
    author: string = 'system',
    message: string = 'Content updated'
  ): void {
    const fullKey = `${locale}.${key}`;
    const oldValue = this.content.get(fullKey);

    // Create version
    const version: ContentVersion = {
      id: this.generateId(),
      content: value,
      author,
      timestamp: Date.now(),
      message,
      status: 'draft',
    };

    // Update metadata
    const metadata = this.metadata.get(fullKey) || {
      key,
      locale,
      lastModified: Date.now(),
      lastAuthor: author,
      versions: [],
      approvals: [],
    };

    metadata.versions.push(version);
    metadata.lastModified = Date.now();
    metadata.lastAuthor = author;

    this.metadata.set(fullKey, metadata);

    // Update content
    this.content.set(fullKey, value);
    this.saveContent();

    // Log change
    console.log(`📝 Content updated: ${fullKey}`, {
      old: oldValue,
      new: value,
      author,
      message,
    });
  }

  /**
   * Delete content
   */
  deleteContent(key: string, locale: string = 'en'): void {
    const fullKey = `${locale}.${key}`;
    this.content.delete(fullKey);
    this.metadata.delete(fullKey);
    this.saveContent();
  }

  /**
   * Get content metadata
   */
  getMetadata(key: string, locale: string = 'en'): ContentMetadata | undefined {
    const fullKey = `${locale}.${key}`;
    return this.metadata.get(fullKey);
  }

  /**
   * Get all content keys
   */
  getAllKeys(locale?: string): string[] {
    const keys: string[] = [];

    this.content.forEach((_, key) => {
      if (!locale || key.startsWith(`${locale}.`)) {
        keys.push(key);
      }
    });

    return keys;
  }

  /**
   * Get content version
   */
  getVersion(key: string, versionId: string, locale: string = 'en'): ContentVersion | undefined {
    const fullKey = `${locale}.${key}`;
    const metadata = this.metadata.get(fullKey);

    if (!metadata) return undefined;

    return metadata.versions.find(v => v.id === versionId);
  }

  /**
   * Restore version
   */
  restoreVersion(key: string, versionId: string, locale: string = 'en', author: string = 'system'): void {
    const version = this.getVersion(key, versionId, locale);

    if (!version) {
      throw new Error(`Version ${versionId} not found`);
    }

    this.updateContent(key, version.content, locale, author, `Restored version ${versionId}`);
  }

  /**
   * Enable preview mode
   */
  enablePreview(): void {
    this.previewMode = true;
    console.log('👁️ Preview mode enabled');
  }

  /**
   * Disable preview mode
   */
  disablePreview(): void {
    this.previewMode = false;
    this.previewContent.clear();
    console.log('👁️ Preview mode disabled');
  }

  /**
   * Set preview content
   */
  setPreviewContent(key: string, value: any, locale: string = 'en'): void {
    const fullKey = `${locale}.${key}`;
    this.previewContent.set(fullKey, value);
  }

  /**
   * Is preview mode active
   */
  isPreviewMode(): boolean {
    return this.previewMode;
  }

  /**
   * Request approval for version
   */
  requestApproval(key: string, versionId: string, locale: string = 'en'): void {
    const fullKey = `${locale}.${key}`;
    const metadata = this.metadata.get(fullKey);

    if (!metadata) {
      throw new Error(`Content ${fullKey} not found`);
    }

    const version = metadata.versions.find(v => v.id === versionId);

    if (!version) {
      throw new Error(`Version ${versionId} not found`);
    }

    version.status = 'pending';

    const approval: ContentApproval = {
      versionId,
      approver: '',
      status: 'pending',
      timestamp: Date.now(),
    };

    metadata.approvals.push(approval);
    this.metadata.set(fullKey, metadata);
    this.saveContent();

    console.log(`📋 Approval requested for ${fullKey} version ${versionId}`);
  }

  /**
   * Approve version
   */
  approveVersion(
    key: string,
    versionId: string,
    approver: string,
    comment?: string,
    locale: string = 'en'
  ): void {
    const fullKey = `${locale}.${key}`;
    const metadata = this.metadata.get(fullKey);

    if (!metadata) {
      throw new Error(`Content ${fullKey} not found`);
    }

    const version = metadata.versions.find(v => v.id === versionId);

    if (!version) {
      throw new Error(`Version ${versionId} not found`);
    }

    version.status = 'approved';

    const approval = metadata.approvals.find(a => a.versionId === versionId && a.status === 'pending');

    if (approval) {
      approval.status = 'approved';
      approval.approver = approver;
      approval.comment = comment;
      approval.timestamp = Date.now();
    }

    this.metadata.set(fullKey, metadata);
    this.saveContent();

    console.log(`✅ Version ${versionId} approved by ${approver}`);
  }

  /**
   * Reject version
   */
  rejectVersion(
    key: string,
    versionId: string,
    approver: string,
    comment: string,
    locale: string = 'en'
  ): void {
    const fullKey = `${locale}.${key}`;
    const metadata = this.metadata.get(fullKey);

    if (!metadata) {
      throw new Error(`Content ${fullKey} not found`);
    }

    const version = metadata.versions.find(v => v.id === versionId);

    if (!version) {
      throw new Error(`Version ${versionId} not found`);
    }

    version.status = 'draft';

    const approval = metadata.approvals.find(a => a.versionId === versionId && a.status === 'pending');

    if (approval) {
      approval.status = 'rejected';
      approval.approver = approver;
      approval.comment = comment;
      approval.timestamp = Date.now();
    }

    this.metadata.set(fullKey, metadata);
    this.saveContent();

    console.log(`❌ Version ${versionId} rejected by ${approver}: ${comment}`);
  }

  /**
   * Publish version
   */
  publishVersion(key: string, versionId: string, locale: string = 'en'): void {
    const fullKey = `${locale}.${key}`;
    const metadata = this.metadata.get(fullKey);

    if (!metadata) {
      throw new Error(`Content ${fullKey} not found`);
    }

    const version = metadata.versions.find(v => v.id === versionId);

    if (!version) {
      throw new Error(`Version ${versionId} not found`);
    }

    if (version.status !== 'approved') {
      throw new Error(`Version ${versionId} must be approved before publishing`);
    }

    version.status = 'published';
    this.content.set(fullKey, version.content);
    this.metadata.set(fullKey, metadata);
    this.saveContent();

    console.log(`🚀 Version ${versionId} published`);
  }

  /**
   * Get pending approvals
   */
  getPendingApprovals(): Array<{ key: string; version: ContentVersion; metadata: ContentMetadata }> {
    const pending: Array<{ key: string; version: ContentVersion; metadata: ContentMetadata }> = [];

    this.metadata.forEach((metadata, key) => {
      metadata.versions.forEach(version => {
        if (version.status === 'pending') {
          pending.push({ key, version, metadata });
        }
      });
    });

    return pending;
  }

  /**
   * Export content
   */
  exportContent(locale?: string): string {
    const data: Record<string, any> = {};

    this.content.forEach((value, key) => {
      if (!locale || key.startsWith(`${locale}.`)) {
        data[key] = value;
      }
    });

    return JSON.stringify(data, null, 2);
  }

  /**
   * Import content
   */
  importContent(data: string, author: string = 'system'): void {
    try {
      const parsed = JSON.parse(data);

      Object.entries(parsed).forEach(([key, value]) => {
        const [locale, ...keyParts] = key.split('.');
        const contentKey = keyParts.join('.');
        this.updateContent(contentKey, value, locale, author, 'Imported content');
      });

      console.log('📥 Content imported successfully');
    } catch (error) {
      errorMonitor.captureError(error as Error, {
        component: 'ContentManager',
        action: 'importContent',
      });
      throw error;
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clear all content
   */
  clearAll(): void {
    this.content.clear();
    this.metadata.clear();
    this.previewContent.clear();
    this.saveContent();
  }
}

/**
 * Multi-language Content Manager
 */
export class MultiLanguageContentManager {
  private static instance: MultiLanguageContentManager;
  private contentManager: ContentManager;
  private supportedLocales: string[] = ['en', 'vi'];
  private defaultLocale: string = 'en';

  private constructor() {
    this.contentManager = ContentManager.getInstance();
  }

  static getInstance(): MultiLanguageContentManager {
    if (!MultiLanguageContentManager.instance) {
      MultiLanguageContentManager.instance = new MultiLanguageContentManager();
    }
    return MultiLanguageContentManager.instance;
  }

  /**
   * Set supported locales
   */
  setSupportedLocales(locales: string[]): void {
    this.supportedLocales = locales;
  }

  /**
   * Set default locale
   */
  setDefaultLocale(locale: string): void {
    this.defaultLocale = locale;
  }

  /**
   * Get content for all locales
   */
  getContentAllLocales(key: string): Record<string, any> {
    const result: Record<string, any> = {};

    this.supportedLocales.forEach(locale => {
      result[locale] = this.contentManager.getContent(key, locale);
    });

    return result;
  }

  /**
   * Update content for all locales
   */
  updateContentAllLocales(
    key: string,
    values: Record<string, any>,
    author: string = 'system',
    message: string = 'Multi-language update'
  ): void {
    Object.entries(values).forEach(([locale, value]) => {
      if (this.supportedLocales.includes(locale)) {
        this.contentManager.updateContent(key, value, locale, author, message);
      }
    });
  }

  /**
   * Check if content exists in all locales
   */
  hasContentInAllLocales(key: string): boolean {
    return this.supportedLocales.every(locale => {
      const content = this.contentManager.getContent(key, locale);
      return content !== undefined && content !== null;
    });
  }

  /**
   * Get missing translations
   */
  getMissingTranslations(): Array<{ key: string; missingLocales: string[] }> {
    const missing: Array<{ key: string; missingLocales: string[] }> = [];
    const allKeys = new Set<string>();

    // Collect all unique keys
    this.supportedLocales.forEach(locale => {
      const keys = this.contentManager.getAllKeys(locale);
      keys.forEach(fullKey => {
        const key = fullKey.replace(`${locale}.`, '');
        allKeys.add(key);
      });
    });

    // Check each key for missing translations
    allKeys.forEach(key => {
      const missingLocales: string[] = [];

      this.supportedLocales.forEach(locale => {
        const content = this.contentManager.getContent(key, locale);
        if (content === undefined || content === null) {
          missingLocales.push(locale);
        }
      });

      if (missingLocales.length > 0) {
        missing.push({ key, missingLocales });
      }
    });

    return missing;
  }

  /**
   * Sync content from default locale to other locales
   */
  syncFromDefaultLocale(key: string, author: string = 'system'): void {
    const defaultContent = this.contentManager.getContent(key, this.defaultLocale);

    if (!defaultContent) {
      throw new Error(`Content ${key} not found in default locale ${this.defaultLocale}`);
    }

    this.supportedLocales.forEach(locale => {
      if (locale !== this.defaultLocale) {
        const existingContent = this.contentManager.getContent(key, locale);
        if (!existingContent) {
          this.contentManager.updateContent(
            key,
            defaultContent,
            locale,
            author,
            `Synced from ${this.defaultLocale}`
          );
        }
      }
    });
  }
}

/**
 * Export singleton instances
 */
export const contentManager = ContentManager.getInstance();
export const multiLangContentManager = MultiLanguageContentManager.getInstance();
