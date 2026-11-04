import fs from 'node:fs';
import path from 'node:path';
import { projectsData } from '../src/data/projects.js';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dhikamahesa.vercel.app';
const publicDir = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate sitemap.xml
function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
    { loc: `${siteUrl}/`, lastmod: currentDate, changefreq: 'weekly', priority: '1.0' },
    { loc: `${siteUrl}/cv.pdf`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' }
  ];

  for (const project of projectsData) {
    urls.push({
      loc: `${siteUrl}/projects/${project.slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    });
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
}

// 2. Generate robots.txt
function generateRobots() {
  const robotsTxt = `# Allow all standard crawlers
User-agent: *
Allow: /

# Host & Sitemap specification
Host: ${siteUrl}
Sitemap: ${siteUrl}/sitemap.xml
`;

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
  console.log('Generated robots.txt.');
}

// 3. Generate Open Graph banner SVG/image
function generateOgImage() {
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="og-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080d1a" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="emerald-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#og-bg)" />
  <rect x="0" y="0" width="1200" height="8" fill="url(#emerald-accent)" />

  <!-- Grid decoration -->
  <g opacity="0.05" stroke="#ffffff" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="630" />
    <line x1="300" y1="0" x2="300" y2="630" />
    <line x1="500" y1="0" x2="500" y2="630" />
    <line x1="700" y1="0" x2="700" y2="630" />
    <line x1="900" y1="0" x2="900" y2="630" />
    <line x1="1100" y1="0" x2="1100" y2="630" />
    <line x1="0" y1="150" x2="1200" y2="150" />
    <line x1="0" y1="300" x2="1200" y2="300" />
    <line x1="0" y1="450" x2="1200" y2="450" />
  </g>

  <!-- Tag / Role -->
  <rect x="90" y="90" width="220" height="38" rx="6" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1.5" />
  <text x="110" y="115" fill="#34d399" font-family="'Courier New', monospace" font-size="16" font-weight="bold">AI ENGINEER PORTFOLIO</text>

  <!-- Main Headline & Name -->
  <text x="90" y="210" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="bold">
    Dhika Mahesa Syaputra, S.Kom.
  </text>
  <text x="90" y="260" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="500">
    LLM applications, agentic RAG, computer vision
  </text>
  <text x="90" y="320" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22">
    "I build LLM and computer-vision systems that ship."
  </text>

  <!-- Metric Badges -->
  <g transform="translate(90, 390)">
    <!-- Metric 1 -->
    <rect x="0" y="0" width="310" height="120" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
    <text x="25" y="52" fill="#10b981" font-family="'Courier New', monospace" font-size="36" font-weight="bold">99.4%</text>
    <text x="25" y="80" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="600">mAP@0.5 YOLOv8</text>
    <text x="25" y="100" fill="#64748b" font-family="monospace" font-size="12">15,182 trees, 230 test images</text>

    <!-- Metric 2 -->
    <rect x="340" y="0" width="310" height="120" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
    <text x="365" y="52" fill="#38bdf8" font-family="'Courier New', monospace" font-size="36" font-weight="bold">88.32%</text>
    <text x="365" y="80" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="600">Test Accuracy</text>
    <text x="365" y="100" fill="#64748b" font-family="monospace" font-size="12">Thesis Moon-Phase TFLite</text>

    <!-- Metric 3 -->
    <rect x="680" y="0" width="310" height="120" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
    <text x="705" y="52" fill="#fbbf24" font-family="'Courier New', monospace" font-size="36" font-weight="bold">3.88</text>
    <text x="705" y="80" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="600">Final GPA / 4.00</text>
    <text x="705" y="100" fill="#64748b" font-family="monospace" font-size="12">Universitas Riau (S.Kom.)</text>
  </g>

  <!-- Footer link -->
  <text x="90" y="580" fill="#64748b" font-family="monospace" font-size="15">Padang, Indonesia • Open to full-time AI roles &amp; research collaboration</text>
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'og-image.svg'), ogSvg, 'utf8');
  console.log('Generated og-image.svg.');
}

generateSitemap();
generateRobots();
generateOgImage();
