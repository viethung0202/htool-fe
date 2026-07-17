import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useBoards } from '@/hooks/useBoards'
import { useCreateBoard } from '@/hooks/useCreateBoard'
import { useDeleteBoard } from '@/hooks/useDeleteBoard'

export function TasksTool() {
  const [title, setTitle] = useState('')
  const { data: boards, isLoading } = useBoards()
  const { mutate: createBoard, isPending } = useCreateBoard()
  const { mutate: deleteBoard } = useDeleteBoard()

  function handleCreate(e) {
    e.preventDefault()
    if (!title.trim()) return
    createBoard(title, { onSuccess: () => setTitle('') })
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Quản lý công việc</h1>

      <form onSubmit={handleCreate} className="mt-4 flex gap-2">
        <Input
          placeholder="Tên board mới..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" disabled={isPending}>
          Tạo board
        </Button>
      </form>

      {isLoading && <p className="mt-4 text-sm text-muted-foreground">Đang tải...</p>}

      {!isLoading && boards?.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">Chưa có board nào.</p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {boards?.map((board) => (
          <Card key={board.id} className="group relative">
            <Link to={`/tools/tasks/${board.id}`}>
              <CardHeader>
                <CardTitle className="truncate">{board.title}</CardTitle>
              </CardHeader>
            </Link>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
              onClick={() => deleteBoard(board.id)}
              aria-label="Xoá board"
            >
              <Trash2 className="size-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
