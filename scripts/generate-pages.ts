import fs from 'node:fs';
import path from 'node:path';
import { profileData } from '../src/data/profile.js';
import { skillCategories } from '../src/data/skills.js';
import { projectsData } from '../src/data/projects.js';
import { researchData } from '../src/data/research.js';
import { experienceData } from '../src/data/experience.js';
import { timelineData } from '../src/data/timeline.js';
import { certificationsData } from '../src/data/certifications.js';
import { renderWithTodo, isTodoPlaceholder } from '../src/utils/todo.js';

const isDev = process.env.NODE_ENV !== 'production';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dhikamahesa.vercel.app';
const publicDir = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Common HTML Head template
function renderHead(
  title: string,
  description: string,
  canonicalPath: string = '',
  ogImage: string = '/og-image.svg'
): string {
  const fullCanonical = `${siteUrl}${canonicalPath}`;
  const personJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profileData.name,
    honorificSuffix: profileData.degree,
    jobTitle: 'AI Engineer',
    description: profileData.hero.subheadline,
    url: siteUrl,
    email: `mailto:${profileData.email}`,
    sameAs: [profileData.linkedin, profileData.github],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: profileData.education.institution,
      department: profileData.education.department
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Large Language Models',
      'Retrieval-Augmented Generation',
      'Computer Vision',
      'Deep Learning',
      'YOLOv8',
      'TensorFlow Lite'
    ]
  });

  return `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="author" content="${profileData.fullName}" />
  <link rel="canonical" href="${fullCanonical}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${fullCanonical}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${siteUrl}${ogImage}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${fullCanonical}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${siteUrl}${ogImage}" />

  <!-- Theme color & Icons -->
  <meta name="theme-color" content="#080d1a" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />

  <!-- Styles -->
  <link rel="stylesheet" href="/css/main.css" />

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  ${personJsonLd}
  </script>

  <!-- Alpine.js inline initialization for theme and reactivity -->
  <script>
    // Immediate theme initialization to prevent flash of wrong theme (FOUC)
    (function() {
      try {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  </script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
  `;
}

// Sticky Navigation Component
function renderNav(_activeSection: string = 'home', isSubpage: boolean = false): string {
  const homePrefix = isSubpage ? '/' : '';
  return `
  <header
    x-data="{
      mobileMenuOpen: false,
      theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
      toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        if (this.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }"
    class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-[#080d1a]/85 border-b border-border-light dark:border-border-dark transition-colors"
    role="banner"
  >
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo / Name -->
      <a href="${homePrefix}#" class="group flex items-center gap-2.5 text-text-primary dark:text-slate-100 font-semibold text-sm sm:text-base tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1">
        <span class="w-2.5 h-2.5 rounded-full bg-accent group-hover:scale-125 transition-transform duration-200"></span>
        <span class="font-mono tracking-tight font-bold text-slate-900 dark:text-white">dhika.ai</span>
        <span class="hidden sm:inline-block text-xs font-mono text-slate-500 dark:text-slate-400">/ portfolio</span>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-300" aria-label="Main navigation">
        <a href="${homePrefix}#about" class="hover:text-accent transition-colors py-1 focus-visible:ring-1 focus-visible:ring-accent rounded">About</a>
        <a href="${homePrefix}#skills" class="hover:text-accent transition-colors py-1 focus-visible:ring-1 focus-visible:ring-accent rounded">Skills</a>
        <a href="${homePrefix}#projects" class="hover:text-accent transition-colors py-1 focus-visible:ring-1 focus-visible:ring-accent rounded">Projects</a>
        <a href="${homePrefix}#research" class="hover:text-accent transition-colors py-1 focus-visible:ring-1 focus-visible:ring-accent rounded">Research</a>
        <a href="${homePrefix}#timeline" class="hover:text-accent transition-colors py-1 focus-visible:ring-1 focus-visible:ring-accent rounded">Timeline</a>
        <a href="${homePrefix}#contact" class="hover:text-accent transition-colors py-1 focus-visible:ring-1 focus-visible:ring-accent rounded">Contact</a>
      </nav>

      <!-- Right Actions: GitHub, Theme Toggle & CV Download -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- GitHub Link -->
        <a
          href="${profileData.github}"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="GitHub Profile (opens in new tab)"
          title="GitHub: github.com/dhika-mahesa-s"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
        </a>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme()"
          type="button"
          class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Toggle dark/light theme"
        >
          <!-- Moon icon for light mode (shows when dark is off) -->
          <svg x-show="theme === 'light'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <!-- Sun icon for dark mode (shows when dark is on) -->
          <svg x-show="theme === 'dark'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display: none;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>

        <!-- Download CV CTA -->
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-accent/40 bg-accent/10 text-emerald-700 dark:text-accent hover:bg-accent hover:text-slate-950 transition-all focus-visible:ring-2 focus-visible:ring-accent"
          title="Download public CV (PDF)"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>CV.pdf</span>
        </a>

        <!-- Mobile Drawer Hamburger -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          type="button"
          class="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <svg x-show="!mobileMenuOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg x-show="mobileMenuOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display: none;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Overlay & Menu -->
    <div
      x-show="mobileMenuOpen"
      x-transition:enter="transition ease-out duration-200"
      x-transition:enter-start="opacity-0 -translate-y-4"
      x-transition:enter-end="opacity-100 translate-y-0"
      x-transition:leave="transition ease-in duration-150"
      x-transition:leave-start="opacity-100 translate-y-0"
      x-transition:leave-end="opacity-0 -translate-y-4"
      @click.away="mobileMenuOpen = false"
      class="md:hidden border-b border-border-light dark:border-border-dark bg-white dark:bg-[#0c1324] px-4 pt-2 pb-6 space-y-3"
      style="display: none;"
    >
      <nav class="flex flex-col space-y-2 pt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <a @click="mobileMenuOpen = false" href="${homePrefix}#about" class="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">About</a>
        <a @click="mobileMenuOpen = false" href="${homePrefix}#skills" class="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Skills</a>
        <a @click="mobileMenuOpen = false" href="${homePrefix}#projects" class="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Projects</a>
        <a @click="mobileMenuOpen = false" href="${homePrefix}#research" class="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Research</a>
        <a @click="mobileMenuOpen = false" href="${homePrefix}#timeline" class="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Timeline</a>
        <a @click="mobileMenuOpen = false" href="${homePrefix}#certifications" class="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Certifications</a>
        <a @click="mobileMenuOpen = false" href="${homePrefix}#contact" class="px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Contact</a>
        <a href="${profileData.github}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          <span>GitHub: dhika-mahesa-s</span>
        </a>
        <div class="pt-2">
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-accent text-slate-950 font-medium text-sm">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download CV (PDF)</span>
          </a>
        </div>
      </nav>
    </div>
  </header>
  `;
}

