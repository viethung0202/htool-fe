import { NavLink } from 'react-router-dom'
import { Video, KanbanSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const TOOLS = [
  { to: '/tools/video', label: 'Video', icon: Video },
  { to: '/tools/tasks', label: 'Công việc', icon: KanbanSquare },
]

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r dark:bg-indigo-950/60">
      <nav className="flex flex-col gap-1 p-3">
        {TOOLS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
