import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
