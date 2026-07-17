import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toastApiError } from '@/lib/toastError'

export function useUpdateList(boardId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...data }) =>
      api.patch(`/api/tasks/lists/${id}`, data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['board', boardId] }),
    onError: (error) => toastApiError(error, 'Không cập nhật được list'),
  })
}
