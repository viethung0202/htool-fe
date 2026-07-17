import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (title) => api.post('/api/tasks/boards', { title }).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['boards'] }),
  })
}
