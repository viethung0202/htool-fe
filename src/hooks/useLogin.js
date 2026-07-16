import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password }) =>
      api.post('/api/auth/login', { email, password }).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
  })
}
