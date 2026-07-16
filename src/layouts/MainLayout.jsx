import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Sidebar } from '@/components/Sidebar'

export function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="w-full flex-1 px-4 py-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
