import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AddCardForm({ listId, position, onCreate }) {
  const [title, setTitle] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onCreate({ title, position, listId })
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-1">
      <Input
        placeholder="Thêm card..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-8 text-sm"
      />
      <Button type="submit" size="icon-sm" variant="ghost" aria-label="Thêm card">
        <Plus className="size-4" />
      </Button>
    </form>
  )
}
