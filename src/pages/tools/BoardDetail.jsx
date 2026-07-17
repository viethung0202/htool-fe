import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBoard } from '@/hooks/useBoard'
import { useCreateList } from '@/hooks/useCreateList'
import { useDeleteList } from '@/hooks/useDeleteList'
import { useCreateCard } from '@/hooks/useCreateCard'
import { useDeleteCard } from '@/hooks/useDeleteCard'
import { useUpdateCard } from '@/hooks/useUpdateCard'

function AddCardForm({ listId, position, onCreate }) {
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

export function BoardDetail() {
  const { boardId } = useParams()
  const { data: board, isLoading } = useBoard(boardId)
  const { mutate: createList } = useCreateList(boardId)
  const { mutate: deleteList } = useDeleteList(boardId)
  const { mutate: createCard } = useCreateCard(boardId)
  const { mutate: deleteCard } = useDeleteCard(boardId)
  const { mutate: updateCard } = useUpdateCard(boardId)
  const [newListTitle, setNewListTitle] = useState('')

  function handleCreateList(e) {
    e.preventDefault()
    if (!newListTitle.trim()) return
    createList({ title: newListTitle, position: board?.lists.length ?? 0 })
    setNewListTitle('')
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

      <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
        {board.lists.map((list) => (
          <div key={list.id} className="w-64 shrink-0 rounded-lg border bg-muted/30 p-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{list.title}</h2>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Xoá list"
                onClick={() => deleteList(list.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            <div className="mt-2 space-y-2">
              {list.cards.map((card) => (
                <div key={card.id} className="rounded-md border bg-background p-2">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-sm">{card.title}</p>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Xoá card"
                      onClick={() => deleteCard(card.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                  {card.description && (
                    <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
                  )}
                  {board.lists.length > 1 && (
                    <Select
                      value={String(card.listId)}
                      onValueChange={(value) => updateCard({ id: card.id, listId: Number(value) })}
                    >
                      <SelectTrigger className="mt-2 h-7 w-full text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {board.lists.map((l) => (
                          <SelectItem key={l.id} value={String(l.id)}>
                            {l.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>

            <AddCardForm listId={list.id} position={list.cards.length} onCreate={createCard} />
          </div>
        ))}

        <form onSubmit={handleCreateList} className="w-64 shrink-0">
          <Input
            placeholder="Thêm list mới..."
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}
