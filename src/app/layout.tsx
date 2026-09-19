import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPublicContactSettings } from "@/lib/get-public-contact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sohaib Masood | AI Engineer & Generative AI Specialist",
    template: "%s | Sohaib Masood",
  },
  description:
    "Sohaib Masood — AI Engineer & Generative AI Specialist specializing in agentic AI systems, real-time voice agents, LLM fine-tuning, Claude MCP integrations, and intelligent automation pipelines.",
  keywords: [
    "Sohaib Masood",
    "AI Engineer",
    "Generative AI Engineer",
    "Agentic AI",
    "Voice Agents",
    "Vapi",
    "Claude MCP",
    "LangChain",
    "UiPath RPA",
    "n8n",
    "PP-OCRv4",
    "Python",
    "Islamabad Pakistan",
  ],
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png" }],
  },
  openGraph: {
    title: "Sohaib Masood | AI Engineer & Generative AI Specialist",
    description:
      "AI Engineer specializing in agentic AI systems, real-time voice agents, Claude MCP, LLM fine-tuning, and intelligent automation pipelines.",
    images: [{ url: "/og-portfolio.png", width: 1200, height: 630, alt: "Sohaib Masood Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohaib Masood | AI Engineer & Generative AI Specialist",
    description:
      "AI Engineer specializing in agentic AI systems, real-time voice agents, Claude MCP, LLM fine-tuning, and intelligent automation pipelines.",
    images: ["/og-portfolio.png"],
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getPublicContactSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <Navbar ownerName={contact.companyName} />
          <main className="flex-1">{children}</main>
          <Footer
            ownerName={contact.companyName}
            email={contact.email}
            linkedinUrl={contact.linkedinUrl}
            githubUrl={contact.githubUrl}
            xUrl={contact.xUrl}
            location={contact.location}
          />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: contact.companyName,
              url: "https://yourportfolio.com",
              description:
                "Full-stack developer specializing in web applications, AI agents, and automation.",
              contactPoint: {
                "@type": "ContactPoint",
                email: contact.email,
                contactType: "general",
              },
              sameAs: [
                ...(contact.githubUrl ? [contact.githubUrl] : []),
                ...(contact.linkedinUrl ? [contact.linkedinUrl] : []),
                ...(contact.xUrl ? [contact.xUrl] : []),
              ].filter(Boolean),
            }),
          }}
        />
      </body>
    </html>
  );
}
