import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function useRegister() {
  return useMutation({
    mutationFn: ({ email, password }) =>
      api.post('/api/auth/register', { email, password }).then((res) => res.data),
  })
}
