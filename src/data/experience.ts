export interface ExperienceItem {
  id: string;
  role: string;
  type: string; // [part-time / full-time] placeholder
  organization: string;
  location: string;
  period: string;
  highlights: string[];
  tags: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'research-assistant-unri',
    role: 'Research Assistant',
    type: '[part-time / full-time]',
    organization: 'Department of Computer Science Laboratory, Universitas Riau',
    location: 'Pekanbaru, Indonesia',
    period: 'Jun 2026 – Oct 2026',
    highlights: [
      'Appointed by official assignment letter to conduct research on YOLO and deep learning applications for oil palm plantations.',
      'Engineered and evaluated Ganoderma disease detection models (YOLOv8 object detector achieving 99.4% mAP@0.5 and ResNet50 deep classifier).',
      'Co-developed an MLP Regressor on multi-angle near-infrared (NIR) spectral data for non-destructive FFA and rendemen prediction (R² 0.78, RMSE 6.03).',
      'Contributed core empirical results and methodology sections to a scientific article (manuscript in preparation).'
    ],
    tags: ['YOLOv8', 'ResNet50', 'MLP regression', 'NIR spectral data analysis', 'Python']
  },
  {
    id: 'data-analyst-intern-sumbar',
    role: 'Data Analyst (Internship)',
    type: 'Internship',
    organization:
      'Dinas Komunikasi, Informatika, dan Statistik Provinsi Sumatera Barat (Diskominfotik Pemprov Sumbar)',
    location: 'Padang, West Sumatra, Indonesia',
    period: 'Jan 2025 – Mar 2025',
    highlights: [
      'Developed and deployed 4+ interactive dashboards (Python, Tableau, Excel) visualizing socio-economic indicators across all 19 West Sumatra regencies and cities.',
      'Constructed a Pandas and Excel automated harmonization pipeline consolidating datasets from 20+ sources (BPS and internal portals), slashing preparation time by 50%.',
      'Redesigned the executive dashboard interface with dynamic filters and one-click PDF export, reducing report distribution from 5 manual steps to 1 click.',
      'Co-created the regional performance index (Indeks Kinerja Daerah) and created Tableau geospatial thematic maps.'
    ],
    tags: ['Python', 'Pandas', 'Tableau', 'Excel', 'geospatial analysis', 'ETL pipelines']
  }
];