// Hero Section Component
function renderHero(): string {
  const stats = profileData.hero.stats;
  return `
  <section class="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-border-light dark:border-border-dark" aria-labelledby="hero-heading">
    <!-- Subtle background grid aesthetic -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" style="background-image: radial-gradient(#10b981 1px, transparent 1px); background-size: 24px 24px;"></div>

    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Status pill -->
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-mono mb-6">
        <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
        <span>Open to full-time AI roles & research collaboration</span>
      </div>

      <!-- Identity & Headline -->
      <div class="space-y-4 max-w-3xl">
        <div class="space-y-1">
          <h1 id="hero-heading" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            ${profileData.hero.headline}
          </h1>
        </div>

        <p class="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          ${profileData.hero.subheadline}
        </p>

        <!-- Profile metadata pill list -->
        <div class="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            ${profileData.fullName}
          </span>
          <span class="text-slate-300 dark:text-slate-700">•</span>
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ${profileData.location}
          </span>
          <span class="text-slate-300 dark:text-slate-700">•</span>
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
            Universitas Riau (GPA ${profileData.education.gpa}/${profileData.education.maxGpa})
          </span>
        </div>

        <!-- Hero CTAs -->
        <div class="flex flex-wrap items-center gap-3 pt-6">
          <a
            href="#projects"
            class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-accent text-slate-950 font-medium text-sm hover:bg-emerald-400 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>View projects</span>
            <svg class="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 font-medium text-sm hover:border-accent hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg class="w-4 h-4 mr-1.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download CV</span>
          </a>

          <a
            href="#contact"
            class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-accent font-medium text-sm transition-colors focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Contact Dhika →</span>
          </a>
        </div>
      </div>

      <!-- Animated Stat Counters -->
      <div
        x-data="{
          hasAnimated: false,
          counters: [
            { target: ${stats[0].value}, current: 0, decimals: 1, suffix: '%', label: '${stats[0].label}', sublabel: '${stats[0].sublabel}' },
            { target: ${stats[1].value}, current: 0, decimals: 2, suffix: '%', label: '${stats[1].label}', sublabel: '${stats[1].sublabel}' },
            { target: ${stats[2].value}, current: 0, decimals: 2, suffix: ' / 4.00', label: '${stats[2].label}', sublabel: '${stats[2].sublabel}' }
          ],
          init() {
            const observer = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting && !this.hasAnimated) {
                this.hasAnimated = true;
                this.animateCounters();
              }
            }, { threshold: 0.2 });
            observer.observe(this.$el);
          },
          animateCounters() {
            const duration = 1200;
            const startTime = performance.now();
            const step = (now) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
              this.counters.forEach(c => {
                c.current = (c.target * easeProgress).toFixed(c.decimals);
              });
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                this.counters.forEach(c => {
                  c.current = c.target.toFixed(c.decimals);
                });
              }
            };
            requestAnimationFrame(step);
          }
        }"
        class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 pt-8 border-t border-border-light dark:border-border-dark"
      >
        <template x-for="(counter, idx) in counters" :key="idx">
          <div class="tech-card p-5 relative overflow-hidden group">
            <div class="flex items-baseline gap-1">
              <span class="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-accent tracking-tight" x-text="counter.current"></span>
              <span class="text-lg sm:text-xl font-mono font-bold text-accent" x-text="counter.suffix"></span>
            </div>
            <div class="mt-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100" x-text="counter.label"></div>
            <div class="mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono" x-text="counter.sublabel"></div>
          </div>
        </template>
      </div>
    </div>
  </section>
  `;
}

