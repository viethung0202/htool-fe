import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { UserMenu } from '@/components/UserMenu'
import { useMe } from '@/hooks/useMe'

export function Header() {
  const { data: user, isLoading } = useMe()

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold">
          htool
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!isLoading && user && <UserMenu user={user} />}

          {!isLoading && !user && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Đăng nhập</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Đăng ký</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
