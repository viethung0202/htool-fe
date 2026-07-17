import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Pencil } from 'lucide-react'
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { Button } from '@/components/ui/button'
import { ListColumn } from '@/components/tasks/ListColumn'
import { AddListForm } from '@/components/tasks/AddListForm'
import { useBoard } from '@/hooks/useBoard'
import { useUpdateBoard } from '@/hooks/useUpdateBoard'
import { useCreateList } from '@/hooks/useCreateList'
import { useUpdateList } from '@/hooks/useUpdateList'
import { useDeleteList } from '@/hooks/useDeleteList'
import { useCreateCard } from '@/hooks/useCreateCard'
import { useDeleteCard } from '@/hooks/useDeleteCard'
import { useUpdateCard } from '@/hooks/useUpdateCard'

function findListByCardId(lists, cardId) {
  return lists.find((list) => list.cards.some((card) => card.id === cardId))
}

export function BoardDetail() {
  const boardId = Number(useParams().boardId)
  const { data: board, isLoading } = useBoard(boardId)
  const { mutate: updateBoard } = useUpdateBoard()
  const { mutate: createList } = useCreateList(boardId)
  const { mutate: updateList } = useUpdateList(boardId)
  const { mutate: deleteList } = useDeleteList(boardId)
  const { mutate: createCard } = useCreateCard(boardId)
  const { mutate: deleteCard } = useDeleteCard(boardId)
  const { mutate: updateCard } = useUpdateCard(boardId)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  function handleRenameBoard() {
    const newTitle = prompt('Tên board mới:', board.title)
    if (newTitle?.trim() && newTitle !== board.title) {
      updateBoard({ id: board.id, title: newTitle })
    }
  }

  function handleRenameList(list) {
    const newTitle = prompt('Tên list mới:', list.title)
    if (newTitle?.trim() && newTitle !== list.title) {
      updateList({ id: list.id, title: newTitle })
    }
  }

  function handleCreateList(title) {
    createList({ title, position: board?.lists.length ?? 0 })
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    if (activeId.startsWith('list-')) {
      if (!overId.startsWith('list-')) return
      const activeListId = Number(activeId.replace('list-', ''))
      const overListId = Number(overId.replace('list-', ''))
      if (activeListId === overListId) return
      const position = board.lists.findIndex((l) => l.id === overListId)
      updateList({ id: activeListId, position })
      return
    }

    const cardId = Number(activeId.replace('card-', ''))
    const sourceList = findListByCardId(board.lists, cardId)
    if (!sourceList) return

    let targetList
    let position

    if (overId.startsWith('listdrop-')) {
      targetList = board.lists.find((l) => l.id === Number(overId.replace('listdrop-', '')))
      position = targetList.cards.length
    } else if (overId.startsWith('card-')) {
      const overCardId = Number(overId.replace('card-', ''))
      targetList = findListByCardId(board.lists, overCardId)
      position = targetList.cards.findIndex((c) => c.id === overCardId)
    } else {
      return
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

  const listIds = board.lists.map((l) => `list-${l.id}`)

  return (
    <div>
      <Link
        to="/tools/tasks"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Quay lại
      </Link>
      <div className="mt-2 flex items-center gap-1">
        <h1 className="text-xl font-semibold">{board.title}</h1>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Đổi tên board"
          onClick={handleRenameBoard}
        >
          <Pencil className="size-4" />
        </Button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl dark:bg-gradient-to-br dark:from-indigo-950 dark:via-violet-950 dark:to-fuchsia-950 dark:p-4">
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <SortableContext items={listIds} strategy={horizontalListSortingStrategy}>
            <div className="flex items-start gap-3 pb-4">
              {board.lists.map((list) => (
                <ListColumn
                  key={list.id}
                  list={list}
                  onDeleteList={deleteList}
                  onRenameList={handleRenameList}
                  onDeleteCard={deleteCard}
                  onCreateCard={createCard}
                  onUpdateCard={updateCard}
                />
              ))}

              <AddListForm onCreate={handleCreateList} />
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
