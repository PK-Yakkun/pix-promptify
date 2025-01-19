import './globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from '../context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pix Promptify',
  description: 'Image prompt generation and customization service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

