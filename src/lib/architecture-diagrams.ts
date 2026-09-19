export type ArchNode = {
  id: string;
  title: string;
  detail?: string;
  items?: string[];
};

export type ArchLayer = ArchNode[];

export type ArchitectureDiagram = {
  title?: string;
  /** Each layer = one stage left→right. Multiple nodes = branches in that stage. */
  layers: ArchLayer[];
  note?: string;
};

/**
 * Short, plain-language cards for non-technical readers.
 * layers = stages; nodes = branch cards; items = tiny leaf lines.
 */
export const architectureBySlug: Record<string, ArchitectureDiagram> = {
  agriconnect: {
    title: "How AgriConnect works",
    layers: [
      [
        {
          id: "storefront",
          title: "Shop website",
          detail: "For buyers",
          items: ["Browse crops and machines", "Add to cart and pay"],
        },
        {
          id: "mcp-entry",
          title: "Helper bots",
          detail: "For operators",
          items: ["Ask a bot to buy or rent", "Same rules as the website"],
        },
      ],
      [
        {
          id: "roles",
          title: "Who can do what",
          items: ["Buyers, farmers, workers", "Each sees the right tools"],
        },
        {
          id: "commerce",
          title: "Orders and bookings",
          items: ["Checkout and delivery status", "Rent machines or book land"],
        },
        {
          id: "wallet",
          title: "Payments",
          items: ["Wallet and deals", "Clear payment history"],
        },
      ],
      [
        {
          id: "agent-market",
          title: "Bot actions",
          items: ["Buy, rent, hire, pay", "Works like a careful assistant"],
        },
        {
          id: "agent-ai",
          title: "Smart checks",
          items: ["Spot plant disease", "Suggest fair prices"],
        },
      ],
      [
        {
          id: "sqlite",
          title: "Saved records",
          items: ["Products and orders", "Photos and files"],
        },
        {
          id: "disease-ai",
          title: "Plant scan",
          items: ["Reads a leaf photo", "Returns a simple result"],
        },
        {
          id: "harden",
          title: "Security",
          items: ["Passwords and access limits", "Secrets stay off the public site"],
        },
      ],
    ],
    note: "People and helper bots share the same shop rules from start to finish.",
  },
  dualhire: {
    title: "How DualHire works",
    layers: [
      [
        {
          id: "landing",
          title: "Your dashboard",
          items: ["Sign in as talent or company", "See job matches"],
        },
        {
          id: "live-hub",
          title: "Live view",
          items: ["Watch the two agents talk", "See the final outcome"],
        },
      ],
      [
        {
          id: "auth-match",
          title: "Find a fit",
          items: ["Match people to jobs", "Keep profiles safe"],
        },
        {
          id: "a2a",
          title: "Agent talk",
          items: ["Candidate agent ↔ company agent", "Agree score and interview time"],
        },
      ],
      [
        {
          id: "bridge",
          title: "Apply for you",
          items: ["Opens the career site safely", "Submits the agreed packet", "Rate limits and CSRF guards"],
        },
      ],
      [
        {
          id: "northbridge",
          title: "Northbridge Careers",
          items: ["Career board", "Takes the application"],
        },
        {
          id: "meridian",
          title: "Meridian Careers",
          items: ["Second board", "Same safe apply flow"],
        },
      ],
    ],
    note: "Two agents negotiate, then a safe helper applies on the career boards.",
  },
  modagent: {
    title: "How ModAgent works",
    layers: [
      [
        {
          id: "electron",
          title: "Desktop app",
          items: ["Drop in a mod pack", "Review the plan first"],
        },
        {
          id: "mcp-client",
          title: "Shared tools",
          items: ["Same install engine", "Works in the app or helper clients"],
        },
      ],
      [
        {
          id: "detect",
          title: "Check the game",
          items: ["Find the GTA install", "Look up structure by category", "Scan the package first"],
        },
        {
          id: "apply",
          title: "Install carefully",
          items: ["Category tools (map, audio, injector, save)", "Snapshot the plan", "Write only what is needed"],
        },
        {
          id: "verify",
          title: "Confirm",
          items: ["Verify paths and archives", "Ledger for narrow uninstall", "Block Online if a loader is on"],
        },
      ],
      [
        {
          id: "mods-folder",
          title: "Mod folder",
          items: ["Most files land in mods/", "Save mods use a separate backup store"],
        },
        {
          id: "rpf-dlc",
          title: "Game packs and root",
          items: ["Shared archives stay tracked", "Injectors write to game root"],
        },
      ],
    ],
    note: "You always confirm before writes. Backups make undo possible.",
  },
  "medcare-clinic-agent": {
    title: "How MedCare works",
    layers: [
      [
        {
          id: "call-in",
          title: "Patient calls",
          items: ["Phone the clinic line", "Say what you need"],
        },
      ],
      [
        {
          id: "triage",
          title: "Understand the need",
          items: ["Confirm who is calling", "Bind phone to patient", "Sort book, refill, or symptoms"],
        },
        {
          id: "care-actions",
          title: "Help on the call",
          items: ["Suggest next steps", "Book or move a visit", "Secure clinic access"],
        },
      ],
      [
        {
          id: "calendar",
          title: "Appointments",
          items: ["Open slots", "Bookings saved"],
        },
        {
          id: "pharmacy",
          title: "Medicine",
          items: ["Refill requests", "Medicine list"],
        },
        {
          id: "notes",
          title: "Clinic notes",
          items: ["Past visit context", "Simple lookup for staff"],
        },
      ],
    ],
    note: "Voice in, clear clinic actions out. A person stays in the loop when it matters.",
  },
  "resume-builder-agent": {
    title: "How Resume Studio works",
    layers: [
      [
        {
          id: "upload",
          title: "Start fresh",
          items: ["Bring in your profile info", "Skills, jobs, school"],
        },
        {
          id: "reload",
          title: "Open saved",
          items: ["Reload a past profile", "Keep editing later"],
        },
      ],
      [
        {
          id: "parse",
          title: "Organize",
          items: ["Split into clear sections", "Keep data in sync"],
        },
        {
          id: "preview",
          title: "Live preview",
          items: ["See the resume update live", "Pick a simple layout"],
        },
      ],
      [
        {
          id: "sql-out",
          title: "Save",
          items: ["Store your profile", "Come back anytime"],
        },
        {
          id: "pdf-out",
          title: "Export",
          items: ["Download a clean PDF", "Ready to share"],
        },
      ],
    ],
    note: "Add your info, preview live, save, and export a PDF.",
  },
  "linkedin-content-agent": {
    title: "How the content agent works",
    layers: [
      [
        {
          id: "manual-brief",
          title: "You start",
          items: ["Give a topic", "Optional tone notes"],
        },
        {
          id: "schedule",
          title: "Timed start",
          items: ["Runs on a schedule", "Same writing steps"],
        },
      ],
      [
        {
          id: "draft",
          title: "First draft",
          items: ["Write a rough post", "Shape the length"],
        },
        {
          id: "polish",
          title: "Polish",
          items: ["Fix tone and hooks", "Add hashtags", "Show a preview"],
        },
      ],
      [
        {
          id: "package",
          title: "Ready to post",
          items: ["Copy-ready text", "You choose when to publish", "Webhook needs a shared secret"],
        },
      ],
    ],
    note: "You stay in control of the final publish.",
  },
  "voice-content-pipeline": {
    title: "How the voice pipeline works",
    layers: [
      [
        {
          id: "queue",
          title: "Video list",
          items: ["Add links to process", "Track what is left"],
        },
      ],
      [
        {
          id: "download",
          title: "Get the file",
          items: ["Download each video", "Name files clearly"],
        },
        {
          id: "extract",
          title: "Pull audio",
          items: ["Save clean sound files", "Ready for speech-to-text"],
        },
      ],
      [
        {
          id: "whisper",
          title: "Turn speech to text",
          items: ["Transcribe each file", "Show progress as it runs"],
        },
      ],
      [
        {
          id: "transcripts",
          title: "Transcripts",
          items: ["Save the text", "Easy to review later"],
        },
        {
          id: "ledgers",
          title: "Status lists",
          items: ["Done vs pending", "Retry only failures"],
        },
      ],
    ],
    note: "Link list → audio → text → clear status.",
  },
  "online-makeup-store": {
    title: "How the makeup store works",
    layers: [
      [
        {
          id: "browse",
          title: "Browse",
          items: ["See products", "Open details"],
        },
        {
          id: "cart-ui",
          title: "Cart",
          items: ["Change quantities", "Start checkout"],
        },
      ],
      [
        {
          id: "listing",
          title: "Store pages",
          items: ["Product list and detail", "Cart in the session"],
        },
        {
          id: "checkout",
          title: "Checkout",
          items: ["Fill the order form", "See confirmation", "Auth required for cart"],
        },
      ],
      [
        {
          id: "products-db",
          title: "Product records",
          items: ["Stock and prices", "Customer accounts"],
        },
        {
          id: "orders-db",
          title: "Order records",
          items: ["Orders and line items", "Admin routes role-locked"],
        },
      ],
    ],
    note: "Browse → helper suggests → you confirm → checkout → saved order.",
  },
  "airline-reservation-system": {
    title: "How airline booking works",
    layers: [
      [
        {
          id: "landing",
          title: "Site",
          items: ["Home and offers", "Flight search"],
        },
        {
          id: "book-ui",
          title: "Booking form",
          items: ["Passenger details", "Passport upload"],
        },
      ],
      [
        {
          id: "laravel",
          title: "Booking app",
          items: ["Validate + save booking", "Contact messages", "PDF ticket"],
        },
        {
          id: "manage",
          title: "Manage bookings",
          items: ["List / edit / delete", "Download ticket"],
        },
      ],
      [
        {
          id: "sqlite",
          title: "Saved records",
          items: ["Flights", "Bookings", "Contacts"],
        },
        {
          id: "storage",
          title: "Private files",
          items: ["Passport uploads", "Generated PDFs"],
        },
      ],
    ],
    note: "Search → book → manage → PDF ticket.",
  },
};