// About Section Component
function renderAbout(): string {
  const paragraphs = profileData.about.paragraphs;
  const focusChips = profileData.about.focusAreas;

  return `
  <section id="about" class="py-16 md:py-24 border-b border-border-light dark:border-border-dark" aria-labelledby="about-heading">
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 mb-8">
        <span class="font-mono text-xs text-accent font-semibold tracking-wider uppercase">// 01. ABOUT</span>
        <div class="h-px bg-border-light dark:bg-border-dark flex-grow"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <!-- Main Narrative: Three short paragraphs under 130 words in total -->
        <div class="lg:col-span-7 space-y-4">
          <h2 id="about-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering reliable AI from models to production edges
          </h2>

          <div class="space-y-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>${paragraphs[0]}</p>
            <p>${paragraphs[1]}</p>
            <p>${paragraphs[2]}</p>
          </div>

          <!-- Focus Area Chips -->
          <div class="pt-4">
            <h3 class="text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider">
              Core Focus Areas
            </h3>
            <div class="flex flex-wrap gap-2">
              ${focusChips
                .map(
                  (chip) => `
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 hover:border-accent/40 transition-colors">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent mr-2"></span>
                  ${chip}
                </span>`
                )
                .join('')}
            </div>
          </div>
        </div>

        <!-- Quick Facts Panel -->
        <div class="lg:col-span-5">
          <div class="tech-card p-6 space-y-4">
            <h3 class="text-sm font-mono font-semibold uppercase text-accent tracking-wider border-b border-border-light dark:border-border-dark pb-3">
              Quick Facts
            </h3>

            <div class="space-y-3 text-xs sm:text-sm">
              <div>
                <span class="text-slate-500 dark:text-slate-400 font-mono text-xs block">Education</span>
                <span class="font-medium text-slate-900 dark:text-slate-100">
                  ${profileData.education.degree}, ${profileData.education.institution}
                </span>
                <span class="text-slate-500 dark:text-slate-400 text-xs block font-mono">
                  ${profileData.education.department} (${profileData.education.period})
                </span>
                <span class="text-accent text-xs font-mono block">
                  Cumulative GPA: ${profileData.education.gpa} / ${profileData.education.maxGpa}
                </span>
              </div>

              <div>
                <span class="text-slate-500 dark:text-slate-400 font-mono text-xs block">National Award</span>
                <span class="font-medium text-slate-900 dark:text-slate-100">
                  ${profileData.award.title}
                </span>
                <span class="text-slate-500 dark:text-slate-400 text-xs block font-mono">
                  ${profileData.award.issuer}
                </span>
              </div>

              <div>
                <span class="text-slate-500 dark:text-slate-400 font-mono text-xs block">Location</span>
                <span class="font-medium text-slate-900 dark:text-slate-100">
                  ${profileData.location}
                </span>
              </div>

              <div>
                <span class="text-slate-500 dark:text-slate-400 font-mono text-xs block">Languages</span>
                <span class="font-medium text-slate-900 dark:text-slate-100">
                  Indonesian (native), English (${renderWithTodo(profileData.languages[1].proficiency, isDev)})
                </span>
              </div>

              <div>
                <span class="text-slate-500 dark:text-slate-400 font-mono text-xs block">Open To</span>
                <div class="space-y-1 mt-1">
                  ${profileData.openTo
                    .map(
                      (item) => `
                    <div class="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                      <svg class="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                      <span>${item}</span>
                    </div>`
                    )
                    .join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

// Skills Section Component (Tabbed, exactly the 5 categories and approved items)
function renderSkills(): string {
  return `
  <section id="skills" class="py-16 md:py-24 border-b border-border-light dark:border-border-dark" aria-labelledby="skills-heading">
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 mb-8">
        <span class="font-mono text-xs text-accent font-semibold tracking-wider uppercase">// 02. SKILLS</span>
        <div class="h-px bg-border-light dark:bg-border-dark flex-grow"></div>
      </div>

      <div class="mb-8 max-w-2xl">
        <h2 id="skills-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Technical Arsenal
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Specialized stack covering generative AI pipelines, deep computer vision, analytical pipelines, and edge Android deployments.
        </p>
      </div>

      <!-- Tabbed Categories via Alpine.js -->
      <div x-data="{ activeTab: '${skillCategories[0].id}' }" class="space-y-6">
        <!-- Category Tab Buttons -->
        <div class="flex flex-wrap gap-2 border-b border-border-light dark:border-border-dark pb-3" role="tablist" aria-label="Skills categories">
          ${skillCategories
            .map(
              (cat) => `
            <button
              @click="activeTab = '${cat.id}'"
              :class="activeTab === '${cat.id}' ? 'bg-accent text-slate-950 font-semibold border-accent' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-border-light dark:border-border-dark hover:border-accent/40'"
              class="px-4 py-2 rounded-lg text-xs font-mono border transition-all focus-visible:ring-2 focus-visible:ring-accent"
              role="tab"
              :aria-selected="activeTab === '${cat.id}'"
              aria-controls="panel-${cat.id}"
            >
              ${cat.name}
            </button>`
            )
            .join('')}
        </div>

        <!-- Category Tab Panels -->
        ${skillCategories
          .map(
            (cat) => `
          <div
            x-show="activeTab === '${cat.id}'"
            x-transition:enter="transition ease-out duration-150"
            x-transition:enter-start="opacity-0 translate-y-2"
            x-transition:enter-end="opacity-100 translate-y-0"
            id="panel-${cat.id}"
            role="tabpanel"
            class="tech-card p-6"
            style="${cat.id === skillCategories[0].id ? '' : 'display: none;'}"
          >
            <div class="flex items-center justify-between mb-4 pb-2 border-b border-border-light dark:border-border-dark">
              <h3 class="text-sm font-mono font-semibold uppercase text-accent tracking-wider">
                ${cat.name}
              </h3>
              <span class="text-xs font-mono text-slate-500 dark:text-slate-400">
                ${cat.skills.length} verified competencies
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              ${cat.skills
                .map(
                  (skill) => `
                <div class="flex items-center gap-2.5 p-3 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-accent/40 transition-colors">
                  <span class="w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
                  <span class="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 font-mono">
                    ${skill}
                  </span>
                </div>`
                )
                .join('')}
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>
  `;
}

// Projects Section Component (Filter tabs, cards, links to detail pages)
function renderProjects(): string {
  return `
  <section id="projects" class="py-16 md:py-24 border-b border-border-light dark:border-border-dark" aria-labelledby="projects-heading">
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 mb-8">
        <span class="font-mono text-xs text-accent font-semibold tracking-wider uppercase">// 03. PROJECTS</span>
        <div class="h-px bg-border-light dark:bg-border-dark flex-grow"></div>
      </div>

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 id="projects-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Featured Systems & Proof of Impact
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
            Each project features validated empirical benchmarks, reproducible methodologies, and dedicated architectural deep dives.
          </p>
        </div>
      </div>

      <!-- Projects Alpine Filter Component -->
      <div x-data="{ currentFilter: 'all' }" class="space-y-8">
        <!-- Filter Category Tabs -->
        <div class="flex flex-wrap gap-2 border-b border-border-light dark:border-border-dark pb-3">
          <button
            @click="currentFilter = 'all'"
            :class="currentFilter === 'all' ? 'bg-accent text-slate-950 font-semibold border-accent' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-border-light dark:border-border-dark hover:border-accent/40'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all focus-visible:ring-2 focus-visible:ring-accent"
          >
            All Projects (${projectsData.length})
          </button>
          <button
            @click="currentFilter = 'llm-rag'"
            :class="currentFilter === 'llm-rag' ? 'bg-accent text-slate-950 font-semibold border-accent' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-border-light dark:border-border-dark hover:border-accent/40'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all focus-visible:ring-2 focus-visible:ring-accent"
          >
            LLM & RAG
          </button>
          <button
            @click="currentFilter = 'cv'"
            :class="currentFilter === 'cv' ? 'bg-accent text-slate-950 font-semibold border-accent' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-border-light dark:border-border-dark hover:border-accent/40'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all focus-visible:ring-2 focus-visible:ring-accent"
          >
            Computer Vision
          </button>
          <button
            @click="currentFilter = 'mobile'"
            :class="currentFilter === 'mobile' ? 'bg-accent text-slate-950 font-semibold border-accent' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-border-light dark:border-border-dark hover:border-accent/40'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all focus-visible:ring-2 focus-visible:ring-accent"
          >
            Mobile & Edge AI
          </button>
          <button
            @click="currentFilter = 'data-ml'"
            :class="currentFilter === 'data-ml' ? 'bg-accent text-slate-950 font-semibold border-accent' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-border-light dark:border-border-dark hover:border-accent/40'"
            class="px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all focus-visible:ring-2 focus-visible:ring-accent"
          >
            Data & ML
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${projectsData
            .map((project) => {
              const githubTodo = renderWithTodo(project.links.github, isDev);
              const demoTodo = renderWithTodo(project.links.demo, isDev);

              return `
            <article
              x-show="currentFilter === 'all' || currentFilter === '${project.categorySlug}'"
              x-transition:enter="transition ease-out duration-200"
              x-transition:enter-start="opacity-0 scale-98"
              x-transition:enter-end="opacity-100 scale-100"
              class="tech-card overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <!-- Card Thumbnail (first image) -->
                <div class="relative w-full aspect-[16/9] bg-slate-900 border-b border-border-light dark:border-border-dark overflow-hidden">
                  <img
                    src="${project.images[0].src}"
                    alt="${project.images[0].alt}"
                    loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <!-- Category Overlay Badge -->
                  <div class="absolute top-3 left-3">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-950/80 backdrop-blur-md text-accent border border-accent/30">
                      ${project.category}
                    </span>
                  </div>
                  ${project.images.length > 1 ? `<div class="absolute top-3 right-3"><span class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-700/50"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>${project.images.length} photos</span></div>` : ''}
                </div>

                <!-- Card Content -->
                <div class="p-6 space-y-4">
                  <!-- Program / Context -->
                  <div class="text-xs font-mono text-slate-500 dark:text-slate-400">
                    ${project.programOrContext}
                  </div>

                  <!-- Title -->
                  <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                    <a href="/projects/${project.slug}" class="focus:outline-none focus-visible:underline">
                      ${project.title}
                    </a>
                  </h3>

                  <!-- Summary -->
                  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    ${project.summary}
                  </p>

                  <!-- Key Results Box -->
                  <div class="p-3.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                    <span class="text-xs font-mono font-semibold uppercase text-emerald-700 dark:text-emerald-400 block tracking-wider">
                      Key Results &amp; Impact
                    </span>
                    <ul class="text-xs text-slate-700 dark:text-slate-200 space-y-1">
                      ${project.results
                        .map(
                          (res) => `
                        <li class="flex items-start gap-1.5">
                          <span class="text-accent flex-shrink-0 mt-0.5">✓</span>
                          <span>${renderWithTodo(res, isDev)}</span>
                        </li>`
                        )
                        .join('')}
                    </ul>
                  </div>

                  <!-- Tech Tags (strictly validated against skills list) -->
                  <div class="flex flex-wrap gap-1.5 pt-2">
                    ${project.techTags
                      .map(
                        (tag) => `
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                        ${tag}
                      </span>`
                      )
                      .join('')}
                  </div>
                </div>
              </div>

              <!-- Card Action Bar -->
              <div class="p-6 pt-0 mt-4 flex items-center justify-between border-t border-border-light dark:border-border-dark pt-4">
                <a
                  href="/projects/${project.slug}"
                  class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:underline focus-visible:ring-1 focus-visible:ring-accent rounded"
                >
                  <span>Case Study Deep Dive</span>
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>

                <div class="flex items-center gap-2 text-xs font-mono text-slate-400">
                  ${githubTodo ? `<span>${githubTodo}</span>` : ''}
                  ${demoTodo ? `<span>${demoTodo}</span>` : ''}
                </div>
              </div>
            </article>`;
            })
            .join('')}
        </div>
      </div>
    </div>
  </section>
  `;
}

// Research Section Component (Numbered cards 01 to 04 with Objective, Method, Status)
function renderResearch(): string {
  return `
  <section id="research" class="py-16 md:py-24 border-b border-border-light dark:border-border-dark" aria-labelledby="research-heading">
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 mb-8">
        <span class="font-mono text-xs text-accent font-semibold tracking-wider uppercase">// 04. RESEARCH</span>
        <div class="h-px bg-border-light dark:bg-border-dark flex-grow"></div>
      </div>

      <div class="mb-10 max-w-2xl">
        <h2 id="research-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Scientific Investigations
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Rigorous academic research conducted at Universitas Riau Department of Computer Science Laboratory across agricultural computer vision and NIR spectroscopy.
        </p>
      </div>

      <!-- Numbered Research Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${researchData
          .map(
            (item) => `
          <div class="tech-card p-6 flex flex-col justify-between space-y-5 relative">
            <div>
              <!-- Header with Number and Status -->
              <div class="flex items-start justify-between gap-4 mb-3">
                <span class="font-mono text-3xl font-bold text-accent/80 tracking-tight">
                  ${item.number}
                </span>

                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium ${
                  item.statusType === 'under-review'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    : item.statusType === 'in-preparation'
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                }">
                  ${item.statusType === 'under-review' ? 'Peer Review' : item.statusType === 'in-preparation' ? 'Manuscript Prep' : 'Completed'}
                </span>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                ${item.title}
              </h3>

              <!-- Structured Fields: Objective, Method, Status -->
              <div class="space-y-3 mt-4 text-xs sm:text-sm">
                <div>
                  <span class="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-wider block">Objective</span>
                  <p class="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                    ${item.objective}
                  </p>
                </div>

                <div>
                  <span class="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-wider block">Method</span>
                  <p class="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                    ${item.method}
                  </p>
                </div>

                <div>
                  <span class="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-wider block">Status</span>
                  <p class="font-mono text-xs text-accent font-semibold mt-0.5">
                    ${item.status}
                  </p>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 pt-4 border-t border-border-light dark:border-border-dark">
              ${item.tags
                .map(
                  (tag) => `
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  ${tag}
                </span>`
                )
                .join('')}
            </div>
          </div>`
          )
          .join('')}
      </div>

      <!-- Experience Highlight Sub-Section -->
      <div class="mt-12 pt-8 border-t border-border-light dark:border-border-dark">
        <h3 class="text-xs font-mono font-semibold uppercase text-accent tracking-wider mb-6">
          Formal Experience &amp; Appointments
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${experienceData
            .map(
              (exp) => `
            <div class="tech-card p-6 space-y-4">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                  <span>${exp.period}</span>
                  <span>${exp.location}</span>
                </div>
                <h4 class="text-base font-bold text-slate-900 dark:text-white">
                  ${exp.role} ${renderWithTodo(exp.type, isDev)}
                </h4>
                <div class="text-xs text-accent font-mono mt-0.5">
                  ${exp.organization}
                </div>
              </div>

              <ul class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
                ${exp.highlights
                  .map(
                    (hl) => `
                  <li class="flex items-start gap-2">
                    <span class="text-accent flex-shrink-0 mt-1">•</span>
                    <span>${hl}</span>
                  </li>`
                  )
                  .join('')}
              </ul>

              <div class="flex flex-wrap gap-1.5 pt-2">
                ${exp.tags
                  .map(
                    (tag) => `
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    ${tag}
                  </span>`
                  )
                  .join('')}
              </div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </div>
  </section>
  `;
}

// Timeline Section Component (2022 to 2026)
function renderTimeline(): string {
  return `
  <section id="timeline" class="py-16 md:py-24 border-b border-border-light dark:border-border-dark" aria-labelledby="timeline-heading">
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 mb-8">
        <span class="font-mono text-xs text-accent font-semibold tracking-wider uppercase">// 05. TIMELINE</span>
        <div class="h-px bg-border-light dark:bg-border-dark flex-grow"></div>
      </div>

      <div class="mb-10 max-w-2xl">
        <h2 id="timeline-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Journey &amp; Milestones
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
          From computer science foundations at Universitas Riau to production AI engineering and national scholarships.
        </p>
      </div>

      <!-- Chronological Roadmap -->
      <div class="relative pl-6 sm:pl-8 border-l-2 border-border-light dark:border-border-dark space-y-10">
        ${timelineData
          .map(
            (item) => `
          <div class="relative group">
            <!-- Timeline Pin Dot -->
            <div class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-accent group-hover:scale-125 transition-transform"></div>

            <div class="space-y-2">
              <span class="inline-block font-mono text-sm font-bold text-accent">
                ${item.year}
              </span>
              <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                ${item.title}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                ${item.description}
              </p>

              ${
                item.highlights && item.highlights.length > 0
                  ? `
              <ul class="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 max-w-3xl">
                ${item.highlights
                  .map(
                    (hl) => `
                  <li class="flex items-start gap-2">
                    <span class="text-accent flex-shrink-0 mt-0.5">▹</span>
                    <span>${hl}</span>
                  </li>`
                  )
                  .join('')}
              </ul>`
                  : ''
              }
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>
  `;
}

// Certifications Section Component (Exactly 10 certifications)
function renderCertifications(): string {
  return `
  <section id="certifications" class="py-16 md:py-24 border-b border-border-light dark:border-border-dark" aria-labelledby="certifications-heading">
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 mb-8">
        <span class="font-mono text-xs text-accent font-semibold tracking-wider uppercase">// 06. CERTIFICATIONS</span>
        <div class="h-px bg-border-light dark:bg-border-dark flex-grow"></div>
      </div>

      <div class="mb-10 max-w-2xl">
        <h2 id="certifications-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Accredited Credentials &amp; Programs
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
          10 verified certifications spanning Oracle Cloud Infrastructure, IBM SkillsBuild, Hacktiv8, Dicoding Academy, and Oracle Academy.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${certificationsData
          .map(
            (cert, idx) => `
          <div class="tech-card p-4 flex items-start gap-4">
            <span class="font-mono text-xs font-semibold text-accent/80 mt-0.5 flex-shrink-0">
              #${String(idx + 1).padStart(2, '0')}
            </span>

            <div class="space-y-1 flex-grow">
              <h3 class="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                ${cert.title}
              </h3>
              <div class="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>${cert.issuer}</span>
                <span class="text-accent font-semibold">${cert.year}</span>
              </div>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>
  `;
}

// Contact Section Component (Interactive Form + Direct Links)
function renderContact(): string {
  const githubTodo = renderWithTodo(profileData.github, isDev);

  return `
  <section id="contact" class="py-16 md:py-24 border-b border-border-light dark:border-border-dark" aria-labelledby="contact-heading">
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 mb-8">
        <span class="font-mono text-xs text-accent font-semibold tracking-wider uppercase">// 07. CONTACT</span>
        <div class="h-px bg-border-light dark:bg-border-dark flex-grow"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <!-- Left: Direct Communication & Profile Info -->
        <div class="lg:col-span-5 space-y-6">
          <div>
            <h2 id="contact-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Let's build something remarkable
            </h2>
            <p class="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              I am actively open to full-time AI engineer roles and research collaborations in agentic RAG, computer vision, and high-impact machine learning.
            </p>
          </div>

          <!-- Direct Links Card -->
          <div class="tech-card p-5 space-y-4">
            <!-- Email -->
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div class="text-xs sm:text-sm">
                <span class="text-slate-500 dark:text-slate-400 font-mono text-xs block">Email</span>
                <a href="mailto:${profileData.email}" class="font-mono font-medium text-slate-900 dark:text-white hover:text-accent transition-colors">
                  ${profileData.email}
                </a>
              </div>
            </div>

            <!-- LinkedIn -->
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <div class="text-xs sm:text-sm">
                <span class="text-slate-500 dark:text-slate-400 font-mono text-xs block">LinkedIn</span>
                <a href="${profileData.linkedin}" target="_blank" rel="noopener noreferrer" class="font-mono font-medium text-slate-900 dark:text-white hover:text-accent transition-colors">
                  linkedin.com/in/dhika-mahesa-syaputra
                </a>
              </div>
            </div>

            <!-- GitHub -->
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
              </div>
              <div class="text-xs sm:text-sm">
                <span class="text-slate-500 dark:text-slate-400 font-mono text-xs block">GitHub</span>
                ${
                  !isTodoPlaceholder(profileData.github)
                    ? `<a href="${profileData.github}" target="_blank" rel="noopener noreferrer" class="font-mono font-medium text-slate-900 dark:text-white hover:text-accent transition-colors">
                        github.com/dhika-mahesa-s
                      </a>`
                    : githubTodo
                      ? `<div>${githubTodo}</div>`
                      : `<span class="text-slate-400 text-xs font-mono">Profile link</span>`
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Interactive Contact Form powered by Alpine.js -->
        <div class="lg:col-span-7">
          <div
            x-data="{
              name: '',
              email: '',
              subject: 'Job opportunity',
              message: '',
              company_fax_hp: '', // Honeypot field
              isLoading: false,
              isSuccess: false,
              isError: false,
              errorMessage: '',
              fallbackMailto: '',

              async submitForm() {
                // Client-side quick validation
                if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
                  this.isError = true;
                  this.errorMessage = 'Please complete all required fields.';
                  return;
                }

                this.isLoading = true;
                this.isError = false;
                this.isSuccess = false;
                this.errorMessage = '';

                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: this.name,
                      email: this.email,
                      subject: this.subject,
                      message: this.message,
                      company_fax_hp: this.company_fax_hp
                    })
                  });

                  const data = await res.json();

                  if (res.ok && data.success) {
                    if (data.fallback && data.mailto) {
                      // Handled fallback to mailto
                      this.fallbackMailto = data.mailto;
                      window.location.href = data.mailto;
                    }
                    this.isSuccess = true;
                    this.name = '';
                    this.email = '';
                    this.message = '';
                  } else {
                    this.isError = true;
                    this.errorMessage = data.error || 'Failed to submit message. Please reach out via email directly.';
                    if (data.mailto) {
                      this.fallbackMailto = data.mailto;
                    }
                  }
                } catch (err) {
                  this.isError = true;
                  this.errorMessage = 'Network error occurred. You can reach out directly via dhikamahesa45@gmail.com.';
                  this.fallbackMailto = 'mailto:dhikamahesa45@gmail.com?subject=' + encodeURIComponent(this.subject) + '&body=' + encodeURIComponent(this.message);
                } finally {
                  this.isLoading = false;
                }
              }
            }"
            class="tech-card p-6 sm:p-8"
          >
            <h3 class="text-base font-bold text-slate-900 dark:text-white mb-6">
              Send a Message
            </h3>

            <!-- Success Banner -->
            <div
              x-show="isSuccess"
              x-transition
              class="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm space-y-1"
              role="alert"
              style="display: none;"
            >
              <div class="font-bold flex items-center gap-1.5">
                <svg class="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span>Message Received!</span>
              </div>
              <p>Thank you for reaching out. Dhika will review your message and respond shortly.</p>
            </div>

            <!-- Error Banner -->
            <div
              x-show="isError"
              x-transition
              class="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-300 text-xs sm:text-sm space-y-2"
              role="alert"
              style="display: none;"
            >
              <div class="font-bold flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span x-text="errorMessage"></span>
              </div>
              <div x-show="fallbackMailto">
                <a :href="fallbackMailto" class="inline-flex items-center gap-1 font-mono text-xs text-accent underline">
                  Click here to send directly via your mail client →
                </a>
              </div>
            </div>

            <form @submit.prevent="submitForm()" class="space-y-4" novalidate>
              <!-- Honeypot Field (Hidden from human visitors) -->
              <div class="hidden" aria-hidden="true">
                <label for="company_fax_hp">Leave this empty</label>
                <input type="text" id="company_fax_hp" x-model="company_fax_hp" tabindex="-1" autocomplete="off" />
              </div>

              <!-- Name & Email Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="contact-name" class="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name <span class="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    x-model="name"
                    required
                    placeholder="Recruiter or Colleague"
                    class="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label for="contact-email" class="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Email <span class="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    x-model="email"
                    required
                    placeholder="name@company.com"
                    class="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <!-- Subject Dropdown -->
              <div>
                <label for="contact-subject" class="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject <span class="text-accent">*</span>
                </label>
                <select
                  id="contact-subject"
                  x-model="subject"
                  class="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="Job opportunity">Job opportunity</option>
                  <option value="Research collaboration">Research collaboration</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <!-- Message Textarea -->
              <div>
                <label for="contact-message" class="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Message <span class="text-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  x-model="message"
                  required
                  rows="4"
                  placeholder="Share details regarding your role, project, or research scope..."
                  class="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors resize-y"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-accent text-slate-950 font-semibold text-xs sm:text-sm hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span x-show="!isLoading">Send Inquiry</span>
                  <span x-show="isLoading" class="flex items-center gap-2" style="display: none;">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Transmitting...
                  </span>
                </button>

                <span class="text-xs font-mono text-slate-400">
                  Protected with rate-limiting &amp; honeypot
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

