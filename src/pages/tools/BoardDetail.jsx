import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { Input } from '@/components/ui/input'
import { ListColumn } from '@/components/tasks/ListColumn'
import { useBoard } from '@/hooks/useBoard'
import { useCreateList } from '@/hooks/useCreateList'
import { useDeleteList } from '@/hooks/useDeleteList'
import { useCreateCard } from '@/hooks/useCreateCard'
import { useDeleteCard } from '@/hooks/useDeleteCard'
import { useUpdateCard } from '@/hooks/useUpdateCard'

function findListByCardId(lists, cardId) {
  return lists.find((list) => list.cards.some((card) => card.id === cardId))
}

export function BoardDetail() {
  const { boardId } = useParams()
  const { data: board, isLoading } = useBoard(boardId)
  const { mutate: createList } = useCreateList(boardId)
  const { mutate: deleteList } = useDeleteList(boardId)
  const { mutate: createCard } = useCreateCard(boardId)
  const { mutate: deleteCard } = useDeleteCard(boardId)
  const { mutate: updateCard } = useUpdateCard(boardId)
  const [newListTitle, setNewListTitle] = useState('')

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  function handleCreateList(e) {
    e.preventDefault()
    if (!newListTitle.trim()) return
    createList({ title: newListTitle, position: board?.lists.length ?? 0 })
    setNewListTitle('')
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const cardId = Number(String(active.id).replace('card-', ''))
    const sourceList = findListByCardId(board.lists, cardId)
    if (!sourceList) return

    const overId = String(over.id)
    let targetList
    let position

    if (overId.startsWith('list-')) {
      targetList = board.lists.find((l) => l.id === Number(overId.replace('list-', '')))
      position = targetList.cards.length
    } else {
      const overCardId = Number(overId.replace('card-', ''))
      targetList = findListByCardId(board.lists, overCardId)
      position = targetList.cards.findIndex((c) => c.id === overCardId)
    }

    if (!targetList) return
    if (targetList.id === sourceList.id && sourceList.cards[position]?.id === cardId) return

    // ponytail: position is a plain integer set on drop, no reindex of siblings —
    // fine for a single-user Kanban board, would need fractional/reindexed positions
    // if this ever needs to stay perfectly stable under concurrent editors.
    updateCard({ id: cardId, listId: targetList.id, position })
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Đang tải...</p>
  if (!board) return <p className="text-sm text-muted-foreground">Không tìm thấy board.</p>

  return (
    <div>
      <Link
        to="/tools/tasks"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Quay lại
      </Link>
      <h1 className="mt-2 text-xl font-semibold">{board.title}</h1>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
          {board.lists.map((list) => (
            <ListColumn
              key={list.id}
              list={list}
              onDeleteList={deleteList}
              onDeleteCard={deleteCard}
              onCreateCard={createCard}
            />
          ))}

          <form onSubmit={handleCreateList} className="w-64 shrink-0">
            <Input
              placeholder="Thêm list mới..."
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
          </form>
        </div>
      </DndContext>
    </div>
  )
}