export function stringifyArchitecture(diagram: ArchitectureDiagram): string {
  return JSON.stringify(diagram, null, 2);
}

export function parseArchitectureJson(
  raw: string
): ArchitectureDiagram | null {
  try {
    const data = JSON.parse(raw) as unknown;
    if (
      !data ||
      typeof data !== "object" ||
      !Array.isArray((data as ArchitectureDiagram).layers) ||
      (data as ArchitectureDiagram).layers.length === 0
    ) {
      return null;
    }
    return data as ArchitectureDiagram;
  } catch {
    return null;
  }
}

export function parseArchitectureText(raw: string): ArchitectureDiagram | null {
  const lines = raw
    .split("\n")
    .map((l) => l.replace(/\r/g, ""))
    .filter((l) => l.trim().length > 0);

  if (lines.length === 0) return null;

  const layers: ArchLayer[] = [];
  let current: ArchNode | null = null;
  let id = 0;

  const isConnector = (s: string) =>
    /^[\s│├└─┴┬┤┘┐┌─◄►←→▼▲|\\/+*]+$/.test(s.trim()) ||
    s.trim() === "▼" ||
    s.trim() === "▲";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || isConnector(trimmed)) continue;
    if (/[┌┐└┘═─]{3,}/.test(trimmed) && trimmed.length > 20) continue;

    const childMatch = trimmed.match(/^[├└─•\-*]+\s*(.+)$/);
    if (childMatch && current) {
      current.items = current.items ?? [];
      current.items.push(childMatch[1].trim());
      continue;
    }

    let title = trimmed;
    let detail: string | undefined;
    const paren = trimmed.match(/^(.+?)\s*\((.+)\)\s*$/);
    const dash = trimmed.match(/^(.+?)\s+[-:·]\s+(.+)$/);
    if (paren) {
      title = paren[1].trim();
      detail = paren[2].trim();
    } else if (dash && dash[1].length < 40) {
      title = dash[1].trim();
      detail = dash[2].trim();
    }

    current = { id: `n${id++}`, title, detail };
    layers.push([current]);
  }

  if (layers.length === 0) return null;
  return { layers };
}

export function resolveArchitecture(
  slug: string | undefined,
  architectureText: string | null | undefined
): ArchitectureDiagram | null {
  if (architectureText) {
    const asJson = parseArchitectureJson(architectureText);
    if (asJson) return asJson;
  }
  if (slug && architectureBySlug[slug]) return architectureBySlug[slug];
  if (architectureText) return parseArchitectureText(architectureText);
  return null;
}
