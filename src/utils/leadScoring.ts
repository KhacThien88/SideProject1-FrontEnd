/**
 * Lead Scoring and Qualification System
 * Scores and qualifies leads based on various criteria
 */

import type { DemoRequestData } from '../components/forms/DemoRequestForm';
import type { ContactFormData } from '../components/forms/ContactForm';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface LeadScore {
  total: number;
  breakdown: {
    demographic: number;
    behavioral: number;
    engagement: number;
    firmographic: number;
  };
  grade: 'A' | 'B' | 'C' | 'D';
  qualification: 'Hot' | 'Warm' | 'Cold';
  priority: 'High' | 'Medium' | 'Low';
}

export interface LeadData {
  email: string;
  name?: string;
  company?: string;
  companySize?: string;
  phone?: string;
  source: 'newsletter' | 'demo' | 'contact' | 'signup';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface BehavioralData {
  pageViews: number;
  timeOnSite: number;
  ctaClicks: number;
  formSubmissions: number;
  videoWatches: number;
  downloadedResources: number;
  returnVisits: number;
}

// ============================================================================
// Lead Scoring Engine
// ============================================================================

export class LeadScoringEngine {
  private readonly SCORE_WEIGHTS = {
    demographic: 0.25,
    behavioral: 0.35,
    engagement: 0.25,
    firmographic: 0.15,
  };

  /**
   * Calculate comprehensive lead score
   */
  calculateScore(lead: LeadData, behavioral?: BehavioralData): LeadScore {
    const demographic = this.scoreDemographic(lead);
    const behavioralScore = behavioral ? this.scoreBehavioral(behavioral) : 0;
    const engagement = this.scoreEngagement(lead, behavioral);
    const firmographic = this.scoreFirmographic(lead);

    const total = Math.round(
      demographic * this.SCORE_WEIGHTS.demographic +
      behavioralScore * this.SCORE_WEIGHTS.behavioral +
      engagement * this.SCORE_WEIGHTS.engagement +
      firmographic * this.SCORE_WEIGHTS.firmographic
    );

    return {
      total,
      breakdown: {
        demographic,
        behavioral: behavioralScore,
        engagement,
        firmographic,
      },
      grade: this.getGrade(total),
      qualification: this.getQualification(total),
      priority: this.getPriority(total, lead.source),
    };
  }

  /**
   * Score demographic information
   */
  private scoreDemographic(lead: LeadData): number {
    let score = 0;

    // Has name
    if (lead.name) score += 20;

    // Has company
    if (lead.company) score += 30;

    // Has phone
    if (lead.phone) score += 20;

    // Email domain quality
    if (lead.email) {
      const domain = lead.email.split('@')[1];
      if (domain && !this.isFreeEmailProvider(domain)) {
        score += 30; // Business email
      }
    }

    return Math.min(score, 100);
  }

  /**
   * Score behavioral data
   */
  private scoreBehavioral(behavioral: BehavioralData): number {
    let score = 0;

    // Page views (max 20 points)
    score += Math.min(behavioral.pageViews * 2, 20);

    // Time on site (max 20 points)
    const minutesOnSite = behavioral.timeOnSite / 60;
    score += Math.min(minutesOnSite * 4, 20);

    // CTA clicks (max 20 points)
    score += Math.min(behavioral.ctaClicks * 5, 20);

    // Form submissions (max 15 points)
    score += Math.min(behavioral.formSubmissions * 7.5, 15);

    // Video watches (max 15 points)
    score += Math.min(behavioral.videoWatches * 7.5, 15);

    // Downloaded resources (max 10 points)
    score += Math.min(behavioral.downloadedResources * 5, 10);

    return Math.min(score, 100);
  }

  /**
   * Score engagement level
   */
  private scoreEngagement(lead: LeadData, behavioral?: BehavioralData): number {
    let score = 0;

    // Source quality
    switch (lead.source) {
      case 'demo':
        score += 40; // Highest intent
        break;
      case 'contact':
        score += 30;
        break;
      case 'signup':
        score += 25;
        break;
      case 'newsletter':
        score += 15;
        break;
    }

    // Return visits
    if (behavioral && behavioral.returnVisits > 0) {
      score += Math.min(behavioral.returnVisits * 10, 30);
    }

    // Recency (within last hour = higher score)
    const hoursSinceCapture = (Date.now() - lead.timestamp.getTime()) / (1000 * 60 * 60);
    if (hoursSinceCapture < 1) {
      score += 30;
    } else if (hoursSinceCapture < 24) {
      score += 20;
    } else if (hoursSinceCapture < 168) { // 1 week
      score += 10;
    }

    return Math.min(score, 100);
  }

