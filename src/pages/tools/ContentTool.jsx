import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ContentCard } from '@/components/content/ContentCard'
import { useContentItems } from '@/hooks/useContentItems'
import { useCreateContentItem } from '@/hooks/useCreateContentItem'
import { useUpdateContentItem } from '@/hooks/useUpdateContentItem'
import { useDeleteContentItem } from '@/hooks/useDeleteContentItem'

const COLUMNS = [
  { status: 'IDEA', label: 'Ý tưởng' },
  { status: 'RECORDING', label: 'Đang quay' },
  { status: 'POSTED', label: 'Đã đăng' },
]

export function ContentTool() {
  const [title, setTitle] = useState('')
  const { data: items, isLoading } = useContentItems()
  const { mutate: createItem, isPending } = useCreateContentItem()
  const { mutate: updateItem } = useUpdateContentItem()
  const { mutate: deleteItem } = useDeleteContentItem()

  function handleCreate(e) {
    e.preventDefault()
    if (!title.trim()) return
    createItem({ title, status: 'IDEA' }, { onSuccess: () => setTitle('') })
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Nội dung TikTok</h1>

      <form onSubmit={handleCreate} className="mt-4 flex gap-2">
        <Input
          placeholder="Ý tưởng content mới..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" disabled={isPending}>
          Thêm
        </Button>
      </form>

      {isLoading && <p className="mt-4 text-sm text-muted-foreground">Đang tải...</p>}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.status} className="rounded-xl bg-muted p-2.5">
            <h2 className="px-1.5 py-1 text-sm font-semibold">{col.label}</h2>
            <div className="mt-1.5 space-y-2">
              {items
                ?.filter((item) => item.status === col.status)
                .map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    onUpdate={updateItem}
                    onDelete={deleteItem}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
