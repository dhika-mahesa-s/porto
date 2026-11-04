import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'node:fs';
import path from 'node:path';

async function generatePublicCv() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const cvPath = path.join(publicDir, 'cv.pdf');

  // Preserve user-provided CV unless forced
  if (fs.existsSync(cvPath) && process.env.FORCE_GENERATE_CV !== 'true') {
    console.log(
      'Existing CV at public/cv.pdf preserved. Set FORCE_GENERATE_CV=true to regenerate programmatically.'
    );
    return;
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  let y = height - 50;

  // Header
  page.drawText('DHIKA MAHESA SYAPUTRA, S.Kom.', {
    x: 50,
    y,
    size: 18,
    font: fontBold,
    color: rgb(0.06, 0.09, 0.16)
  });

  y -= 18;
  page.drawText('AI Engineer – LLM applications, agentic RAG, computer vision', {
    x: 50,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.06, 0.72, 0.51) // Emerald accent
  });

  y -= 16;
  page.drawText(
    'Padang, West Sumatra, Indonesia  |  Email: dhikamahesa45@gmail.com  |  LinkedIn: in/dhika-mahesa-syaputra-456748374',
    {
      x: 50,
      y,
      size: 9,
      font: fontRegular,
      color: rgb(0.3, 0.35, 0.42)
    }
  );

  y -= 14;
  page.drawLine({
    start: { x: 50, y },
    end: { x: width - 50, y },
    thickness: 1,
    color: rgb(0.85, 0.88, 0.92)
  });

  // Section: Summary
  y -= 22;
  page.drawText('PROFESSIONAL SUMMARY', {
    x: 50,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.06, 0.09, 0.16)
  });

  y -= 14;
  const summaryLines = [
    'AI Engineer and Computer Science graduate focused on agentic RAG, computer vision, and AI for public-sector and',
    'agriculture data. Experienced in building multi-agent verification systems (LangGraph, FAISS/ChromaDB), offline edge AI',
    'models (MobileNetV2, TFLite on Android), and production computer vision pipelines (YOLOv8, 99.4% mAP@0.5).',
    'Committed to reliable, safety-aware AI systems with verifiable hallucination controls.'
  ];
  for (const line of summaryLines) {
    page.drawText(line, { x: 50, y, size: 9, font: fontRegular, color: rgb(0.2, 0.25, 0.3) });
    y -= 12;
  }

  // Section: Education & Honors
  y -= 10;
  page.drawText('EDUCATION & HONORS', {
    x: 50,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.06, 0.09, 0.16)
  });

  y -= 14;
  page.drawText('Universitas Riau  –  Bachelor of Computer Science (S.Kom.)', {
    x: 50,
    y,
    size: 9.5,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.2)
  });
  page.drawText('Aug 2022 – Jun 2026', {
    x: width - 150,
    y,
    size: 9,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.5)
  });

  y -= 12;
  page.drawText(
    'Dept. of Computer Science, Faculty of Mathematics and Natural Sciences  |  Cumulative GPA: 3.88 / 4.00',
    {
      x: 50,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );

  y -= 12;
  page.drawText(
    '• Digital Talent Scholarship (DTS) 2024 Awardee – Ministry of Communication and Informatics (Kominfo)',
    {
      x: 55,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );

  // Section: Core Technical Skills
  y -= 16;
  page.drawText('TECHNICAL SKILLS', {
    x: 50,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.06, 0.09, 0.16)
  });

  const skillLines = [
    {
      label: 'LLM & Agentic AI:',
      val: 'Gemini, Llama 3.3 70B, GPT-OSS 120B, Claude, prompt engineering, structured outputs, RAG, FAISS, ChromaDB, embeddings, LangChain, LangGraph, Langflow'
    },
    {
      label: 'ML & Computer Vision:',
      val: 'YOLOv8, ResNet50, MobileNetV2 (transfer learning), TensorFlow, TensorFlow Lite, XGBoost, MLP regression, scikit-learn, supervised & unsupervised learning, NIR spectral data analysis, model evaluation (precision, recall, mAP, F1, cross-validation)'
    },
    {
      label: 'Data & Analytics:',
      val: 'Python, SQL, Pandas, Tableau, Looker Studio, Excel, geospatial analysis, ETL pipelines'
    },
    {
      label: 'Backend & Edge:',
      val: 'Flask, FastAPI, Spring Boot, REST API integration, Gradio, Streamlit, Android (Java, MVVM, Room, SQLite), web server deployment'
    },
    {
      label: 'Cloud & Infrastructure:',
      val: 'Oracle Cloud Infrastructure (Certified Foundations Associate), Google Cloud Platform, Docker & CI/CD, MLOps, Git/GitHub, Google Colab'
    }
  ];

  for (const sk of skillLines) {
    y -= 13;
    page.drawText(sk.label, { x: 50, y, size: 8.5, font: fontBold, color: rgb(0.1, 0.15, 0.2) });
    y -= 11;
    page.drawText(sk.val, { x: 50, y, size: 8, font: fontRegular, color: rgb(0.25, 0.3, 0.35) });
  }

  // Section: Experience
  y -= 16;
  page.drawText('PROFESSIONAL EXPERIENCE & RESEARCH', {
    x: 50,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.06, 0.09, 0.16)
  });

  y -= 14;
  page.drawText('Research Assistant – Dept. of Computer Science Laboratory, Universitas Riau', {
    x: 50,
    y,
    size: 9.5,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.2)
  });
  page.drawText('Jun 2026 – Oct 2026', {
    x: width - 150,
    y,
    size: 9,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.5)
  });

  y -= 12;
  page.drawText(
    '• Appointed by official assignment letter to research YOLO and deep learning for oil palm plantations.',
    {
      x: 55,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );
  y -= 11;
  page.drawText(
    '• Trained YOLOv8 Ganoderma detector achieving 99.4% mAP@0.5 and 99.5% recall across 15,182 trees (230 test images).',
    {
      x: 55,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );
  y -= 11;
  page.drawText(
    '• Co-developed MLP Regressor on NIR spectral data (R² 0.78, RMSE 6.03) for non-destructive FFA/rendemen prediction.',
    {
      x: 55,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );

  y -= 15;
  page.drawText(
    'Data Analyst (Internship) – Communications, Informatics & Statistics Office, West Sumatra',
    {
      x: 50,
      y,
      size: 9.5,
      font: fontBold,
      color: rgb(0.1, 0.15, 0.2)
    }
  );
  page.drawText('Jan 2025 – Mar 2025', {
    x: width - 150,
    y,
    size: 9,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.5)
  });

  y -= 12;
  page.drawText(
    '• Built 4+ interactive Tableau/Python dashboards and automated 20+ source Pandas ETL pipeline, cutting prep time by 50%.',
    {
      x: 55,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );
  y -= 11;
  page.drawText(
    '• Formulated Indeks Kinerja Daerah and deployed geospatial maps covering 19 regencies and cities with single-click PDF export.',
    {
      x: 55,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );

  // Section: Selected Projects
  y -= 16;
  page.drawText('SELECTED PROJECTS & RESEARCH MANUSCRIPTS', {
    x: 50,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.06, 0.09, 0.16)
  });

  y -= 13;
  page.drawText(
    '• CiteCheck AI: LangGraph Agentic RAG verification system with Llama 3.3 70B & GPT-OSS 120B (84% accuracy, 25 pairs).',
    {
      x: 55,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );
  y -= 11;
  page.drawText(
    '• Kontrak Aman: Legal AI agent (Gemini 3.6 Flash, Langflow) detecting 6/6 red-flag clauses under Indonesian labor law.',
    {
      x: 55,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );
  y -= 11;
  page.drawText(
    '• Moon-Phase Fishing Advisory: 88.32% test acc. MobileNetV2 TFLite (5MB, 100-200ms) on Android. Under review at IJEEI (Scopus Q3).',
    {
      x: 55,
      y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.25, 0.3, 0.35)
    }
  );

  const pdfBytes = await pdfDoc.save();
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(cvPath, pdfBytes);
  console.log(
    'Public CV successfully generated at public/cv.pdf (public version without phone/street address).'
  );
}

generatePublicCv().catch(console.error);
