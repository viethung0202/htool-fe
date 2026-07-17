import { useState } from 'react'
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

const STATUS_LABEL = { IDEA: 'Ý tưởng', RECORDING: 'Đang quay', POSTED: 'Đã đăng' }

function toDateInput(value) {
  return value ? value.slice(0, 10) : ''
}

export function ContentCard({ item, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(item.title)
  const [script, setScript] = useState(item.script ?? '')
  const [status, setStatus] = useState(item.status)
  const [plannedDate, setPlannedDate] = useState(toDateInput(item.plannedDate))
  const [views, setViews] = useState(item.views ?? '')
  const [likes, setLikes] = useState(item.likes ?? '')

  function handleOpenChange(next) {
    if (next) {
      setTitle(item.title)
      setScript(item.script ?? '')
      setStatus(item.status)
      setPlannedDate(toDateInput(item.plannedDate))
      setViews(item.views ?? '')
      setLikes(item.likes ?? '')
    }
    setOpen(next)
  }

  function handleSave(e) {
    e.preventDefault()
    if (!title.trim()) return
    onUpdate({
      id: item.id,
      title,
      script,
      status,
      plannedDate: plannedDate || null,
      views: views === '' ? null : Number(views),
      likes: likes === '' ? null : Number(likes),
    })
    setOpen(false)
  }

  function handleDelete() {
    if (confirm(`Xoá content "${item.title}"?`)) {
      onDelete(item.id)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md"
      >
        <p className="text-sm leading-snug">{item.title}</p>
        {item.plannedDate && (
          <p className="mt-1 text-xs text-muted-foreground">{toDateInput(item.plannedDate)}</p>
        )}
      </div>

      <DialogContent>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Chi tiết content</DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" />
            <Textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Ý tưởng / kịch bản..."
              className="min-h-32"
            />
            <div className="flex gap-2">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-9 flex-1 rounded-md border bg-transparent px-3 text-sm"
              >
                {Object.entries(STATUS_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <Input
                type="date"
                value={plannedDate}
                onChange={(e) => setPlannedDate(e.target.value)}
                className="flex-1"
              />
            </div>
            {status === 'POSTED' && (
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  placeholder="Lượt xem"
                />
                <Input
                  type="number"
                  min="0"
                  value={likes}
                  onChange={(e) => setLikes(e.target.value)}
                  placeholder="Lượt thích"
                />
              </div>
            )}
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
