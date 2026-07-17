import { toast } from 'sonner'

export function toastApiError(error, fallback = 'Đã có lỗi xảy ra') {
  toast.error(error.response?.data?.error || fallback)
}
