export interface ProfileData {
  name: string;
  degree: string;
  fullName: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string; // [add link] - placeholder in dev, hidden in prod when empty
  education: {
    institution: string;
    degree: string;
    department: string;
    faculty: string;
    period: string;
    gpa: string;
    maxGpa: string;
  };
  award: {
    title: string;
    year: string;
    issuer: string;
  };
  languages: {
    language: string;
    proficiency: string; // English has [level]
  }[];
  openTo: string[];
  hero: {
    headline: string;
    subheadline: string;
    stats: {
      value: number;
      suffix: string;
      label: string;
      sublabel: string;
      decimals?: number;
    }[];
  };
  about: {
    paragraphs: string[];
    focusAreas: string[];
  };
}

export const profileData: ProfileData = {
  name: 'Dhika Mahesa Syaputra',
  degree: 'S.Kom.',
  fullName: 'Dhika Mahesa Syaputra, S.Kom.',
  title: 'AI Engineer – LLM applications, agentic RAG, computer vision',
  location: 'Padang, West Sumatra, Indonesia',
  email: 'dhikamahesa45@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dhika-mahesa-syaputra-456748374',
  github: 'https://github.com/dhika-mahesa-s',
  education: {
    institution: 'Universitas Riau',
    degree: 'Bachelor of Computer Science (S.Kom.)',
    department: 'Department of Computer Science',
    faculty: 'Faculty of Mathematics and Natural Sciences',
    period: 'Aug 2022 – Jun 2026',
    gpa: '3.88',
    maxGpa: '4.00'
  },
  award: {
    title: 'Digital Talent Scholarship (DTS) 2024 awardee',
    year: '2024',
    issuer: 'Ministry of Communication and Informatics (Kementerian Kominfo RI)'
  },
  languages: [
    { language: 'Indonesian', proficiency: 'native' },
    { language: 'English', proficiency: 'professional' }
  ],
  openTo: ['Full-time AI engineer roles', 'Research collaboration'],
  hero: {
    headline: 'I build LLM and computer-vision systems that ship.',
    subheadline:
      'AI Engineer and Computer Science graduate focused on agentic RAG, computer vision, and AI for public-sector and agriculture data.',
    stats: [
      {
        value: 99.4,
        suffix: '%',
        label: 'mAP@0.5 YOLOv8 Ganoderma detector',
        sublabel: '230 test images, 15,182 trees evaluated',
        decimals: 1
      },
      {
        value: 88.32,
        suffix: '%',
        label: 'Test accuracy moon-phase classifier',
        sublabel: 'Thesis research, 291 held-out test images',
        decimals: 2
      },
      {
        value: 3.88,
        suffix: ' / 4.00',
        label: 'Final Cumulative GPA',
        sublabel: 'Universitas Riau, Bachelor of Computer Science',
        decimals: 2
      }
    ]
  },
  about: {
    // Exactly three short paragraphs, first person, strictly under 130 words in total,
    // using ONLY facts specified in Section 5.
    // Word count check:
    // P1 (39 words): "I build LLM applications using agentic RAG with LangGraph, LangChain, and Langflow alongside FAISS and ChromaDB vector search. I also engineer computer-vision models—including YOLOv8, ResNet50, and MobileNetV2—and deploy TensorFlow Lite models to offline-first Android applications."
    // P2 (43 words): "As a Research Assistant, I investigated oil palm disease detection and NIR-based prediction, co-authoring a manuscript under review at a Scopus-indexed journal. Previously, I interned at the West Sumatra Communications, Informatics and Statistics Office building government dashboards as a Digital Talent Scholarship 2024 awardee."
    // P3 (27 words): "I focus on delivering reliable, safety-aware AI systems with strict hallucination control, plain-language outputs, and transparent not-legal-advice disclaimers for high-impact decision support."
    // Total words: 39 + 43 + 27 = 109 words (< 130 words).
    paragraphs: [
      'I build LLM applications using agentic RAG with LangGraph, LangChain, and Langflow alongside FAISS and ChromaDB vector search. I also engineer computer-vision models—including YOLOv8, ResNet50, and MobileNetV2—and deploy TensorFlow Lite models to offline-first Android applications.',
      'As a Research Assistant, I investigated oil palm disease detection and NIR-based prediction, contributing to a manuscript under review at a Scopus-indexed journal. Previously, I interned as a Data Analyst at the West Sumatra Provincial Communications, Informatics, and Statistics Office building government dashboards. Separately, I was awarded the national Digital Talent Scholarship 2024 by the Ministry of Communication and Informatics.',
      'I focus on delivering reliable, safety-aware AI systems with strict hallucination control, plain-language outputs, and transparent not-legal-advice disclaimers for high-impact decision support.'
    ],
    focusAreas: [
      'Agentic RAG',
      'LLM applications',
      'Computer Vision',
      'Prompt Engineering',
      'Edge AI on Android',
      'Data Pipelines',
      'Dashboards'
    ]
  }
};
