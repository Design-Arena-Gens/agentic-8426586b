import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Apprendre le Turc',
  description: 'Application interactive pour apprendre le turc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
