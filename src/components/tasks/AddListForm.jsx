import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AddListForm({ onCreate }) {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onCreate(title)
    setTitle('')
  }

  function close() {
    setIsAdding(false)
    setTitle('')
  }

  if (!isAdding) {
    return (
      <Button
        variant="ghost"
        onClick={() => setIsAdding(true)}
        className="h-fit w-72 shrink-0 justify-start text-muted-foreground"
      >
        <Plus className="size-4" />
        Thêm list
      </Button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-72 shrink-0 space-y-1.5 rounded-xl bg-muted p-2.5 shadow-sm"
    >
      <Input
        autoFocus
        placeholder="Nhập tên list..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && close()}
      />
      <div className="flex gap-1">
        <Button type="submit" size="sm">
          Thêm
        </Button>
        <Button type="button" variant="ghost" size="icon-sm" onClick={close} aria-label="Huỷ">
          <X className="size-4" />
        </Button>
      </div>
    </form>
  )
}
