import './globals.css'
import { Poppins, Ubuntu } from 'next/font/google'

const poppins = Poppins({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poppins'
})

const ubuntu = Ubuntu({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-ubuntu'
})

export const metadata = {
  title: 'Hostel NITT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${ubuntu.variable}`}>{children}</body>
    </html>
  )
}