  /**
   * Score firmographic data (company information)
   */
  private scoreFirmographic(lead: LeadData): number {
    let score = 0;

    if (!lead.companySize) {
      return 0;
    }

    // Company size scoring
    switch (lead.companySize) {
      case '501+':
        score += 40; // Enterprise
        break;
      case '201-500':
        score += 35;
        break;
      case '51-200':
        score += 30;
        break;
      case '11-50':
        score += 20;
        break;
      case '1-10':
        score += 10;
        break;
    }

    // Has company name
    if (lead.company) {
      score += 30;
    }

    // Industry indicators (could be enhanced with industry data)
    if (lead.metadata?.industry) {
      score += 30;
    }

    return Math.min(score, 100);
  }

  /**
   * Get letter grade from score
   */
  private getGrade(score: number): 'A' | 'B' | 'C' | 'D' {
    if (score >= 80) return 'A';
    if (score >= 60) return 'B';
    if (score >= 40) return 'C';
    return 'D';
  }

  /**
   * Get qualification status
   */
  private getQualification(score: number): 'Hot' | 'Warm' | 'Cold' {
    if (score >= 70) return 'Hot';
    if (score >= 40) return 'Warm';
    return 'Cold';
  }

  /**
   * Get priority level
   */
  private getPriority(score: number, source: string): 'High' | 'Medium' | 'Low' {
    // Demo requests are always high priority
    if (source === 'demo' && score >= 50) return 'High';
    
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  }

  /**
   * Check if email domain is a free provider
   */
  private isFreeEmailProvider(domain: string): boolean {
    const freeProviders = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com',
      'mail.com',
      'protonmail.com',
    ];
    return freeProviders.includes(domain.toLowerCase());
  }
}

// ============================================================================
// Lead Qualification Helper Functions
// ============================================================================

/**
 * Convert demo request to lead data
 */
export const demoRequestToLead = (data: DemoRequestData): LeadData => ({
  email: data.email,
  name: data.name,
  company: data.company,
  companySize: data.companySize,
  phone: data.phone,
  source: 'demo',
  timestamp: new Date(),
  metadata: {
    message: data.message,
  },
});

/**
 * Convert contact form to lead data
 */
export const contactFormToLead = (data: ContactFormData): LeadData => ({
  email: data.email,
  name: data.name,
  source: 'contact',
  timestamp: new Date(),
  metadata: {
    subject: data.subject,
    message: data.message,
  },
});

/**
 * Convert newsletter signup to lead data
 */
export const newsletterToLead = (email: string): LeadData => ({
  email,
  source: 'newsletter',
  timestamp: new Date(),
});

/**
 * Determine if lead should trigger immediate notification
 */
export const shouldNotifyImmediately = (score: LeadScore, source: string): boolean => {
  // Always notify for hot leads
  if (score.qualification === 'Hot') return true;
  
  // Always notify for demo requests with decent score
  if (source === 'demo' && score.total >= 50) return true;
  
  // Notify for high-priority leads
  if (score.priority === 'High') return true;
  
  return false;
};

/**
 * Generate lead summary for notifications
 */
export const generateLeadSummary = (lead: LeadData, score: LeadScore): string => {
  const parts = [
    `New ${score.qualification} Lead (Score: ${score.total})`,
    lead.name ? `Name: ${lead.name}` : null,
    lead.company ? `Company: ${lead.company}` : null,
    lead.companySize ? `Size: ${lead.companySize}` : null,
    `Source: ${lead.source}`,
    `Priority: ${score.priority}`,
  ].filter(Boolean);

  return parts.join(' | ');
};

// ============================================================================
// Global Instance
// ============================================================================

export const leadScoringEngine = new LeadScoringEngine();
