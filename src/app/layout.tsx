import './globals.css'
import { UserProvider } from '@/context/UserContext'

export const metadata = {
  title: 'GSQuiz',
  description: 'Quiz interativo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
