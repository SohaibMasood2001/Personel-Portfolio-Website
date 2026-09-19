/** Portable catalog for Sohaib Masood's personal portfolio. */

export type FeatureCard = { title: string; description: string };

export type CatalogProject = {
  title: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  techStack: string[];
  features: FeatureCard[];
  screenshots: string[];
  thumbnail: string;
  githubUrl: string | null;
  liveUrl: string | null;
  demoVideoUrl?: string | null;
  proofAsset?: string | null;
  guardrails?: string[];
  status: string;
  featured: boolean;
  accentColor: string;
  architectureFallback: string;
  category: string;
  order: number;
};

export const catalogProjects: CatalogProject[] = [
  {
    title: "AgriConnect",
    slug: "agriconnect",
    shortDesc:
      "Digital agriculture marketplace with deep learning crop disease detection, equipment rentals, and Django backend.",
    longDesc:
      "AgriConnect is a comprehensive digital agriculture platform developed as a Final Year Project at COMSATS University. It empowers buyers, farmers, and labor crews with a unified marketplace to trade crops, rent farming machinery, manage farmland access, and hire labor without role friction.\n\nThe platform integrates a deep learning leaf disease classification model that allows growers to upload a photo of a diseased leaf and receive instant diagnostics and treatment advice directly within the web app.\n\nEngineered with a robust Django backend, relational database architecture, and a modern responsive interface, AgriConnect delivers practical, end-to-end commerce and field assistance for small-scale farmers.",
    techStack: [
      "Python",
      "Django",
      "Django REST",
      "Keras",
      "Deep Learning",
      "SQLite",
      "Next.js",
      "OpenRouter",
    ],
    features: [
      {
        title: "Digital Marketplace for Crops & Equipment",
        description:
          "Buy, sell, and rent machinery and crops with role-based dashboards for buyers, farmers, and labor.",
      },
      {
        title: "Deep Learning Leaf Disease Screening",
        description:
          "Upload plant photos to get fast model-based diagnostic feedback without external tools.",
      },
      {
        title: "Farmland Access & Labor Management",
        description:
          "Connects small-scale landowners with verified seasonal labor crews to streamline field operations.",
      },
      {
        title: "Digital Wallet & Transaction Ledger",
        description:
          "Internal practice wallet balances support seamless order simulation, rentals, and payments.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/agriconnect.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: "https://agriconnect-agentic-platform-frontend.onrender.com",
    status: "live",
    featured: true,
    accentColor: "#10B981",
    architectureFallback: "Django Backend → Keras Model → Marketplace UI",
    category: "web",
    order: 1,
  },
  {
    title: "Smart AI Doctor",
    slug: "smart-ai-doctor",
    shortDesc:
      "LLM-based medical consultation chatbot trained on 250K doctor-patient interactions with DeepSeek R1 & voice synthesis.",
    longDesc:
      "Smart AI Doctor is an intelligent healthcare assistant designed to streamline preliminary medical consultations and patient triage. Trained on a curated dataset of over 250,000 real-world doctor-patient interactions, it leverages DeepSeek R1 reasoning to evaluate symptoms and formulate structured clinical summaries.\n\nTo ensure complete accessibility, the application integrates bidirectional speech synthesis — speech-to-text input so patients can describe concerns naturally, and realistic text-to-speech output explaining potential diagnoses and recommended precautions.\n\nThe system includes strict safety boundaries, ensuring it never prescribes controlled medication while providing reliable guidance before clinical visits.",
    techStack: [
      "Python",
      "DeepSeek R1",
      "Speech-to-Text",
      "Text-to-Speech",
      "LangChain",
      "FastAPI",
      "Transformers",
    ],
    features: [
      {
        title: "Trained on 250K Medical Consultations",
        description:
          "Fine-tuned reasoning engine capable of understanding diverse symptom descriptions and nuanced patient histories.",
      },
      {
        title: "Voice-Driven Consultation (STT / TTS)",
        description:
          "Hands-free conversational interaction allowing elderly or vision-impaired patients to describe ailments naturally.",
      },
      {
        title: "Clinical Triage & Symptom Evaluation",
        description:
          "Maps spoken complaints into prioritized severity tiers and structured visit summaries for healthcare staff.",
      },
      {
        title: "Safety Boundaries & Disclaimers",
        description:
          "Enforces rigorous guardrails against self-medication and flags high-risk emergencies immediately.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/medcare.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    status: "live",
    featured: true,
    accentColor: "#0EA5E9",
    architectureFallback: "Voice Input → DeepSeek R1 Engine → Structured Clinical Triage",
    category: "ai-agent",
    order: 2,
  },
  {
    title: "Smart Islamic Guider",
    slug: "smart-islamic-guider",
    shortDesc:
      "RAG-powered Islamic QA chatbot trained on Sihah Sitta and the Quran using Python, LangChain, and LLaMA 3 on Groq.",
    longDesc:
      "Developed as a semester project at COMSATS University, Smart Islamic Guider provides authentic, context-verified Islamic answers to religious and theological questions. The assistant is trained on authoritative reference texts including the Quran and the Sihah Sitta Hadith collections.\n\nIt utilizes a Retrieval-Augmented Generation (RAG) architecture powered by LangChain and high-speed LLaMA 3 inference on the Groq Cloud API. When a user asks a query, relevant verses and Hadith citations are retrieved through vector embeddings, ensuring responses are grounded directly in authentic sources with zero hallucination.\n\nThe system provides citation references for each answered question, giving users immediate access to verified chapter and verse numbers.",
    techStack: [
      "Python",
      "LangChain",
      "LLaMA 3",
      "Groq Cloud API",
      "RAG",
      "FAISS",
      "Hugging Face",
    ],
    features: [
      {
        title: "RAG over Sihah Sitta & Quran",
        description:
          "Semantic vector indexing over authentic Hadith collections and scripture for hallucination-free retrieval.",
      },
      {
        title: "Ultra-Fast Groq Cloud Inference",
        description:
          "Sub-second response generation utilizing LLaMA 3 running on Groq's high-speed LPU infrastructure.",
      },
      {
        title: "Precise Citations & Source Proofs",
        description:
          "Every generated response links directly to referenced Surah verses or Hadith volume and book numbers.",
      },
      {
        title: "Conversational QA Context",
        description:
          "Maintains multi-turn context allowing follow-up queries and clarification on complex theological topics.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/islamic_guider.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    status: "live",
    featured: true,
    accentColor: "#D4A853",
    architectureFallback: "Query → Vector Retrieval (FAISS) → LLaMA 3 (Groq) → Grounded Answer",
    category: "ai-agent",
    order: 3,
  },
  {
    title: "AI Automation Suite",
    slug: "ai-automation-suite",
    shortDesc:
      "Agentic AI automation infrastructure combining voice agents, multi-agent pipelines, Claude MCP integrations, UiPath RPA, and n8n workflows.",
    longDesc:
      "A production-grade AI automation infrastructure built to eliminate manual work and speed up business decision-making. The suite combines multiple automation paradigms: real-time voice agents using OpenAI and Vapi for live conversations with tool calling; multi-agent decision pipelines where AI agents coordinate APIs and business platforms; and Claude MCP integrations that give agents secure, standardised access to enterprise data sources.\n\nOn the RPA side, UiPath handles deterministic desktop and document workflows, while n8n orchestrates low-code pipelines connecting cloud services and APIs end-to-end. LLM reasoning layers on top of RPA for intelligent document classification and exception handling where rules alone are not enough.\n\nRAG pipelines, structured outputs, and guardrails keep all agent behaviour accurate and production-safe, with logging and retry logic built in from day one.",
    techStack: [
      "OpenAI",
      "Vapi",
      "Claude MCP",
      "LangChain",
      "UiPath",
      "n8n",
      "RAG",
      "Python",
    ],
    features: [
      {
        title: "Real-Time Voice Agents",
        description:
          "Live conversation agents built with OpenAI models and Vapi, handling tool calling and low-latency speech interactions.",
      },
      {
        title: "Multi-Agent Decision Pipelines",
        description:
          "Coordinate multiple AI agents, APIs, and business platforms to automate complex decision workflows with minimal human intervention.",
      },
      {
        title: "Claude MCP Enterprise Integration",
        description:
          "Secure, standardised agent access to enterprise tools and data sources via the Model Context Protocol.",
      },
      {
        title: "Intelligent RPA & n8n Orchestration",
        description:
          "Combine deterministic UiPath RPA with LLM reasoning for smart document processing and business workflow automation.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/automation.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    status: "live",
    featured: true,
    accentColor: "#E8536A",
    architectureFallback: "Voice Agent / MCP / n8n → LLM Reasoning → UiPath RPA → Business Platform",
    category: "automation",
    order: 4,
  },
  {
    title: "DualHire",
    slug: "dualhire",
    shortDesc:
      "Two-sided agentic AI platform where autonomous agents handle candidate search, resume screening, and interview scheduling.",
    longDesc:
      "DualHire is an agentic hiring platform where two autonomous AI agents cooperate to complete the hiring cycle. Ava acts on behalf of candidates to format profiles and apply to open roles; Orion represents the hiring team to review qualifications and book interview slots on the company calendar.\n\nThe platform demonstrates real-time agent-to-agent collaboration with audit logs, human confirmation guardrails, and transparent telemetry.",
    techStack: [
      "Next.js",
      "Python",
      "OpenAI",
      "Vapi Voice",
      "Playwright",
      "SQLite",
      "SSE",
    ],
    features: [
      {
        title: "Two-Sided Cooperative Agents",
        description:
          "Ava applies for candidate; Orion evaluates fit and coordinates calendar availability.",
      },
      {
        title: "Automated Calendar Scheduling",
        description:
          "Finds overlapping availability between candidate and interviewer to book verified meetings.",
      },
      {
        title: "Audit Trail & Step-by-Step Replay",
        description:
          "Complete transparency into what actions the agents performed and the reasoning behind each step.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/dualhire.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    status: "live",
    featured: false,
    accentColor: "#3B82F6",
    architectureFallback: "Candidate Agent ↔ Company Screener ↔ Scheduled Interview",
    category: "ai-agent",
    order: 5,
  },

];

export const catalogSettings: { key: string; value: string }[] = [
  { key: "company_name", value: "Sohaib Masood" },
  { key: "hero_title", value: "Sohaib Masood" },
  {
    key: "hero_subtitle",
    value:
      "AI Engineer & Generative AI Specialist designing and deploying agentic AI systems, real-time voice agents, and intelligent automation pipelines.",
  },
  {
    key: "about_text",
    value:
      "AI Engineer specializing in Generative AI, agentic workflows, LLM fine-tuning, and production automation. Experienced in building voice agents, multi-agent systems, and connecting LLMs to enterprise APIs.",
  },
  { key: "github_url", value: "https://github.com/sohaibmasood" },
  { key: "linkedin_url", value: "https://www.linkedin.com/in/sohaib-masood-ab3315279/" },
  { key: "x_url", value: "" },
  { key: "email", value: "sohaibmasood2001@gmail.com" },
  { key: "phone", value: "(+92) 342 5156705" },
  { key: "location", value: "Islamabad, Pakistan" },
  { key: "resume_url", value: "" },
];
