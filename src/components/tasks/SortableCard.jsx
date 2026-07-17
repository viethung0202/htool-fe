import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function SortableCard({ card, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description ?? '')

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `card-${card.id}`,
    disabled: isEditing,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  function handleSave(e) {
    e.preventDefault()
    if (!title.trim()) return
    onUpdate({ id: card.id, title, description })
    setIsEditing(false)
  }

  function handleCancel() {
    setTitle(card.title)
    setDescription(card.description ?? '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form
        onSubmit={handleSave}
        onPointerDown={(e) => e.stopPropagation()}
        className="space-y-1.5 rounded-md border bg-background p-2"
      >
        <Input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-7 text-sm"
        />
        <Textarea
          placeholder="Mô tả..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-14 text-xs"
        />
        <div className="flex justify-end gap-1">
          <Button type="button" variant="ghost" size="icon-sm" onClick={handleCancel}>
            <X className="size-3.5" />
          </Button>
          <Button type="submit" variant="ghost" size="icon-sm">
            <Check className="size-3.5" />
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group cursor-grab rounded-md border bg-background p-2 active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-1">
        <p className="text-sm">{card.title}</p>
        <div className="flex opacity-0 group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Sửa card"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Xoá card"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              if (confirm(`Xoá card "${card.title}"?`)) onDelete(card.id)
            }}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
      {card.description && <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>}
    </div>
  )
}
