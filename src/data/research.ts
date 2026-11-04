export interface ResearchItem {
  id: number;
  number: string;
  title: string;
  objective: string;
  method: string;
  status: string;
  statusType: 'under-review' | 'in-preparation' | 'completed';
  tags: string[];
}

export const researchData: ResearchItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Moon-Phase Classification for Fishing Recommendation',
    objective:
      'Deliver real-time, offline lunar phase intelligence and ocean safety recommendations to coastal artisanal fishermen directly on mobile devices.',
    method:
      'MobileNetV2 with 3-phase progressive transfer learning, quantized to TensorFlow Lite (5 MB) and embedded in an offline-first Android app with Stormglass API integration.',
    status:
      'Manuscript under review at Indonesian Journal of Electrical Engineering and Informatics (IJEEI, Scopus-indexed Q3)',
    statusType: 'under-review',
    tags: [
      'MobileNetV2 (transfer learning)',
      'TensorFlow Lite',
      'Android (Java, MVVM, Room, SQLite)'
    ]
  },
  {
    id: 2,
    number: '02',
    title: 'Deep Learning for Oil Palm Plantations',
    objective:
      'Evaluate deep learning vision architectures to automate high-throughput crop surveillance across extensive commercial oil palm plantations.',
    method:
      'Comparative investigation of bounding-box instance detectors and deep convolutional classifiers on extensive plantation image datasets.',
    status: 'Scientific article, manuscript in preparation',
    statusType: 'in-preparation',
    tags: ['YOLOv8', 'ResNet50', 'supervised and unsupervised learning']
  },
  {
    id: 3,
    number: '03',
    title: 'Free Fatty Acid (FFA) & Rendemen Prediction from NIR Spectra',
    objective:
      'Enable rapid, non-destructive chemical grading of palm oil fruit bunches without destructive wet-chemical lab titration.',
    method:
      'Multilayer Perceptron (MLP) Regressor trained on multi-angle near-infrared (NIR) spectral absorbance measurements from 64 sample batches (R² 0.78, RMSE 6.03).',
    status: 'Research completed, manuscript in preparation',
    statusType: 'in-preparation',
    tags: ['MLP regression', 'NIR spectral data analysis', 'Python']
  },
  {
    id: 4,
    number: '04',
    title: 'Ganoderma Disease Detection in Oil Palm',
    objective:
      'Detect destructive Ganoderma basal stem rot infections in oil palm trees rapidly to replace manual 2–5 minute tree inspections.',
    method:
      'Evaluated two separate models independently: YOLOv8 object detector (99.4% mAP@0.5, 99.5% recall on unhealthy trees, ~18 ms/image) and ResNet50 classifier (0.80 precision/recall on 656 images). Models evaluated separately, not combined into one pipeline.',
    status: 'Evaluation completed (separate model benchmarks)',
    statusType: 'completed',
    tags: ['YOLOv8', 'ResNet50', 'model evaluation (precision, recall, mAP, F1, cross-validation)']
  }
];
