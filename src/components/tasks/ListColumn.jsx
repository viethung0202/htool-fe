import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SortableCard } from './SortableCard'
import { AddCardForm } from './AddCardForm'

export function ListColumn({ list, onDeleteList, onDeleteCard, onCreateCard, onUpdateCard }) {
  const { setNodeRef } = useDroppable({ id: `list-${list.id}` })
  const cardIds = list.cards.map((c) => `card-${c.id}`)

  return (
    <div className="w-64 shrink-0 rounded-lg border bg-muted/30 p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">{list.title}</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Xoá list"
          onClick={() => {
            if (confirm(`Xoá list "${list.title}"? Toàn bộ card bên trong sẽ mất.`)) {
              onDeleteList(list.id)
            }
          }}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="mt-2 min-h-8 space-y-2">
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

      <AddCardForm listId={list.id} position={list.cards.length} onCreate={onCreateCard} />
    </div>
  )
}
