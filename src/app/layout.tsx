import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { VenueProvider } from '@/context/VenueContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowSphere AI — Smart Venue Assistant',
  description:
    'AI-powered crowd management and smart navigation for large-scale stadiums and events. Real-time heatmaps, wait-time prediction, and intelligent routing.',
  keywords: 'venue management, crowd AI, stadium navigation, smart events, heatmap',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        {/* Skip-to-content for keyboard/screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <VenueProvider>{children}</VenueProvider>
      </body>
    </html>
  );
}
