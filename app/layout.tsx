import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Daywise — Know the weather. Make better plans.', description: 'Weather-aware discovery, planning and preparation.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
