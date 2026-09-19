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
    order: 2,
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
    featured: true,
    accentColor: "#3B82F6",
    architectureFallback: "Candidate Agent ↔ Company Screener ↔ Scheduled Interview",
    category: "ai-agent",
    order: 3,
  },
  {
    title: "ModAgent",
    slug: "modagent",
    shortDesc:
      "Desktop app that installs GTA V mods carefully — with a full backup, dependency checks, and a clear history before each change.",
    longDesc:
      "ModAgent is a desktop app for installing GTA V mods without the usual guesswork. You drop in a pack; the app checks the game folder, scans the package, then installs by type — vehicles, characters, maps, scripts, audio, and more.\n\nEvery change follows a careful path: backup, plan, write, verify, then record history. Uninstall restores only what ModAgent touched, so your game folder stays tidy. Legacy and Enhanced editions stay separate, so the wrong edition fails fast instead of corrupting files.\n\nSafety gates matter for players. Package scans, dependency checks, map overlap warnings, and config checks run before writes. Online play is blocked while a loader is active. The result is a reliable install engine you can trust — and that other helper apps can reuse.",
    techStack: [
      "Electron",
      "React",
      ".NET 8",
      "Agent tools",
      "CodeWalker.Core",
      "Game file tools",
      "OpenRouter",
    ],
    features: [
      {
        title: "Careful, file-level installs",
        description:
          "Changes only the files that need updating — not whole shared packs — so installs stay precise and easier to reverse.",
      },
      {
        title: "Full category coverage",
        description:
          "Scripts, maps, audio, injectors, configs, frameworks, and save-game mods each get tools that match how that content lands in the game.",
      },
      {
        title: "Safety gates before write",
        description:
          "Package scan, dependency checks, map overlap, and config checks run first. Online play is blocked while a loader is on.",
      },
      {
        title: "Shared install engine",
        description:
          "Backups, indexes, and a clear history live in one engine. Other helper apps can reuse the same install path.",
      },
      {
        title: "Legacy and Enhanced editions",
        description:
          "Separate indexes and adapters keep editions apart. Targeting the wrong edition fails fast instead of writing bad files.",
      },
      {
        title: "Confirm, then verify",
        description:
          "Backup, plan, write, verify. Uninstall stays narrow. Save mods use a separate backup store so progress files stay protected.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/modagent.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    status: "live",
    featured: false,
    accentColor: "#A855F7",
    architectureFallback: "Desktop app → install tools → GTA V folder",
    category: "desktop",
    order: 4,
  },
  {
    title: "MedCare Clinic",
    slug: "medcare-clinic-agent",
    shortDesc:
      "A clinic phone assistant that checks symptoms, handles refills, and books the doctor on the same call.",
    longDesc:
      "MedCare is a phone-first clinic assistant for patients who would rather talk than fill a long web form. Someone calls, confirms who they are, and the assistant sorts the request — book a visit, request a refill, or describe symptoms.\n\nOn the same call it can run a symptom check, book or move a visit with the right doctor, apply refill rules from the clinic table, and send a short alert so the desk is ready. A person steps in when the situation needs judgment; the assistant does not invent prescriptions or invent facts.\n\nRecords stay tied to the caller through a secure link between the clinic system and the voice line. That keeps the conversation useful and the patient identity consistent from first ring to saved note.",
    techStack: [
      "Django",
      "Python",
      "scikit-learn",
      "Voice assistant",
      "Clinic access key",
      "SQLite",
      "Optional LLM",
    ],
    features: [
      {
        title: "Phone-first patient flow",
        description:
          "Patients describe symptoms and needs on a call instead of wrestling with a long intake form — natural for older patients and busy parents.",
      },
      {
        title: "Symptom check on the line",
        description:
          "The clinic model maps spoken symptoms to a likely condition while the patient is still on the call, so triage starts immediately.",
      },
      {
        title: "Medicine and refill rules",
        description:
          "Refills follow the clinic table. The assistant never invents a script or overrides what the practice already approved.",
      },
      {
        title: "Book or move the visit",
        description:
          "Find a slot with the right doctor and confirm it while the patient is still on the line — no callback limbo.",
      },
      {
        title: "Doctor and desk alert",
        description:
          "A short summary reaches the clinic desk so staff know what was discussed and what was booked before the patient arrives.",
      },
      {
        title: "Caller stays the patient",
        description:
          "Clinic and voice systems share a secure link. Records stay tied to the phone on the call so identity does not drift mid-conversation.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/medcare.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    status: "live",
    featured: true,
    accentColor: "#14B8A6",
    architectureFallback: "Phone call → clinic assistant → saved records",
    category: "ai-agent",
    order: 5,
  },
  {
    title: "Resume Studio",
    slug: "resume-builder-agent",
    shortDesc:
      "Drop a profile file in, watch the resume fill on the page section by section, then export a print-ready PDF.",
    longDesc:
      "Resume Studio turns a structured profile into a finished resume you can see and export. You upload a metadata file with name, school, jobs, and skills. The page fills section by section so you watch the document itself take shape — not a chat transcript pretending to be a CV.\n\nWhen the layout looks right, export a clean, print-ready PDF. Candidate profiles stay available between sessions, so returning users pick up where they left off instead of re-entering everything.\n\nThe product began as a Semester 3 Java Swing project with PDF export and database storage, then grew through later course work. Polish can improve wording; it cannot invent employers or dates. That keeps the resume honest for recruiters and safe for the candidate.",
    techStack: ["Java", "Swing", "iText PDF", "SQLite", "Maven", "FastAPI"],
    features: [
      {
        title: "Profile file upload",
        description:
          "Drop a metadata file and map identity, school, jobs, and skills onto the resume canvas in one pass.",
      },
      {
        title: "Live resume preview",
        description:
          "The page fills section by section as fields arrive, so you judge the real document — not a chat log.",
      },
      {
        title: "Print-ready PDF export",
        description:
          "Export a clean multi-section resume suitable for printing or attaching to applications.",
      },
      {
        title: "Saved profiles",
        description:
          "Candidate data stays available between sessions so return visits are edits, not a full restart.",
      },
      {
        title: "Facts stay frozen",
        description:
          "Wording can be polished, but employers and dates cannot be invented. That keeps every export trustworthy.",
      },
      {
        title: "Secure admin access",
        description:
          "Admin login comes from secure settings so studio management stays protected outside the public builder flow.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/resume.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    status: "live",
    featured: false,
    accentColor: "#F59E0B",
    architectureFallback: "Upload profile → fill resume → export PDF",
    category: "desktop",
    order: 6,
  },
  {
    title: "LinkedIn Content Agent",
    slug: "linkedin-content-agent",
    shortDesc: "Multi-pass LinkedIn post drafts you review and approve — no auto-publish.",
    longDesc:
      "LinkedIn Content Agent is a multi-step writing helper for professionals who want strong posts without handing over the publish button. You start from a topic brief; the pipeline produces a first draft, then a polish pass for tone, hooks, hashtags, and preview, then a ready package on disk.\n\nYou can kick off a run from a schedule, a webhook, or a simple command. Every package lands for human review. There is no auto-publish to LinkedIn — you choose when (and whether) to post.\n\nThat design keeps the assistant useful and the brand safe. Start requests need a shared secret, model keys stay private, and invented statistics are out of bounds. The result is a reliable draft factory that still leaves the final LinkedIn action with you.",
    techStack: [
      "n8n",
      "Python runner",
      "OpenRouter / LLM",
      "SQLite history",
      "Webhook starter",
    ],
    features: [
      {
        title: "Topic brief to structured draft",
        description:
          "Feed a brief and get a structured post back. The pipeline does not invent statistics or claim results you never provided.",
      },
      {
        title: "Separate writing passes",
        description:
          "Generate, tighten, and add hashtags in distinct steps you can review — so each pass has a clear job.",
      },
      {
        title: "Ready package on disk",
        description:
          "Finished posts land as a reviewable package with preview-ready content, not a one-shot dump into a chat window.",
      },
      {
        title: "Human-gated publish",
        description:
          "Nothing goes live on LinkedIn automatically. You own the final post action after you approve the draft.",
      },
      {
        title: "Flexible start options",
        description:
          "Kick off from a schedule, a webhook, or a simple command so the pipeline fits how your team already works.",
      },
      {
        title: "Protected starts and private keys",
        description:
          "Start requests need a shared secret. Model keys stay private. The pipeline drafts; you publish.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/linkedin.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    status: "live",
    featured: false,
    accentColor: "#0A66C2",
    architectureFallback: "Brief → writing pipeline → ready post",
    category: "automation",
    order: 7,
  },
  {
    title: "Online Makeup Store",
    slug: "online-makeup-store",
    shortDesc:
      "Cosmetics storefront with an AI shopping helper that suggests cart items and only adds them after you confirm — with live stock checks.",
    longDesc:
      "Online Makeup Store is a cosmetics storefront with a familiar catalog, cart, and checkout — plus a shopping helper that suggests products without taking over the bag. The helper prepares picks; cart changes happen only after you confirm.\n\nInventory stays honest. Out-of-stock adds are refused, so the assistant cannot promise what the shelf does not have. Helper sessions expire, and admin pages plus cart changes need a signed-in user.\n\nThat design is the point: an assistant that speeds discovery while the shopper keeps final say. There is one inventory and one cart — the same storefront a human would use — so suggestions never invent a parallel shop with different stock.",
    techStack: [
      "Laravel",
      "Blade",
      "SQLite",
      "Shopping helper",
      "Secure session link",
      "OpenAI-compatible LLM",
    ],
    features: [
      {
        title: "Product catalog",
        description:
          "Browse listings with category and detail pages so shoppers find shades and kits the way they expect on a modern beauty store.",
      },
      {
        title: "Cart and checkout",
        description:
          "One storefront cart shared by the human shopper and the helper. No second inventory and no shadow checkout.",
      },
      {
        title: "Suggest, then confirm",
        description:
          "The helper prepares product picks; nothing lands in the cart until you approve — discovery without surprise adds.",
      },
      {
        title: "Stock-aware suggestions",
        description:
          "Out-of-stock adds are refused. The assistant cannot put unavailable items in the bag or promise what is not on the shelf.",
      },
      {
        title: "Expiring helper sessions",
        description:
          "Helper sessions time out so an old suggestion thread cannot quietly change the cart later without a fresh, intentional start.",
      },
      {
        title: "Signed-in cart and admin",
        description:
          "Admin pages and cart changes need a signed-in user. Private settings stay protected while the shop floor stays open for browsing.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/makeup.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    status: "live",
    featured: false,
    accentColor: "#EC4899",
    architectureFallback: "Shop website → helper suggests → you confirm → cart",
    category: "web",
    order: 8,
  },
  {
    title: "Airline Reservation System",
    slug: "airline-reservation-system",
    shortDesc:
      "Airline booking site. Search flights, book seats, manage reservations, download PDF tickets.",
    longDesc:
      "Airline Reservation System is a complete booking website for travellers who need a clear path from search to ticket. Visitors search sample flights by route or airline, choose seats, and book with passenger details and passport upload.\n\nAfter booking, travellers can list, edit, or delete reservations and download a PDF ticket for travel day. Contact messages are stored safely for the operations team. Email is logged locally so the site runs cleanly without depending on an external mail server.\n\nForms are validated and uploads stay in protected storage. Mail and related settings come from secure configuration. The product delivers a complete booking path — search, book, manage, and walk away with a ticket in hand.",
    techStack: ["Laravel 10", "Blade", "Bootstrap", "PDF tickets", "SQLite"],
    features: [
      {
        title: "Flight search",
        description:
          "Search sample flights by airline, departure, or destination so travellers find a workable option quickly.",
      },
      {
        title: "Seat booking with passenger details",
        description:
          "Book with airline selection, passenger information, and passport upload in one guided flow.",
      },
      {
        title: "Manage reservations",
        description:
          "List, edit, and delete bookings after the fact so plans can change without starting over from scratch.",
      },
      {
        title: "PDF ticket download",
        description:
          "Download a printable PDF ticket after booking — ready for travel day or emailing to a companion.",
      },
      {
        title: "Contact messages stored safely",
        description:
          "Traveller questions land in protected storage for the operations team instead of vanishing into an unmonitored inbox.",
      },
      {
        title: "Validated forms and private uploads",
        description:
          "Forms are validated before save. Passport and file uploads stay in protected storage. Mail settings come from secure config so the site runs without a live mail server.",
      },
    ],
    screenshots: [],
    thumbnail: "/thumbs/airline.png",
    githubUrl: "https://github.com/sohaibmasood",
    liveUrl: null,
    demoVideoUrl: null,
    proofAsset: null,
    guardrails: [],
    status: "live",
    featured: false,
    accentColor: "#0EA5E9",
    architectureFallback: "Search → book → manage → PDF ticket",
    category: "web",
    order: 9,
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
