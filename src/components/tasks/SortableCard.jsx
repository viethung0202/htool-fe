import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SortableCard({ card, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `card-${card.id}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab rounded-md border bg-background p-2 active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-1">
        <p className="text-sm">{card.title}</p>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Xoá card"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onDelete(card.id)}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
      {card.description && <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>}
    </div>
  )
}
