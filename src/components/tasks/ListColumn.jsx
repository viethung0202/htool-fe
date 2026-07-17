import { useDroppable } from '@dnd-kit/core'
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SortableCard } from './SortableCard'
import { AddCardForm } from './AddCardForm'

export function ListColumn({
  list,
  onDeleteList,
  onRenameList,
  onDeleteCard,
  onCreateCard,
  onUpdateCard,
}) {
  const { setNodeRef: setDropRef } = useDroppable({ id: `listdrop-${list.id}` })
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `list-${list.id}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const cardIds = list.cards.map((c) => `card-${c.id}`)

  return (
    <div
      ref={setSortableRef}
      style={style}
      className="w-72 shrink-0 rounded-xl bg-muted p-2.5 shadow-sm dark:bg-neutral-900/95 dark:shadow-lg"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex cursor-grab items-center justify-between gap-1 rounded-md px-1.5 py-1 active:cursor-grabbing"
      >
        <div className="flex min-w-0 items-center gap-1.5">
          <GripVertical className="size-4 shrink-0 text-muted-foreground" />
          <h2 className="truncate text-sm font-semibold">{list.title}</h2>
        </div>
        <div className="flex shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Đổi tên list"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onRenameList(list)}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Xoá list"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              if (confirm(`Xoá list "${list.title}"? Toàn bộ card bên trong sẽ mất.`)) {
                onDeleteList(list.id)
              }
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div ref={setDropRef} className="mt-1.5 min-h-8 space-y-2 px-0.5">
          {list.cards.map((card) => (
            <SortableCard
              key={card.id}
              card={card}
              onDelete={onDeleteCard}
              onUpdate={onUpdateCard}
            />
          ))}
        </div>
      </SortableContext>

      <div className="px-0.5">
        <AddCardForm listId={list.id} position={list.cards.length} onCreate={onCreateCard} />
      </div>
    </div>
  )
}
