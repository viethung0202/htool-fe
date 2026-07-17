import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toastApiError } from '@/lib/toastError'

function updateListInBoard(board, listId, { position: newPosition, ...fields }) {
  if (!board) return board

  const idx = board.lists.findIndex((l) => l.id === listId)
  if (idx === -1) return board

  const updatedList = { ...board.lists[idx], ...fields }
  const lists = board.lists.filter((l) => l.id !== listId)
  lists.splice(newPosition ?? idx, 0, updatedList)

  return { ...board, lists }
}

export function useUpdateList(boardId) {
  const queryClient = useQueryClient()
  const queryKey = ['board', boardId]

  return useMutation({
    mutationFn: ({ id, ...data }) =>
      api.patch(`/api/tasks/lists/${id}`, data).then((res) => res.data),
    onMutate: async ({ id, ...patch }) => {
      await queryClient.cancelQueries({ queryKey })
      const previousBoard = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (board) => updateListInBoard(board, id, patch))
      return { previousBoard }
    },
    onError: (error, _variables, context) => {
      if (context?.previousBoard) queryClient.setQueryData(queryKey, context.previousBoard)
      toastApiError(error, 'Không cập nhật được list')
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
