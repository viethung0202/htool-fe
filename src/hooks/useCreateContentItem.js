import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toastApiError } from '@/lib/toastError'

export function useCreateContentItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => api.post('/api/content/items', data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content-items'] }),
    onError: (error) => toastApiError(error, 'Không tạo được content'),
  })
}
