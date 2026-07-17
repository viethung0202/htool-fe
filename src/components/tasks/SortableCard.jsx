import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

export function SortableCard({ card, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description ?? '')

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `card-${card.id}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  function handleOpenChange(next) {
    if (next) {
      setTitle(card.title)
      setDescription(card.description ?? '')
    }
    setOpen(next)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!title.trim()) return
    onUpdate({ id: card.id, title, description })
    setOpen(false)
  }

  function handleDelete() {
    if (confirm(`Xoá card "${card.title}"?`)) {
      onDelete(card.id)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setOpen(true)}
        className="cursor-grab rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing"
      >
        <p className="text-sm leading-snug">{card.title}</p>
        {card.description && (
          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{card.description}</p>
        )}
      </div>

      <DialogContent onPointerDown={(e) => e.stopPropagation()}>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Chi tiết card</DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả..."
              className="min-h-32"
            />
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="ghost" onClick={handleDelete}>
              <Trash2 className="size-4" />
              Xoá
            </Button>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
