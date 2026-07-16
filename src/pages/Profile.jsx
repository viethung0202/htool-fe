import { useMe } from '@/hooks/useMe'

export function Profile() {
  const { data: user } = useMe()

  return (
    <div>
      <h1 className="text-xl font-semibold">Thông tin cá nhân</h1>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="w-24 text-muted-foreground">Email</dt>
          <dd>{user?.email}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 text-muted-foreground">Vai trò</dt>
          <dd>{user?.role}</dd>
        </div>
      </dl>
    </div>
  )
}
