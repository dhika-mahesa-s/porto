export interface TimelineItem {
  year: string;
  title: string;
  category: 'education' | 'experience' | 'certification' | 'program';
  description: string;
  highlights?: string[];
}

export const timelineData: TimelineItem[] = [
  {
    year: '2026',
    title: 'Research Assistant, Thesis Defense & Hacktiv8 Specialization',
    category: 'experience',
    description:
      'Completed Bachelor of Computer Science at Universitas Riau in June 2026 with 3.88/4.00 final GPA. Completed Hacktiv8 advanced programs and served as appointed Research Assistant.',
    highlights: [
      'Graduated with Bachelor of Computer Science (S.Kom.), final GPA 3.88/4.00 (June 2026)',
      'Undergraduate thesis: Moon-phase classification and fishing recommendation system (MobileNetV2, TFLite, Android)',
      'Appointed Research Assistant at Universitas Riau Computer Science Lab (Jun–Oct 2026)',
      'Hacktiv8 Maju Bareng AI Program: LLM-Based Tools & Gemini API Integration for Data Scientists',
      'Hacktiv8 IBM SkillsBuild University Education Program: Legal – AI Agent for Legal',
      'Belajar Dasar AI, Dicoding Academy'
    ]
  },
  {
    year: '2025',
    title: 'Provincial Data Analyst Internship, SDGs Leadership & Data Science Training',
    category: 'experience',
    description:
      'Interned at West Sumatra provincial government, represented Pekanbaru in SDGs Future Leaders, and achieved professional data science foundations.',
    highlights: [
      'Data Analyst Internship at Dinas Komunikasi, Informatika, dan Statistik Provinsi Sumatera Barat (Diskominfotik Pemprov Sumbar, Jan–Mar 2025)',
      'Built 4+ provincial dashboards, Indeks Kinerja Daerah, and 20+ source automated Pandas ETL pipeline',
      'Selected participant in Astra Honda SDGs Future Leaders 2025 for SatuRute community ride-sharing prototype',
      'Hacktiv8 Student Developer Initiative: Data Classification and Summarization',
      'Dicoding Academy: Belajar Dasar Data Science, Memulai Pemrograman dengan Python, Belajar Dasar SQL'
    ]
  },
  {
    year: '2024',
    title: 'Digital Talent Scholarship Awardee & Cloud Certifications',
    category: 'certification',
    description:
      'Awarded national DTS scholarship by Kominfo and achieved industry cloud certifications from Oracle.',
    highlights: [
      'Awarded Digital Talent Scholarship (DTS) 2024 by Ministry of Communication and Informatics (Kominfo)',
      'Oracle Cloud Infrastructure 2023 Certified Foundations Associate',
      'Oracle Cloud Infrastructure Foundation I & II (Talent Scouting Academy, DTS)'
    ]
  },
  {
    year: '2023',
    title: 'Oracle Academy Java Programming & Object-Oriented Software Foundations',
    category: 'certification',
    description:
      'Completed rigorous software engineering coursework in Java programming and foundational algorithms.',
    highlights: ['Java Programming, Oracle Academy', 'Java Fundamentals, Oracle Academy']
  },
  {
    year: '2022',
    title: 'Commenced Bachelor of Computer Science at Universitas Riau',
    category: 'education',
    description:
      'Began undergraduate studies in Department of Computer Science, Faculty of Mathematics and Natural Sciences (Aug 2022).'
  }
];
