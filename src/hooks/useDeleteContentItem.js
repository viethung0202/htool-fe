import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toastApiError } from '@/lib/toastError'

export function useDeleteContentItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.delete(`/api/content/items/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content-items'] }),
    onError: (error) => toastApiError(error, 'Không xoá được content'),
  })
}
