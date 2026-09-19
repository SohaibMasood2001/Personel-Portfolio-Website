/** Serializable CMS defaults for Sohaib Masood's personal portfolio. */

export const CONTENT_SECTIONS = [
  "services",
  "process",
  "why_us",
  "testimonials",
  "faqs",
  "tech_advanced",
  "tech_shipping",
  "hero_titles",
  "about_story",
  "about_milestones",
] as const;

export type ContentSection = (typeof CONTENT_SECTIONS)[number];

export type TechItemData = { name: string; color: string };

export type ServiceData = {
  icon: string;
  title: string;
  description: string;
  accent: string;
};

export type ProcessData = {
  step: number;
  title: string;
  description: string;
  icon: string;
};

export type WhyUsData = {
  icon: string;
  title: string;
  description: string;
};

export type TestimonialData = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  rating?: number;
};

export type FaqData = { question: string; answer: string };

export type AboutStoryData = {
  paragraphs: string[];
};

export type MilestoneData = {
  year: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
};

export const defaultServices: ServiceData[] = [
  {
    icon: "Bot",
    title: "Agentic AI & Voice Pipelines",
    description:
      "Design and deploy autonomous AI agents, real-time voice assistants with Vapi & OpenAI, and multi-tool orchestration pipelines with tool calling, MCP integrations, and low-latency interactions.",
    accent: "#E8536A",
  },
  {
    icon: "Workflow",
    title: "LLM, RAG & Fine-Tuning",
    description:
      "Build high-precision RAG systems with Claude MCP, advanced Reasoning Models, vector search, and structured retrieval. Fine-tune domain-specific Vision Models for classification, document understanding, and custom datasets.",
    accent: "#D4A853",
  },
  {
    icon: "Cpu",
    title: "AI Automation & RPA",
    description:
      "Automate complex business workflows combining LLM reasoning with UiPath RPA and n8n orchestration — for document processing, decision pipelines, and intelligent exception handling.",
    accent: "#FF7B8A",
  },
  {
    icon: "Brain",
    title: "AI System Integration",
    description:
      "Connect AI models to enterprise tools and APIs using Claude MCP, structured outputs, and guardrails — making AI components production-safe, observable, and reliably maintainable.",
    accent: "#1B2A4A",
  },
];

export const defaultProcess: ProcessData[] = [
  {
    step: 1,
    title: "Problem Scoping",
    description: "Analyse requirements, identify automation opportunities, and select the right AI stack.",
    icon: "Search",
  },
  {
    step: 2,
    title: "Model & System Design",
    description: "Choose optimal LLMs, vector indexes, agent frameworks, and API architectures.",
    icon: "PenTool",
  },
  {
    step: 3,
    title: "Pipeline Engineering",
    description: "Build agent pipelines, wire LLM tools, connect APIs, and integrate automation flows.",
    icon: "Hammer",
  },
  {
    step: 4,
    title: "Training & Fine-Tuning",
    description: "Fine-tune domain models (LLMs, OCR) on curated datasets, run full evaluation cycles.",
    icon: "ShieldCheck",
  },
  {
    step: 5,
    title: "Deployment & Monitoring",
    description: "Ship to production with logging, retry logic, and real-time telemetry to stay reliable.",
    icon: "Rocket",
  },
  {
    step: 6,
    title: "Optimise & Iterate",
    description: "Analyse latency, cut token costs, tune guardrails, and continuously improve output quality.",
    icon: "RefreshCw",
  },
];

export const defaultWhyUs: WhyUsData[] = [
  {
    icon: "Bot",
    title: "Specialized in Agentic AI",
    description:
      "Hands-on experience deploying live voice agents, multi-agent pipelines, and MCP-integrated AI systems in production environments.",
  },
  {
    icon: "Brain",
    title: "LLM & Fine-Tuning Depth",
    description:
      "From advanced RAG pipelines with Claude MCP and vector retrieval to full model fine-tuning pipelines (PP-OCRv4, DeepSeek R1) on domain-specific datasets.",
  },
  {
    icon: "Cpu",
    title: "End-to-End AI Automation",
    description:
      "Combine LLM reasoning with UiPath RPA and n8n workflows for intelligent document processing and business automation at scale.",
  },
  {
    icon: "ShieldCheck",
    title: "Production Mindset",
    description:
      "Structured outputs, guardrails, retry logic, and production monitoring built into every AI system from day one.",
  },
];

export const defaultTestimonials: TestimonialData[] = [
  {
    quote:
      "Sohaib developed real-time voice agents and automated Playwright pipelines that significantly accelerated our engineering workflows. Outstanding grasp of modern AI.",
    name: "Engineering Lead",
    role: "Octathorn Technologies",
    rating: 5,
  },
  {
    quote:
      "His final year project AgriConnect combined a complex Django marketplace with deep learning crop disease detection seamlessly. Diligent, resourceful, and technically sound.",
    name: "Project Supervisor",
    role: "COMSATS University",
    rating: 5,
  },
  {
    quote:
      "Quickly integrated RAG pipelines and Hugging Face NLP models during his internship. An engineer who genuinely loves solving difficult software problems.",
    name: "Technical Mentor",
    role: "Eziline Software House",
    rating: 5,
  },
];

