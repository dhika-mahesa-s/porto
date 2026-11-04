export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  credentialId?: string;
}

export const certificationsData: CertificationItem[] = [
  {
    id: 'oci-foundations-associate-2024',
    title: 'Oracle Cloud Infrastructure 2023 Certified Foundations Associate',
    issuer: 'Oracle',
    year: '2024'
  },
  {
    id: 'oci-foundation-tsa-dts-2024',
    title: 'Oracle Cloud Infrastructure Foundation I & II',
    issuer: 'Talent Scouting Academy, Digital Talent Scholarship',
    year: '2024'
  },
  {
    id: 'hacktiv8-maju-bareng-ai-2026',
    title: 'Maju Bareng AI Program: LLM-Based Tools and Gemini API Integration for Data Scientists',
    issuer: 'Hacktiv8',
    year: '2026'
  },
  {
    id: 'hacktiv8-ibm-legal-agent-2026',
    title: 'IBM SkillsBuild University Education Program: Legal – AI Agent for Legal',
    issuer: 'Hacktiv8 & IBM SkillsBuild',
    year: '2026'
  },
  {
    id: 'hacktiv8-sdi-data-classification-2025',
    title: 'Data Classification and Summarization',
    issuer: 'Student Developer Initiative Program, Hacktiv8',
    year: '2025'
  },
  {
    id: 'dicoding-dasar-ai-2026',
    title: 'Belajar Dasar AI',
    issuer: 'Dicoding Academy',
    year: '2026'
  },
  {
    id: 'dicoding-dasar-data-science-2025',
    title: 'Belajar Dasar Data Science',
    issuer: 'Dicoding Academy',
    year: '2025'
  },
  {
    id: 'dicoding-python-2025',
    title: 'Memulai Pemrograman dengan Python',
    issuer: 'Dicoding Academy',
    year: '2025'
  },
  {
    id: 'dicoding-sql-2025',
    title: 'Belajar Dasar Structured Query Language (SQL)',
    issuer: 'Dicoding Academy',
    year: '2025'
  },
  {
    id: 'oracle-academy-java-2023',
    title: 'Java Programming and Java Fundamentals',
    issuer: 'Oracle Academy',
    year: '2023'
  }
];
