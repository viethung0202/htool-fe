import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => api.post('/api/auth/logout').then((res) => res.data),
    onSuccess: () => queryClient.setQueryData(['me'], null),
  })
}