// Footer Component
function renderFooter(): string {
  return `
  <footer class="py-12 bg-white dark:bg-[#070b16] border-t border-border-light dark:border-border-dark text-xs font-mono text-slate-500 dark:text-slate-400" role="contentinfo">
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="space-y-1 text-center sm:text-left">
        <div>© 2026 ${profileData.fullName}. All rights reserved.</div>
        <div class="text-[11px] text-slate-400 dark:text-slate-500">
          Zero tracking cookies • Built with HTML5, Tailwind CSS &amp; Alpine.js
        </div>
      </div>

      <div class="flex items-center gap-4">
        <a href="${profileData.github}" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors flex items-center gap-1.5" title="GitHub">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          <span>GitHub</span>
        </a>
        <a href="${profileData.linkedin}" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors flex items-center gap-1.5" title="LinkedIn">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          <span>LinkedIn</span>
        </a>
        <a href="#main-content" class="hover:text-accent transition-colors flex items-center gap-1">
          <span>Back to top</span>
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </a>
      </div>
    </div>
  </footer>
  `;
}

// Generate the Main Landing Page (public/index.html)
function generateIndexPage() {
  const html = `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
${renderHead(
  `${profileData.fullName} – AI Engineer Portfolio`,
  `Personal portfolio of ${profileData.fullName}, AI Engineer specializing in LLM applications, agentic RAG, and computer vision systems.`
)}
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
  <!-- Accessible Skip Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  ${renderNav('home', false)}

  <main id="main-content">
    ${renderHero()}
    ${renderAbout()}
    ${renderSkills()}
    ${renderProjects()}
    ${renderResearch()}
    ${renderTimeline()}
    ${renderCertifications()}
    ${renderContact()}
  </main>

  ${renderFooter()}
</body>
</html>`;

  fs.writeFileSync(path.join(publicDir, 'index.html'), html, 'utf8');
  console.log('Successfully generated public/index.html');
}

