import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Sidebar } from '@/components/Sidebar'
import { useMe } from '@/hooks/useMe'

export function MainLayout() {
  const { data: user } = useMe()

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <div className="flex flex-1">
        {user && <Sidebar />}
        <main className="w-full flex-1 px-4 py-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
