#!/usr/bin/env tsx
/**
 * Generate sitemap.xml for the website
 * Run with: npm run generate:sitemap
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { generateSitemapEntries, generateSitemapXML, generateRobotsTxt } from '../src/utils/sitemap';

const PUBLIC_DIR = join(__dirname, '../public');

function main() {
  console.log('🗺️  Generating sitemap...');

  try {
    // Generate sitemap entries
    const entries = generateSitemapEntries({
      baseUrl: process.env.VITE_SITE_URL || 'https://talentfit-ai.com',
      languages: ['vi', 'en'],
      defaultLanguage: 'vi',
    });

    console.log(`✅ Generated ${entries.length} sitemap entries`);

    // Generate XML
    const sitemapXML = generateSitemapXML(entries);

    // Write sitemap.xml
    const sitemapPath = join(PUBLIC_DIR, 'sitemap.xml');
    writeFileSync(sitemapPath, sitemapXML, 'utf-8');
    console.log(`✅ Sitemap written to: ${sitemapPath}`);

    // Generate robots.txt
    const robotsTxt = generateRobotsTxt({
      baseUrl: process.env.VITE_SITE_URL || 'https://talentfit-ai.com',
    });

    const robotsPath = join(PUBLIC_DIR, 'robots.txt');
    writeFileSync(robotsPath, robotsTxt, 'utf-8');
    console.log(`✅ Robots.txt written to: ${robotsPath}`);

    console.log('🎉 Sitemap generation complete!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main();
