export type ProjectCategory = 'LLM and RAG' | 'Computer Vision' | 'Mobile' | 'Data and ML';

export interface ProjectImage {
  src: string;
  alt: string;
  isPlaceholder?: boolean;
}

export interface ProjectItem {
  slug: string;
  title: string;
  category: ProjectCategory;
  categorySlug: 'llm-rag' | 'cv' | 'mobile' | 'data-ml';
  programOrContext: string;
  summary: string;
  problem: string;
  solution: string;
  techTags: string[]; // Strictly from the approved skills list!
  results: string[];
  links: {
    github: string; // [add link] placeholder
    demo: string; // [add demo link] placeholder
  };
  /** First image is used as card thumbnail. Add more for the detail-page carousel. */
  images: ProjectImage[];
  details: {
    problemStatement: string[];
    approach: string[];
    resultsAnalysis: string[];
    whatWasLearned: string[];
  };
}

export const projectsData: ProjectItem[] = [
  {
    slug: 'citecheck-ai',
    title: 'CiteCheck AI',
    category: 'LLM and RAG',
    categorySlug: 'llm-rag',
    programOrContext:
      'Maju Bareng AI by Hacktiv8: LLM-Based Tools and Gemini API Integration for Data Scientists',
    summary:
      'Agentic RAG citation verification system checking whether thesis claims are supported, contradicted, or unrelated to uploaded source papers.',
    problem:
      'Academic claims in theses frequently suffer from inaccurate citations or hallucinated source references that manual peer review struggles to audit at scale.',
    solution:
      'Constructed a LangGraph agent with conditional routing (Retrieve → Evaluate → External Search) utilizing Llama 3.3 70B, GPT-OSS 120B, Google Generative AI embeddings, FAISS, and ChromaDB with strict exact-match prompts to prevent over-helpful hallucinations.',
    techTags: [
      'LangGraph',
      'Llama 3.3 70B',
      'GPT-OSS 120B',
      'embeddings',
      'FAISS',
      'ChromaDB',
      'prompt engineering',
      'Gradio'
    ],
    results: [
      '84% verdict accuracy achieved across 25 evaluated claim–paper benchmark pairs',
      'Autonomous fallback routing to Semantic Scholar API via LLM query rewriter when local evidence is insufficient',
      'Conversation memory integration using MemorySaver for multi-turn claim refinement'
    ],
    links: {
      github: 'https://github.com/dhika-mahesa-s/CiteCheck-AI',
      demo: 'https://citecheck-ai.streamlit.app/'
    },
    images: [
      {
        src: '/img/projects/citecheck-ai.svg',
        alt: 'CiteCheck AI LangGraph agentic RAG architecture and citation verification workflow',
        isPlaceholder: true
      }
    ],
    details: {
      problemStatement: [
        'Undergraduate and postgraduate academic writing often includes unsubstantiated assertions or mismatched citations. Verifying whether an empirical claim is truly backed by a cited paper requires hours of manual cross-referencing.',
        'Standard naive RAG systems often produce false positives by acting "over-helpfully," inferring conclusions that the cited authors never made.'
      ],
      approach: [
        'Engineered an agentic workflow using LangGraph featuring conditional state graph transitions: ingestion → semantic retrieval → claim alignment evaluation → external search fallback.',
        'Leveraged Llama 3.3 70B and GPT-OSS 120B coupled with Google Generative AI embeddings, benchmarking FAISS and ChromaDB vector retrieval indices.',
        'Implemented strict exact-match prompting rules that prohibit optimistic extrapolations: claims must be explicitly supported, directly contradicted, or marked unrelated.',
        'Equipped the agent with conversation memory via MemorySaver and an automated LLM query rewriter interfacing with the Semantic Scholar API when vector stores lacked coverage.',
        'Shipped an interactive researcher interface built with Gradio.'
      ],
      resultsAnalysis: [
        'Attained 84% verdict accuracy across 25 curated claim–paper test pairs with zero fabricated citations.',
        'Eliminated hallucinated validation verdicts through negative-constraint verification prompts.'
      ],
      whatWasLearned: [
        'Strict negative constraints in prompt engineering are essential to prevent LLMs from hallucinating support when evidence is merely topical.',
        'Graph-based conditional routing in LangGraph prevents unnecessary expensive external API calls by validating vector similarity thresholds first.'
      ]
    }
  },
  {
    slug: 'kontrak-aman',
    title: 'Kontrak Aman',
    category: 'LLM and RAG',
    categorySlug: 'llm-rag',
    programOrContext:
      'IBM SkillsBuild University Education Program: Legal – AI Agent for Legal, via Hacktiv8',
    summary:
      'Employment contract risk checker for fresh graduates identifying high-risk clauses against Indonesian labor law (UU Ketenagakerjaan).',
    problem:
      'Fresh graduates entering the Indonesian workforce often sign employment contracts containing illegal probationary terms or uncompensated overtime due to complex legal jargon.',
    solution:
      'Built an end-to-end Langflow pipeline (file ingestion → structured clause extraction → JSON parser → risk-analysis LLM → chat output) powered by Gemini 3.6 Flash with transparent not-legal-advice safeguards.',
    techTags: ['Gemini', 'Langflow', 'structured outputs', 'prompt engineering'],
    results: [
      'Detected 6 out of 6 seeded red-flag clauses on a fictitious test contract',
      'Rated the synthetic high-risk contract 8/10 risk score with plain-language explanations',
      'Delivered a 10-category breakdown with questions to ask HR and UU Ketenagakerjaan citations'
    ],
    links: {
      github: 'https://github.com/dhika-mahesa-s/kontrak_aman_space',
      demo: 'https://kontrakamanspace.streamlit.app/'
    },
    images: [
      {
        src: '/img/projects/flow ai agent.png',
        alt: 'Kontrak Aman Langflow pipeline and architecture diagram showing sequential document ingestion, clause extraction, JSON parsing, risk analysis, and chat output',
        isPlaceholder: true
      },
      {
        src: '/img/projects/output 1 kontrak aman.jpg',
        alt: 'Kontrak Aman chat interface showing risk analysis output with 10-category breakdown and UU Ketenagakerjaan citations',
        isPlaceholder: true
      },
      {
        src: '/img/projects/output 2 kontrak aman.jpg',
        alt: 'Kontrak Aman chat interface showing risk analysis output with plain-language explanations and questions to ask HR',
        isPlaceholder: true
      },
      {
        src: '/img/projects/output 3 kontrak aman.jpg',
        alt: 'Kontrak Aman chatting section for user to ask questions about specific clauses and receive actionable insights',
        isPlaceholder: true
      },
    ],
    details: {
      problemStatement: [
        'Entry-level job applicants in Indonesia frequently encounter predatory contract stipulations—such as unlawful wage withholding during probation or unbounded overtime—without access to legal counsel.',
        'Providing AI legal assistance requires strict guardrails to prevent unauthorized practice of law while delivering actionable, plain-language insights.'
      ],
      approach: [
        'Constructed a sequential Langflow pipeline: document file ingestion → structured clause extraction → robust JSON parser → risk-analysis reasoning LLM → interactive chat response.',
        'Configured Gemini 3.6 Flash with structured output schemas to categorize findings into a 10-category labor law compliance report.',
        'Grounded all evaluation rules in Indonesian statutory law (UU Ketenagakerjaan) and generated tailored questions for candidates to present to HR representatives.',
        'Integrated safety safeguards: explicit not-legal-advice disclaimers and validation strictly limited to synthetic benchmark test data.'
      ],
      resultsAnalysis: [
        'Tested on a synthetic employment contract seeded with 6 critical red-flag clauses (including uncompensated probation and unpaid overtime), successfully detecting 6/6 (100%).',
        'Accurately scored the contract at 8/10 (high risk) while supplying clear rationale for each flag.'
      ],
      whatWasLearned: [
        'Grounding legal analysis strictly in statutory references prevents generalized LLM assumptions and ensures defensible risk ratings.',
        'Enforcing structured JSON outputs between pipeline nodes guarantees that downstream chat renderers receive predictable schema fields.'
      ]
    }
  },
  {
    slug: 'moon-phase-fishing-recommendation',
    title: 'Moon-Phase Classification & Fishing Recommendation System',
    category: 'Mobile',
    categorySlug: 'mobile',
    programOrContext: 'Undergraduate thesis, Universitas Riau',
    summary:
      'Offline-first Android edge AI app running an 88.32% accurate MobileNetV2 TFLite model combined with real-time ocean data for artisanal fishermen.',
    problem:
      'Artisanal fishermen lack access to reliable, real-time lunar and tidal intelligence at sea where cellular connectivity is intermittent or absent.',
    solution:
      'Fine-tuned an ImageNet-pretrained MobileNetV2 across 3 progressive transfer-learning phases, quantized to TensorFlow Lite, and embedded into an offline-first Android app integrated with the Stormglass API.',
    techTags: [
      'MobileNetV2 (transfer learning)',
      'TensorFlow',
      'TensorFlow Lite',
      'Android (Java, MVVM, Room, SQLite)',
      'REST API integration',
      'model evaluation (precision, recall, mAP, F1, cross-validation)'
    ],
    results: [
      '88.32% test accuracy on 8-class moon-phase classification across 291 held-out test images',
      '77% model compression (from 22 MB down to 5 MB) via TensorFlow Lite optimization',
      '100–200 ms on-device inference latency per image on mobile CPU',
      'Manuscript under review at Indonesian Journal of Electrical Engineering and Informatics (IJEEI, Scopus-indexed Q3)'
    ],
    links: {
      github: '[add link]',
      demo: '[add demo link]'
    },
    images: [
      {
        src: '/img/projects/moon-phase.svg',
        alt: 'Moon-phase classification Android application interface and inference benchmark',
        isPlaceholder: true
      }
    ],
    details: {
      problemStatement: [
        'Lunar cycles dictate ocean tidal movements and fish feeding behaviors. Coastal fishermen in Indonesia traditionally rely on intuition, which is vulnerable to unpredictable weather patterns.',
        'Existing mobile weather apps require continuous high-speed cellular data, rendering them useless offshore.'
      ],
      approach: [
        'Executed a 3-phase progressive transfer learning protocol on ImageNet-pretrained MobileNetV2: feature extractor freeze, intermediate block fine-tuning, and full top-layer adaptation.',
        'Quantized the resulting TensorFlow model into TensorFlow Lite format, slashing footprint from 22 MB to 5 MB for rapid mobile loading.',
        'Developed a native Android application using Java, MVVM architecture, Room, and SQLite local storage for an offline-first experience.',
        'Created a rule-based recommendation engine yielding 5 distinct advisory tiers by fusing on-device moon-phase predictions with cached ocean weather feeds from the Stormglass API.'
      ],
      resultsAnalysis: [
        'Achieved 88.32% test accuracy on 291 strictly held-out real-world moon images across 8 lunar phases.',
        'Recorded 100–200 ms inference execution times on budget Android hardware without network roundtrips.',
        'Authored research manuscript currently under peer review at the Scopus-indexed Indonesian Journal of Electrical Engineering and Informatics (IJEEI, Q3).'
      ],
      whatWasLearned: [
        'Progressive multi-stage fine-tuning avoids catastrophic forgetting when adapting deep vision networks to celestial and astronomical datasets.',
        'Combining on-device ML with local SQLite caching delivers continuous utility in mission-critical edge environments.'
      ]
    }
  },
  {
    slug: 'ganoderma-detection-oil-palm',
    title: 'Ganoderma Disease Detection in Oil Palm',
    category: 'Computer Vision',
    categorySlug: 'cv',
    programOrContext: 'Research Assistantship, Universitas Riau Computer Science Lab',
    summary:
      'High-throughput computer vision models for Ganoderma basal stem rot detection in oil palm plantations, evaluating YOLOv8 and ResNet50.',
    problem:
      'Ganoderma basal stem rot devastates oil palm plantations. Manual visual field inspection requires 2 to 5 minutes per tree, making plantation-wide surveillance cost-prohibitive.',
    solution:
      'Trained and evaluated two separate vision architectures: a YOLOv8 detector for high-speed aerial/field tree bounding-box localization and a ResNet50 classifier for annotated patch validation (note: models are evaluated separately and not yet combined into one pipeline).',
    techTags: [
      'YOLOv8',
      'ResNet50',
      'supervised and unsupervised learning',
      'model evaluation (precision, recall, mAP, F1, cross-validation)'
    ],
    results: [
      '99.4% mAP@0.5 and 99.5% recall on unhealthy tree class with YOLOv8 (230 test images, 15,182 trees)',
      '~18 ms per image inference (~66 trees/frame) on Tesla T4, versus 2–5 minutes per tree for manual inspection',
      '0.80 precision and recall achieved by ResNet50 classifier on 656 annotated images',
      'Models evaluated separately; explicitly not yet combined into a single pipeline'
    ],
    links: {
      github: '[add link]',
      demo: '[add demo link]'
    },
    images: [
      {
        src: '/img/projects/ganoderma-yolov8.svg',
        alt: 'YOLOv8 bounding box detection of Ganoderma disease in oil palm plantation imagery',
        isPlaceholder: true
      }
    ],
    details: {
      problemStatement: [
        'Ganoderma boninense is the most destructive fungal pathogen threatening Southeast Asian oil palm agriculture, leading to structural tree failure and massive crop loss.',
        'Manual inspection takes 2 to 5 minutes per tree across tens of thousands of hectares, delaying quarantine treatments until infection is irreversible.'
      ],
      approach: [
        'Trained a YOLOv8 deep object detector on plantation imagery containing 15,182 individual palm tree instances across 230 test scenes.',
        'Separately trained a ResNet50 deep convolutional network on 656 annotated close-up tree symptom images to evaluate diagnostic feature representation.',
        'Evaluated both architectures independently with rigorous class-specific precision, recall, and mAP metrics on dedicated GPU hardware (Tesla T4).',
        'Maintained rigorous experimental separation: the YOLOv8 and ResNet50 models are separate investigations and are not combined into a single pipeline.'
      ],
      resultsAnalysis: [
        'YOLOv8 achieved 99.4% mAP@0.5 and 99.5% recall on the unhealthy palm class.',
        'Processed an entire frame of roughly 66 trees in ~18 ms on a Tesla T4 GPU, delivering orders-of-magnitude acceleration over manual inspection (2–5 min/tree).',
        'ResNet50 scored 0.80 precision and 0.80 recall on 656 annotated sample images.'
      ],
      whatWasLearned: [
        'Single-stage anchor-free detectors like YOLOv8 excel at dense crown and canopy instance localization under variable sunlight.',
        'Transparently documenting separate research pipelines prevents over-claiming production integration before end-to-end deployment is validated.'
      ]
    }
  },
  {
    slug: 'nir-ffa-rendemen-prediction',
    title: 'Free Fatty Acid (FFA) & Rendemen Prediction from NIR Spectra',
    category: 'Data and ML',
    categorySlug: 'data-ml',
    programOrContext: 'Research Assistantship, Universitas Riau Computer Science Lab',
    summary:
      'Multilayer Perceptron regression model predicting FFA and extraction yield (rendemen) from multi-angle near-infrared spectral data.',
    problem:
      'Determining palm oil quality (free fatty acids and rendemen) traditionally requires destructive, time-consuming wet-chemical titration in laboratory facilities.',
    solution:
      'Co-developed an MLP Regressor on non-destructive near-infrared (NIR) spectral absorbance measurements captured across multiple physical angles.',
    techTags: [
      'MLP regression',
      'NIR spectral data analysis',
      'scikit-learn',
      'Python',
      'model evaluation (precision, recall, mAP, F1, cross-validation)'
    ],
    results: [
      'R² score of 0.78 achieved on 64 palm oil fruit samples captured from diverse scanning angles',
      'Root Mean Squared Error (RMSE) held to 6.03 across prediction trials',
      'Contribution to scientific manuscript in preparation'
    ],
    links: {
      github: '[add link]',
      demo: '[add demo link]'
    },
    images: [
      {
        src: '/img/projects/nir-prediction.svg',
        alt: 'NIR spectral absorbance curve analysis and MLP regression prediction plot',
        isPlaceholder: true
      }
    ],
    details: {
      problemStatement: [
        'In palm oil milling, high Free Fatty Acid (FFA) content lowers crude palm oil market grading. Conventional chemical analysis destroys samples and delays processing plant feedback by hours.',
        'Near-infrared spectroscopy offers rapid non-destructive scanning, but high-dimensional spectral noise requires targeted machine learning regression.'
      ],
      approach: [
        'Gathered and preprocessed multi-angle near-infrared spectral absorbance measurements from 64 distinct palm fruit bunches.',
        'Built a Multilayer Perceptron (MLP) Regressor in Python using scikit-learn, optimizing hidden layer configurations and regularization terms.',
        'Validated regression robustness across angle variations to model physical spectrometer positioning realities.'
      ],
      resultsAnalysis: [
        'Attained an R² of 0.78 alongside an RMSE of 6.03 on the 64 multi-angle spectral dataset.',
        'Demonstrated strong correlation between non-destructive NIR bands and destructive chemical lab baselines.'
      ],
      whatWasLearned: [
        'Multi-angle spectral data requires careful normalization to prevent surface optical scattering from skewing dense neural network weights.',
        'Compact MLP architectures outperform over-parameterized models on small-sample agricultural spectroscopic datasets.'
      ]
    }
  },
  {
    slug: 'oil-palm-fruit-ripeness-classification',
    title: 'Oil Palm Fruit Ripeness Physicochemical Classification',
    category: 'Data and ML',
    categorySlug: 'data-ml',
    programOrContext: 'Research Project, Universitas Riau',
    summary:
      'XGBoost classification identifying ripe vs. unripe oil palm fruit from physicochemical features using Leave-One-Out Cross-Validation.',
    problem:
      'Harvesting unripened fruit bunches drastically reduces oil yield, yet visual surface color can be deceptive under shaded plantation canopies.',
    solution:
      'Trained an XGBoost model on moisture content and beta-carotene features, leveraging Leave-One-Out Cross-Validation (LOOCV) to prevent data leakage and split variance on small sample sizes.',
    techTags: [
      'XGBoost',
      'scikit-learn',
      'Pandas',
      'Python',
      'model evaluation (precision, recall, mAP, F1, cross-validation)'
    ],
    results: [
      '86% accuracy and 0.86 macro F1 score on a balanced dataset of 50 samples',
      'LOOCV evaluation rigorously applied because a fixed train/test split would leave too few test instances',
      'Identified moisture content and beta-carotene as reliable quantitative indicators of fruit maturity'
    ],
    links: {
      github: '[add link]',
      demo: '[add demo link]'
    },
    images: [
      {
        src: '/img/projects/ripeness-xgboost.svg',
        alt: 'XGBoost feature separation between ripe and unripe oil palm fruit physicochemical markers',
        isPlaceholder: true
      }
    ],
    details: {
      problemStatement: [
        'Under-ripe palm fruits yield less oil and high FFA, causing financial penalties for farmers. Visual assessment by plantation workers is subjective and error-prone.',
        'Developing an empirical diagnostic tool required high confidence on a compact 50-sample dataset where conventional 80/20 train-test splits would yield statistically volatile test partitions.'
      ],
      approach: [
        'Analyzed two core physicochemical features: moisture content and beta-carotene concentrations across a balanced 50-sample cohort.',
        'Trained an XGBoost gradient boosted classifier utilizing scikit-learn and Pandas.',
        'Employed Leave-One-Out Cross-Validation (LOOCV), iteratively training on 49 instances and testing on 1 instance across 50 full cycles to obtain an unbiased performance estimate.'
      ],
      resultsAnalysis: [
        'Attained 86% classification accuracy and 0.86 macro F1 score across all 50 folds.',
        'Confirmed that combining beta-carotene and moisture metrics creates a clean decision boundary between ripe and unripe bunches.'
      ],
      whatWasLearned: [
        'On constrained biological datasets, Leave-One-Out Cross-Validation is essential to prevent misleading optimism caused by favorable random test partitions.',
        'Gradient boosted trees provide stable classification even when feature dimensionality is deliberately kept minimal for field deployability.'
      ]
    }
  },
  {
    slug: 'provincial-government-dashboards',
    title: 'Provincial Government Dashboards & ETL Pipeline',
    category: 'Data and ML',
    categorySlug: 'data-ml',
    programOrContext:
      'Data Analyst Internship, Dinas Komunikasi, Informatika, dan Statistik Provinsi Sumatera Barat (Diskominfotik Pemprov Sumbar, Jan–Mar 2025)',
    summary:
      'Automated multi-source data pipeline and 4+ interactive Tableau/Python dashboards covering 19 regencies and cities for provincial policymakers.',
    problem:
      'Disparate regional data fragmented across 20+ sources (BPS and internal portals) required 5 manual steps to compile, slowing executive reporting for 19 regencies/cities.',
    solution:
      'Engineered a Pandas and Excel data harmonization pipeline, redesigned dashboards with dynamic filters and one-click PDF export, and developed the custom Indeks Kinerja Daerah with geospatial maps.',
    techTags: ['Python', 'Pandas', 'Tableau', 'Excel', 'geospatial analysis', 'ETL pipelines'],
    results: [
      '50% reduction in dataset preparation time across 20+ municipal and national data feeds',
      '4+ interactive dashboards deployed covering all 19 West Sumatra regencies and cities',
      'Reduced report sharing from 5 manual export steps down to a single click',
      'Formulated regional performance index (Indeks Kinerja Daerah) and geospatial Tableau visualizations'
    ],
    links: {
      github: '[add link]',
      demo: '[add demo link]'
    },
    images: [
      {
        src: '/img/projects/government-dashboard.svg',
        alt: 'West Sumatra provincial government dashboard with geospatial regional performance index',
        isPlaceholder: true
      }
    ],
    details: {
      problemStatement: [
        'Provincial leadership in West Sumatra required rapid visibility into socio-economic indicators across 19 administrative regencies and cities.',
        'Data analysts spent days manually aggregating files from Central Statistics Agency (BPS) archives and multiple local agency databases, causing latency in quarterly governance briefings.'
      ],
      approach: [
        'Developed an automated ETL pipeline with Python and Pandas to ingest, clean, and consolidate statistics from over 20 disparate sources.',
        'Architected 4+ Tableau dashboards featuring dynamic filtering, geospatial thematic mapping, and streamlined single-click PDF export.',
        'Collaborated with provincial analysts to synthesize the Indeks Kinerja Daerah (Regional Performance Index) for standardized inter-regency benchmarking.'
      ],
      resultsAnalysis: [
        'Cut manual dataset preparation time by 50%, enabling same-day reporting cycles for high-priority policy data.',
        'Streamlined executive report sharing from 5 manual steps to 1 click, accelerating executive distribution.'
      ],
      whatWasLearned: [
        'High-impact data engineering in government hinges on robust data normalization and intuitive interfaces that non-technical leaders can navigate effortlessly.',
        'Geospatial representations significantly improve executive decision velocity compared to raw numerical tables.'
      ]
    }
  },
  {
    slug: 'saturute-ride-sharing',
    title: 'SatuRute – Community Ride-Sharing Prototype',
    category: 'Data and ML',
    categorySlug: 'data-ml',
    programOrContext: 'Astra Honda SDGs Future Leaders 2025 (National program, 100+ participants)',
    summary:
      'Community ride-sharing prototype addressing traffic congestion and carbon emissions in Pekanbaru through Python and Tableau demographic analytics.',
    problem:
      'Rapid urban expansion and private motorcycle dominance in Pekanbaru contribute to escalating carbon emissions and corridor traffic bottlenecks.',
    solution:
      'Designed SatuRute, a community-driven ride-sharing concept backed by demographic commuter analysis, corridor transit mapping, and emissions reduction models.',
    techTags: ['Python', 'Tableau', 'geospatial analysis'],
    results: [
      'Selected participant representing Pekanbaru in Astra Honda SDGs Future Leaders 2025 among 100+ national candidates',
      'Synthesized traffic flow and commuter demographic models with Python and Tableau',
      'Quantified target emissions reduction projections for high-density academic and commercial corridors'
    ],
    links: {
      github: '[add link]',
      demo: '[add demo link]'
    },
    images: [
      {
        src: '/img/projects/saturute.svg',
        alt: 'SatuRute community ride-sharing corridor analysis and demographic distribution map',
        isPlaceholder: true
      }
    ],
    details: {
      problemStatement: [
        'Urban transportation in Pekanbaru relies heavily on single-occupancy two-wheelers, creating severe peak-hour bottlenecks around university and commercial hubs.',
        'Developing a viable sustainability initiative required hard demographic data and traffic flow modeling aligned with UN Sustainable Development Goals (SDGs).'
      ],
      approach: [
        'Analyzed Pekanbaru commuter patterns and transit flow data using Python and Tableau.',
        'Formulated a corridor-based ride-sharing prototype architecture connecting students and young professionals along major arterials.',
        'Presented the data-driven sustainability framework at the national Astra Honda SDGs Future Leaders 2025 cohort.'
      ],
      resultsAnalysis: [
        'Recognized among top nationwide youth innovators in a selective cohort of 100+ candidates.',
        'Delivered reproducible spatial models demonstrating viable ride-pooling routes across Pekanbaru.'
      ],
      whatWasLearned: [
        'Sustainable urban mobility solutions require grounding algorithmic matching concepts in local behavioral commuter norms.',
        'Cross-disciplinary presentation of demographic data is vital when pitching technical prototypes to multi-stakeholder evaluation panels.'
      ]
    }
  }
];
