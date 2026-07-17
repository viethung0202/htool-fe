import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toastApiError } from '@/lib/toastError'

export function useUpdateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, title }) =>
      api.patch(`/api/tasks/boards/${id}`, { title }).then((res) => res.data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      queryClient.invalidateQueries({ queryKey: ['board', id] })
    },
    onError: (error) => toastApiError(error, 'Không đổi được tên board'),
  })
}
