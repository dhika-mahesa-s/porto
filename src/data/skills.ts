export interface SkillCategory {
  id: string;
  name: string;
  shortName: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'llm-agentic-ai',
    name: 'LLM and agentic AI',
    shortName: 'LLM & Agentic',
    skills: [
      'Gemini',
      'Llama 3.3 70B',
      'GPT-OSS 120B',
      'Claude',
      'prompt engineering',
      'structured outputs',
      'RAG',
      'FAISS',
      'ChromaDB',
      'embeddings',
      'LangChain',
      'LangGraph',
      'Langflow'
    ]
  },
  {
    id: 'ml-computer-vision',
    name: 'ML and computer vision',
    shortName: 'ML & Vision',
    skills: [
      'YOLOv8',
      'ResNet50',
      'MobileNetV2 (transfer learning)',
      'TensorFlow',
      'TensorFlow Lite',
      'XGBoost',
      'MLP regression',
      'scikit-learn',
      'supervised and unsupervised learning',
      'NIR spectral data analysis',
      'model evaluation (precision, recall, mAP, F1, cross-validation)'
    ]
  },
  {
    id: 'data-bi',
    name: 'Data and BI',
    shortName: 'Data & BI',
    skills: [
      'Python',
      'SQL',
      'Pandas',
      'Tableau',
      'Looker Studio',
      'Excel',
      'geospatial analysis',
      'ETL pipelines'
    ]
  },
  {
    id: 'backend-deployment',
    name: 'Backend and deployment',
    shortName: 'Backend & Edge',
    skills: [
      'Flask',
      'FastAPI',
      'Spring Boot',
      'REST API integration',
      'Gradio',
      'Streamlit',
      'Android (Java, MVVM, Room, SQLite)',
      'web server deployment'
    ]
  },
  {
    id: 'cloud-tools',
    name: 'Cloud and tools',
    shortName: 'Cloud & Tools',
    skills: [
      'Oracle Cloud Infrastructure (Certified Foundations Associate)',
      'Google Cloud Platform',
      'Docker and CI/CD',
      'MLOps',
      'Git/GitHub',
      'Google Colab'
    ]
  }
];

// Flat list for validating project tags against strict skills list
export const allValidSkills: Set<string> = new Set(
  skillCategories.flatMap((category) => category.skills)
);