export const defaultFaqs: FaqData[] = [
  {
    question: "What are your core technical specializations?",
    answer:
      "My primary expertise is Agentic AI, Generative AI, LLM Engineering, and AI Automation. I work hands-on with Claude (MCP & Agents), Vapi real-time voice AI, PP-OCRv4 custom OCR fine-tuning, n8n advanced workflows, and UiPath RPA.",
  },
  {
    question: "Have you worked on model training and fine-tuning?",
    answer:
      "Yes. I am currently fine-tuning PP-OCRv4 on a custom 24K-image dataset of specific font styles, running the full pipeline from data preprocessing, model training, and evaluation to production-ready export. I have also worked with DeepSeek R1 reasoning and fine-tuning pipelines.",
  },
  {
    question: "What projects have you built?",
    answer:
      "Key projects include AgriConnect (agriculture marketplace with deep learning disease detection), ModAgent (desktop mod install agent), DualHire (two-agent agentic hiring platform), Smart Islamic Guider (RAG over Quran & Hadith), MedCare Clinic, and Resume Studio.",
  },
  {
    question: "Are you available for contract or full-time roles?",
    answer:
      "Yes, I am open to innovative AI engineering roles, high-impact consulting, and agentic AI development opportunities. Reach out via email or LinkedIn.",
  },
];

export const defaultTechAdvanced: TechItemData[] = [
  { name: "Python", color: "#3776AB" },
  { name: "Claude 3.7 / MCP", color: "#D97706" },
  { name: "OpenAI", color: "#10B981" },
  { name: "Vapi Voice AI", color: "#D4A853" },
  { name: "DeepSeek R1 / V3", color: "#3B82F6" },
  { name: "PP-OCRv4 / OCR", color: "#E8536A" },
  { name: "Transformers", color: "#FBBF24" },
  { name: "FastAPI", color: "#009688" },
  { name: "Node.js", color: "#339933" },
  { name: "React / Next.js", color: "#61DAFB" },
  { name: "Django & REST", color: "#092E20" },
];

export const defaultTechShipping: TechItemData[] = [
  { name: "Claude MCP", color: "#D97706" },
  { name: "n8n Workflows", color: "#EA4B71" },
  { name: "UiPath RPA", color: "#FA4616" },
  { name: "PaddleOCR / PP-OCRv4", color: "#E8536A" },
  { name: "FAISS & Vector DBs", color: "#EC4899" },
  { name: "Playwright", color: "#2EAD33" },
  { name: "AWS EC2", color: "#FF9900" },
  { name: "Linux / Ubuntu", color: "#E95420" },
  { name: "Docker", color: "#2496ED" },
  { name: "PostgreSQL & MySQL", color: "#336791" },
];

export const defaultHeroTitles: string[] = [
  "AI Engineer",
  "Generative AI Specialist",
  "Agentic AI Architect",
  "LLM & Fine-Tuning Engineer",
];

export const defaultAboutStory: AboutStoryData = {
  paragraphs: [
    "I am an AI Engineer based in Islamabad, Pakistan, specializing in Generative AI, Agentic Systems, and intelligent automation. My work spans building real-time voice agents, multi-agent pipelines, RAG-based chatbots, and fine-tuning domain-specific models — turning advanced AI research into production-ready systems.",
    "Currently at Octathorn Technologies as an AI Automation Engineer, I design agentic AI systems using Claude (MCP & agent tool calling), Vapi real-time voice agents, custom OCR fine-tuning (PP-OCRv4), n8n workflow orchestration, and UiPath RPA. I am also running a full fine-tuning pipeline for PP-OCRv4 on a 24K-image custom font dataset — from data preprocessing and model training through evaluation and export.",
    "I graduated with a BS in Software Engineering from COMSATS University (CGPA 3.21). My portfolio includes AgriConnect (deep learning crop disease detection + marketplace), ModAgent (desktop mod install agent), DualHire (two-agent agentic hiring platform), Smart Islamic Guider (LLaMA 3 RAG over Quran & Hadith), MedCare Clinic, and Resume Studio.",
  ],
};

export const defaultAboutMilestones: MilestoneData[] = [
  {
    year: "Feb 2026 – Present",
    title: "AI Automation Engineer — Octathorn Technologies",
    description:
      "Design and deploy agentic AI systems, real-time voice agents (Vapi & OpenAI), multi-agent decision pipelines, Claude MCP integrations, and UiPath/n8n automation. Currently fine-tuning PP-OCRv4 on a 24K-image custom font dataset — full pipeline from training to evaluation.",
    icon: "Bot",
    accent: "#E8536A",
  },
  {
    year: "Sep 2025 – Jan 2026",
    title: "Automation Engineer Intern — Octathorn Technologies",
    description:
      "Cross-browser automation with Playwright, Ubuntu Linux cloud management on AWS EC2, and desktop RPA with UiPath via RDP.",
    icon: "Cpu",
    accent: "#D4A853",
  },
  {
    year: "Jan 2025 – Apr 2025",
    title: "Python Developer Intern — Eziline Software House",
    description:
      "Built intelligent LLM applications and RAG pipelines with Claude, DeepSeek, and FAISS vector search, deployed NLP and computer vision models via Flask APIs.",
    icon: "Code",
    accent: "#1B2A4A",
  },
  {
    year: "March 2025",
    title: "BS Software Engineering — COMSATS University",
    description:
      "CGPA 3.21. Majors: Artificial Intelligence, Machine Learning, Data Mining, and Algorithms.",
    icon: "Award",
    accent: "#10B981",
  },
  {
    year: "Dec 2024",
    title: "AgriConnect — Final Year Project",
    description:
      "Digital agriculture marketplace with deep learning crop disease screening, multi-role dashboards, and digital wallet. Built with Python, Keras, and Django.",
    icon: "Package",
    accent: "#E8536A",
  },
];

export const DEFAULT_CONTENT: Record<ContentSection, unknown> = {
  services: defaultServices,
  process: defaultProcess,
  why_us: defaultWhyUs,
  testimonials: defaultTestimonials,
  faqs: defaultFaqs,
  tech_advanced: defaultTechAdvanced,
  tech_shipping: defaultTechShipping,
  hero_titles: defaultHeroTitles,
  about_story: defaultAboutStory,
  about_milestones: defaultAboutMilestones,
};
