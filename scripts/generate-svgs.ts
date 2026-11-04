import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve(process.cwd(), 'public/img/projects');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function createSvg(title: string, subtitle: string, diagramSvg: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a101f" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="emerald-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="450" fill="url(#bg-gradient)" />
  <rect width="800" height="450" fill="url(#grid)" />

  <!-- Accent Header Bar -->
  <rect x="0" y="0" width="800" height="4" fill="url(#emerald-glow)" />

  <!-- Header metadata -->
  <text x="40" y="44" fill="#10b981" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" letter-spacing="1">SYSTEM ARCHITECTURE</text>
  <text x="40" y="74" fill="#f8fafc" font-family="'Geist', sans-serif" font-size="20" font-weight="600">${title}</text>
  <text x="40" y="96" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="13">${subtitle}</text>

  <!-- Inner Diagram Canvas -->
  <g transform="translate(40, 115)">
    <rect width="720" height="300" rx="8" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
    ${diagramSvg}
  </g>
</svg>`;
}

const svgs: Record<string, string> = {
  'citecheck-ai.svg': createSvg(
    'CiteCheck AI: Agentic RAG Citation Verification',
    'LangGraph Conditional Routing • 84% Verdict Accuracy • Llama 3.3 70B & GPT-OSS 120B',
    `<g transform="translate(30, 40)">
      <!-- Node 1: Ingest -->
      <rect x="0" y="70" width="120" height="60" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="60" y="98" fill="#f8fafc" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Thesis Claim</text>
      <text x="60" y="116" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">Input Pair</text>

      <!-- Arrow 1 -->
      <line x1="120" y1="100" x2="160" y2="100" stroke="#10b981" stroke-width="2" marker-end="url(#arrow)" />

      <!-- Node 2: Vector Search -->
      <rect x="160" y="50" width="140" height="100" rx="6" fill="#132338" stroke="#10b981" stroke-width="1.5" />
      <text x="230" y="80" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">FAISS / Chroma</text>
      <text x="230" y="100" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">Google GenAI Embeds</text>
      <text x="230" y="125" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Cosine Threshold</text>

      <!-- Arrow 2 -->
      <line x1="300" y1="100" x2="340" y2="100" stroke="#10b981" stroke-width="2" />

      <!-- Node 3: Router -->
      <polygon points="400,60 460,100 400,140 340,100" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
      <text x="400" y="96" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle" font-weight="600">Sufficient</text>
      <text x="400" y="112" fill="#38bdf8" font-family="monospace" font-size="11" text-anchor="middle">Evidence?</text>

      <!-- Fallback Path: Top to Semantic Scholar -->
      <path d="M 400 60 L 400 20 L 520 20" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,4" />
      <rect x="520" y="5" width="130" height="36" rx="4" fill="#2d2012" stroke="#f59e0b" />
      <text x="585" y="27" fill="#fbbf24" font-family="monospace" font-size="10" text-anchor="middle">Semantic Scholar API</text>

      <!-- Success Path: Right to Evaluator -->
      <line x1="460" y1="100" x2="510" y2="100" stroke="#10b981" stroke-width="2" />
      <rect x="510" y="60" width="140" height="80" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
      <text x="580" y="90" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Strict Match Evaluator</text>
      <text x="580" y="110" fill="#f8fafc" font-family="monospace" font-size="11" text-anchor="middle">84% Verdict Accuracy</text>
      <text x="580" y="126" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Support / Contradict / N/A</text>
    </g>`
  ),

  'kontrak-aman.svg': createSvg(
    'Kontrak Aman: Legal AI Risk Checker',
    'Langflow Pipeline • Gemini 3.6 Flash • 6/6 Red Flags Detected • UU Ketenagakerjaan',
    `<g transform="translate(30, 40)">
      <rect x="10" y="80" width="110" height="60" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="65" y="108" fill="#f8fafc" font-family="sans-serif" font-size="12" text-anchor="middle">Contract PDF</text>
      <text x="65" y="125" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">File Ingestion</text>

      <line x1="120" y1="110" x2="160" y2="110" stroke="#10b981" stroke-width="2" />

      <rect x="160" y="80" width="120" height="60" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="220" y="108" fill="#f8fafc" font-family="sans-serif" font-size="12" text-anchor="middle">Clause Parser</text>
      <text x="220" y="125" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Structured JSON</text>

      <line x1="280" y1="110" x2="320" y2="110" stroke="#10b981" stroke-width="2" />

      <rect x="320" y="60" width="150" height="100" rx="6" fill="#172554" stroke="#3b82f6" stroke-width="1.5" />
      <text x="395" y="90" fill="#60a5fa" font-family="sans-serif" font-size="13" text-anchor="middle" font-weight="600">Gemini 3.6 Flash</text>
      <text x="395" y="112" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">UU Ketenagakerjaan</text>
      <text x="395" y="132" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Statutory Grounding</text>

      <line x1="470" y1="110" x2="510" y2="110" stroke="#10b981" stroke-width="2" />

      <rect x="510" y="60" width="140" height="100" rx="6" fill="#450a0a" stroke="#ef4444" stroke-width="1.5" />
      <text x="580" y="90" fill="#f87171" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Risk Audit Report</text>
      <text x="580" y="112" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle" font-weight="bold">Risk Score: 8/10</text>
      <text x="580" y="132" fill="#fca5a5" font-family="monospace" font-size="10" text-anchor="middle">6/6 Red Flags Flagged</text>
    </g>`
  ),

  'moon-phase.svg': createSvg(
    'Moon-Phase Edge AI & Fishing Recommendation',
    'MobileNetV2 Transfer Learning • TFLite 5 MB (77% Compression) • 88.32% Accuracy',
    `<g transform="translate(30, 30)">
      <!-- Training pipeline -->
      <rect x="20" y="20" width="180" height="70" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="110" y="48" fill="#38bdf8" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">MobileNetV2 (3-Phase)</text>
      <text x="110" y="68" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">291 Test Images • 88.32%</text>

      <line x1="200" y1="55" x2="260" y2="55" stroke="#10b981" stroke-width="2" />

      <rect x="260" y="20" width="160" height="70" rx="6" fill="#132338" stroke="#10b981" stroke-width="1.5" />
      <text x="340" y="48" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">TFLite Quantization</text>
      <text x="340" y="68" fill="#f8fafc" font-family="monospace" font-size="11" text-anchor="middle">22 MB → 5 MB (77%)</text>

      <line x1="420" y1="55" x2="480" y2="55" stroke="#10b981" stroke-width="2" />

      <rect x="480" y="10" width="170" height="90" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
      <text x="565" y="38" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Offline Android App</text>
      <text x="565" y="58" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Latency: 100–200 ms</text>
      <text x="565" y="78" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">Java, MVVM, Room, SQLite</text>

      <!-- Fusion with Stormglass API -->
      <line x1="565" y1="100" x2="565" y2="135" stroke="#38bdf8" stroke-width="2" />
      <rect x="470" y="135" width="190" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1" />
      <text x="565" y="157" fill="#38bdf8" font-family="sans-serif" font-size="11" text-anchor="middle">Stormglass Ocean API</text>
      <text x="565" y="173" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">5-Tier Fishing Advisory</text>
    </g>`
  ),

  'ganoderma-yolov8.svg': createSvg(
    'Ganoderma Disease Detection in Oil Palm',
    'YOLOv8: 99.4% mAP@0.5 (18 ms/frame) • ResNet50: 0.80 P/R • Evaluated Separately',
    `<g transform="translate(30, 20)">
      <!-- YOLOv8 Branch -->
      <rect x="20" y="20" width="280" height="160" rx="8" fill="#132338" stroke="#10b981" stroke-width="1.5" />
      <text x="40" y="50" fill="#34d399" font-family="sans-serif" font-size="14" font-weight="600">Model A: YOLOv8 Detector</text>
      <text x="40" y="75" fill="#f8fafc" font-family="monospace" font-size="11">• 99.4% mAP@0.5 on unhealthy class</text>
      <text x="40" y="98" fill="#f8fafc" font-family="monospace" font-size="11">• 99.5% recall (230 test scenes)</text>
      <text x="40" y="121" fill="#f8fafc" font-family="monospace" font-size="11">• 15,182 trees evaluated</text>
      <text x="40" y="144" fill="#38bdf8" font-family="monospace" font-size="11">• ~18 ms/img (vs 2–5 min manual)</text>

      <!-- ResNet50 Branch -->
      <rect x="360" y="20" width="280" height="160" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="1.5" />
      <text x="380" y="50" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600">Model B: ResNet50 Classifier</text>
      <text x="380" y="75" fill="#f8fafc" font-family="monospace" font-size="11">• 0.80 precision on 656 images</text>
      <text x="380" y="98" fill="#f8fafc" font-family="monospace" font-size="11">• 0.80 recall on annotated symptoms</text>
      <text x="380" y="121" fill="#f8fafc" font-family="monospace" font-size="11">• Deep convolutional feature extractor</text>
      <text x="380" y="144" fill="#94a3b8" font-family="monospace" font-size="11">• Patch-level symptom verification</text>

      <!-- Explicit pipeline note -->
      <rect x="80" y="195" width="500" height="30" rx="4" fill="#332200" stroke="#f59e0b" />
      <text x="330" y="215" fill="#fde047" font-family="monospace" font-size="10" text-anchor="middle" font-weight="600">NOTE: Both models evaluated separately; not yet combined into one pipeline.</text>
    </g>`
  ),

  'nir-prediction.svg': createSvg(
    'Free Fatty Acid & Rendemen NIR Prediction',
    'Near-Infrared Spectroscopy • MLP Regressor • R² 0.78 • RMSE 6.03',
    `<g transform="translate(30, 30)">
      <rect x="30" y="30" width="180" height="120" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="120" y="60" fill="#38bdf8" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">NIR Spectral Input</text>
      <path d="M 50 110 Q 80 70, 110 115 T 180 85" fill="none" stroke="#38bdf8" stroke-width="2" />
      <text x="120" y="135" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Multi-Angle Absorbance</text>

      <line x1="210" y1="90" x2="270" y2="90" stroke="#10b981" stroke-width="2" />

      <rect x="270" y="30" width="160" height="120" rx="6" fill="#132338" stroke="#10b981" stroke-width="1.5" />
      <text x="350" y="60" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">MLP Regressor</text>
      <text x="350" y="85" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Dense Layer Fit</text>
      <text x="350" y="105" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">L2 Regularization</text>
      <text x="350" y="125" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">64 Multi-Angle Batches</text>

      <line x1="430" y1="90" x2="490" y2="90" stroke="#10b981" stroke-width="2" />

      <rect x="490" y="30" width="170" height="120" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
      <text x="575" y="60" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Prediction Output</text>
      <text x="575" y="88" fill="#ffffff" font-family="monospace" font-size="13" text-anchor="middle" font-weight="bold">R² = 0.78</text>
      <text x="575" y="110" fill="#a7f3d0" font-family="monospace" font-size="12" text-anchor="middle">RMSE = 6.03</text>
      <text x="575" y="132" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">FFA & Rendemen Yield</text>
    </g>`
  ),

  'ripeness-xgboost.svg': createSvg(
    'Oil Palm Fruit Ripeness Classification',
    'XGBoost • Physicochemical Features • LOOCV • 86% Accuracy & 0.86 Macro F1',
    `<g transform="translate(30, 30)">
      <rect x="40" y="30" width="180" height="120" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="130" y="60" fill="#f8fafc" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Physicochemical Data</text>
      <text x="130" y="85" fill="#38bdf8" font-family="monospace" font-size="10" text-anchor="middle">1. Moisture Content</text>
      <text x="130" y="105" fill="#38bdf8" font-family="monospace" font-size="10" text-anchor="middle">2. Beta-Carotene</text>
      <text x="130" y="125" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Balanced 50 Samples</text>

      <line x1="220" y1="90" x2="280" y2="90" stroke="#10b981" stroke-width="2" />

      <rect x="280" y="30" width="160" height="120" rx="6" fill="#132338" stroke="#10b981" stroke-width="1.5" />
      <text x="360" y="60" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">XGBoost & LOOCV</text>
      <text x="360" y="85" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Leave-One-Out CV</text>
      <text x="360" y="105" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Prevents Small-N Leakage</text>
      <text x="360" y="125" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Gradient Boosted Trees</text>

      <line x1="440" y1="90" x2="500" y2="90" stroke="#10b981" stroke-width="2" />

      <rect x="500" y="30" width="160" height="120" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
      <text x="580" y="60" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Metrics Achieved</text>
      <text x="580" y="90" fill="#ffffff" font-family="monospace" font-size="13" text-anchor="middle" font-weight="bold">86% Accuracy</text>
      <text x="580" y="112" fill="#a7f3d0" font-family="monospace" font-size="12" text-anchor="middle">0.86 Macro F1</text>
      <text x="580" y="132" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Ripe vs Unripe Verdict</text>
    </g>`
  ),

  'government-dashboard.svg': createSvg(
    'West Sumatra Provincial Government Dashboards',
    'Automated Pandas ETL (20+ Sources) • Indeks Kinerja Daerah • 19 Regencies & Cities',
    `<g transform="translate(30, 30)">
      <rect x="30" y="30" width="170" height="120" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="115" y="58" fill="#f8fafc" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Data Aggregation</text>
      <text x="115" y="82" fill="#38bdf8" font-family="monospace" font-size="10" text-anchor="middle">20+ Source Portals</text>
      <text x="115" y="102" fill="#38bdf8" font-family="monospace" font-size="10" text-anchor="middle">BPS & Local Agencies</text>
      <text x="115" y="125" fill="#f59e0b" font-family="monospace" font-size="9" text-anchor="middle">50% Prep Time Cut</text>

      <line x1="200" y1="90" x2="260" y2="90" stroke="#10b981" stroke-width="2" />

      <rect x="260" y="30" width="160" height="120" rx="6" fill="#132338" stroke="#10b981" stroke-width="1.5" />
      <text x="340" y="58" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">ETL & Indexing</text>
      <text x="340" y="82" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Python & Pandas Pipeline</text>
      <text x="340" y="102" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Indeks Kinerja Daerah</text>
      <text x="340" y="125" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Standardized Normalization</text>

      <line x1="420" y1="90" x2="480" y2="90" stroke="#10b981" stroke-width="2" />

      <rect x="480" y="30" width="180" height="120" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
      <text x="570" y="58" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">4+ Interactive Dashboards</text>
      <text x="570" y="85" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">19 Regencies & Cities</text>
      <text x="570" y="108" fill="#a7f3d0" font-family="monospace" font-size="11" text-anchor="middle">Geospatial Tableau Maps</text>
      <text x="570" y="130" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Single-Click PDF Sharing</text>
    </g>`
  ),

  'saturute.svg': createSvg(
    'SatuRute: Community Ride-Sharing Prototype',
    'Astra Honda SDGs Future Leaders 2025 • Urban Mobility Analytics • Pekanbaru',
    `<g transform="translate(30, 30)">
      <rect x="50" y="30" width="180" height="120" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="140" y="60" fill="#38bdf8" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Pekanbaru Corridors</text>
      <text x="140" y="85" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Traffic Flow Density</text>
      <text x="140" y="105" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Commuter Bottlenecks</text>
      <text x="140" y="125" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Carbon Emission Baselines</text>

      <line x1="230" y1="90" x2="290" y2="90" stroke="#10b981" stroke-width="2" />

      <rect x="290" y="30" width="170" height="120" rx="6" fill="#132338" stroke="#10b981" stroke-width="1.5" />
      <text x="375" y="60" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Spatial Analytics</text>
      <text x="375" y="85" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Python Demographic Fit</text>
      <text x="375" y="105" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Tableau Route Clustering</text>
      <text x="375" y="125" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Student/Worker Pooling</text>

      <line x1="460" y1="90" x2="520" y2="90" stroke="#10b981" stroke-width="2" />

      <rect x="520" y="30" width="150" height="120" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
      <text x="595" y="60" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">SDGs Impact</text>
      <text x="595" y="88" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle" font-weight="bold">National Finalist</text>
      <text x="595" y="110" fill="#a7f3d0" font-family="monospace" font-size="10" text-anchor="middle">100+ Participants</text>
      <text x="595" y="130" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Astra Honda 2025</text>
    </g>`
  ),

  'academic-early.svg': createSvg(
    'Earlier Academic Coursework Projects',
    'Laravel Journal Search (Rocchio PRF) • Student Depression Classifier (Naive Bayes)',
    `<g transform="translate(30, 30)">
      <rect x="50" y="30" width="280" height="120" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="190" y="60" fill="#38bdf8" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Journal Search (Mar–Jun 2025)</text>
      <text x="190" y="85" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Laravel & Rocchio Algorithm</text>
      <text x="190" y="105" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Pseudo Relevance Feedback</text>
      <text x="190" y="125" fill="#f59e0b" font-family="monospace" font-size="9" text-anchor="middle">Metric verification: [metric]</text>

      <rect x="370" y="30" width="280" height="120" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="510" y="60" fill="#34d399" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">Depression Classifier (2024)</text>
      <text x="510" y="85" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Naive Bayes Probability</text>
      <text x="510" y="105" fill="#f8fafc" font-family="monospace" font-size="10" text-anchor="middle">Student Survey Dataset</text>
      <text x="510" y="125" fill="#f59e0b" font-family="monospace" font-size="9" text-anchor="middle">Accuracy verification: [accuracy]</text>
    </g>`
  )
};

for (const [filename, content] of Object.entries(svgs)) {
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log(`Successfully generated ${Object.keys(svgs).length} project SVG placeholders.`);
