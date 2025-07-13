import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptFlow - Build n8n workflows with AI",
  description: "Generate fully working n8n workflows from natural language prompts. Simplify automation with AI-powered workflow generation.",
  keywords: ["n8n", "workflow", "automation", "AI", "prompt", "no-code"],
  authors: [{ name: "PromptFlow Team" }],
  openGraph: {
    title: "PromptFlow - Build n8n workflows with AI",
    description: "Generate fully working n8n workflows from natural language prompts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-gray-900">
                  PromptFlow
                </a>
              </div>
              <div className="flex items-center space-x-8">
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Generate
                </a>
                <a
                  href="/templates"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Templates
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