// Generate Project Detail Pages at public/projects/[slug]/index.html
function generateProjectDetailPages() {
  for (const project of projectsData) {
    const projectDir = path.join(publicDir, 'projects', project.slug);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    const githubTodo = renderWithTodo(project.links.github, isDev);
    const demoTodo = renderWithTodo(project.links.demo, isDev);

    const html = `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
${renderHead(
  `${project.title} – Case Study | Dhika Mahesa Syaputra`,
  project.summary,
  `/projects/${project.slug}`,
  project.images[0].src
)}
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
  <a href="#main-content" class="skip-link">Skip to main content</a>

  ${renderNav('projects', true)}

  <main id="main-content" class="py-12 md:py-20">
    <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <!-- Top Breadcrumbs & Back Button -->
      <div class="flex items-center justify-between">
        <nav aria-label="Breadcrumb" class="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <a href="/" class="hover:text-accent transition-colors">Home</a>
          <span>/</span>
          <a href="/#projects" class="hover:text-accent transition-colors">Projects</a>
          <span>/</span>
          <span class="text-slate-900 dark:text-slate-200 font-semibold">${project.title}</span>
        </nav>

        <a
          href="/#projects"
          class="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline focus-visible:ring-1 focus-visible:ring-accent rounded"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span>Back to Projects</span>
        </a>
      </div>

      <!-- Project Header -->
      <header class="space-y-4 max-w-3xl">
        <div class="inline-flex items-center px-3 py-1 rounded-md text-xs font-mono bg-accent/10 text-emerald-800 dark:text-accent border border-accent/30">
          ${project.category} • ${project.programOrContext}
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          ${project.title}
        </h1>

        <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          ${project.summary}
        </p>

        <!-- Tech Tags -->
        <div class="flex flex-wrap gap-2 pt-2">
          ${project.techTags
            .map(
              (tag) => `
            <span class="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              ${tag}
            </span>`
            )
            .join('')}
        </div>
      </header>

      <!-- Image Carousel -->
      <div
        class="tech-card overflow-hidden"
        x-data="{
          activeSlide: 0,
          images: ${JSON.stringify(project.images)},
          get total() { return this.images.length; },
          prev() { this.activeSlide = (this.activeSlide - 1 + this.total) % this.total; },
          next() { this.activeSlide = (this.activeSlide + 1) % this.total; }
        }"
      >
        <!-- Slides -->
        <div class="relative w-full aspect-[16/9] bg-slate-900 overflow-hidden select-none">
          <template x-for="(img, idx) in images" :key="idx">
            <div
              x-show="activeSlide === idx"
              x-transition:enter="transition ease-out duration-300"
              x-transition:enter-start="opacity-0"
              x-transition:enter-end="opacity-100"
              x-transition:leave="transition ease-in duration-200"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0"
              class="absolute inset-0"
            >
              <img
                :src="img.src"
                :alt="img.alt"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </template>

          <!-- Prev / Next arrows (only shown if >1 image) -->
          <template x-if="total > 1">
            <div>
              <button
                @click="prev()"
                class="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-slate-950/70 backdrop-blur-sm text-white border border-slate-700/50 hover:bg-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Previous image"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button
                @click="next()"
                class="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-slate-950/70 backdrop-blur-sm text-white border border-slate-700/50 hover:bg-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Next image"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </template>

          <!-- Slide counter badge -->
          <template x-if="total > 1">
            <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-950/70 backdrop-blur-sm text-slate-300 border border-slate-700/50">
              <span x-text="activeSlide + 1"></span>/<span x-text="total"></span>
            </div>
          </template>
        </div>

        <!-- Dot indicators (only shown if >1 image) -->
        <template x-if="total > 1">
          <div class="flex items-center justify-center gap-2 py-3 bg-slate-900/50 border-t border-slate-800">
            <template x-for="(img, idx) in images" :key="idx">
              <button
                @click="activeSlide = idx"
                :class="activeSlide === idx ? 'bg-accent w-5' : 'bg-slate-600 hover:bg-slate-400 w-2'"
                class="h-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                :aria-label="'Go to image ' + (idx + 1)"
              ></button>
            </template>
          </div>
        </template>

        <!-- Alt text caption -->
        <p class="px-4 py-2 text-xs font-mono text-slate-500 dark:text-slate-500 border-t border-slate-800" x-text="images[activeSlide].alt"></p>
      </div>

      <!-- Detail Deep Dive Sections: Problem, Approach, Results, What Was Learned -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <!-- Main Deep Dive Content -->
        <div class="lg:col-span-8 space-y-10">
          <!-- 1. Problem Statement -->
          <section class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="font-mono text-accent text-sm">01.</span>
              <span>The Problem &amp; Operational Context</span>
            </h2>
            <div class="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              ${project.details.problemStatement.map((p) => `<p>${p}</p>`).join('')}
            </div>
          </section>

          <!-- 2. Technical Approach -->
          <section class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="font-mono text-accent text-sm">02.</span>
              <span>Engineering Approach &amp; Implementation</span>
            </h2>
            <div class="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              ${project.details.approach.map((p) => `<p>${p}</p>`).join('')}
            </div>
          </section>

          <!-- 3. Results Analysis -->
          <section class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="font-mono text-accent text-sm">03.</span>
              <span>Empirical Results &amp; Verification</span>
            </h2>
            <div class="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              ${project.details.resultsAnalysis.map((p) => `<p>${p}</p>`).join('')}
            </div>
          </section>

          <!-- 4. What Was Learned -->
          <section class="space-y-3">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="font-mono text-accent text-sm">04.</span>
              <span>Key Learnings &amp; Production Insights</span>
            </h2>
            <div class="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              ${project.details.whatWasLearned.map((p) => `<p>${p}</p>`).join('')}
            </div>
          </section>
        </div>

        <!-- Sidebar Summary & Links -->
        <div class="lg:col-span-4 space-y-6">
          <div class="tech-card p-6 space-y-5">
            <h3 class="text-xs font-mono font-semibold uppercase text-accent tracking-wider border-b border-border-light dark:border-border-dark pb-2">
              System Specifications
            </h3>

            <div class="space-y-3 text-xs sm:text-sm">
              <div>
                <span class="text-slate-400 font-mono text-xs block">Category</span>
                <span class="font-medium text-slate-900 dark:text-white">${project.category}</span>
              </div>

              <div>
                <span class="text-slate-400 font-mono text-xs block">Context / Program</span>
                <span class="font-medium text-slate-900 dark:text-white">${project.programOrContext}</span>
              </div>

              <div>
                <span class="text-slate-400 font-mono text-xs block">Validated Metrics</span>
                <ul class="mt-1 space-y-1 text-slate-700 dark:text-slate-200 text-xs">
                  ${project.results
                    .map(
                      (res) => `
                    <li class="flex items-start gap-1.5">
                      <span class="text-accent flex-shrink-0">✓</span>
                      <span>${renderWithTodo(res, isDev)}</span>
                    </li>`
                    )
                    .join('')}
                </ul>
              </div>

              <div class="pt-3 border-t border-border-light dark:border-border-dark">
                <span class="text-slate-400 font-mono text-xs block mb-1">External Links</span>
                <div class="space-y-1 font-mono text-xs">
                  ${githubTodo ? `<div>GitHub: ${githubTodo}</div>` : ''}
                  ${demoTodo ? `<div>Demo: ${demoTodo}</div>` : ''}
                </div>
              </div>
            </div>

            <a href="${profileData.github}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          <span>GitHub: dhika-mahesa-s</span>
        </a>
        <div class="pt-2">
              <a
                href="/#contact"
                class="w-full inline-flex items-center justify-center py-2.5 rounded-lg bg-accent text-slate-950 font-semibold text-xs hover:bg-emerald-400 transition-colors"
              >
                Inquire about this architecture →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  ${renderFooter()}
</body>
</html>`;

    fs.writeFileSync(path.join(projectDir, 'index.html'), html, 'utf8');
  }

  console.log(
    `Successfully generated ${projectsData.length} project detail pages at /projects/[slug]/index.html`
  );
}

generateIndexPage();
generateProjectDetailPages();
