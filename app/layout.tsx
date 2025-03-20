'use client'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Provider } from 'react-redux'
import { store } from '@/lib/redux/store'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Provider store={store}>
          <Toaster />

          <ThemeProvider
            enableSystem
            attribute='class'
            defaultTheme='light'
            disableTransitionOnChange
            themes={['light', 'dark']}
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
