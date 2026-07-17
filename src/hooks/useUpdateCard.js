import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { toastApiError } from '@/lib/toastError'

function moveCardInBoard(board, cardId, { listId: newListId, position: newPosition, ...fields }) {
  if (!board) return board

  let movedCard
  const lists = board.lists.map((list) => {
    const idx = list.cards.findIndex((c) => c.id === cardId)
    if (idx === -1) return list
    movedCard = { ...list.cards[idx], ...fields }
    return { ...list, cards: list.cards.filter((c) => c.id !== cardId) }
  })
  if (!movedCard) return board

  const targetListId = newListId ?? movedCard.listId
  const targetIndex = lists.findIndex((l) => l.id === targetListId)
  if (targetIndex === -1) return { ...board, lists }

  const targetCards = [...lists[targetIndex].cards]
  targetCards.splice(newPosition ?? targetCards.length, 0, { ...movedCard, listId: targetListId })
  lists[targetIndex] = { ...lists[targetIndex], cards: targetCards }

  return { ...board, lists }
}

export function useUpdateCard(boardId) {
  const queryClient = useQueryClient()
  const queryKey = ['board', boardId]

  return useMutation({
    mutationFn: ({ id, ...data }) =>
      api.patch(`/api/tasks/cards/${id}`, data).then((res) => res.data),
    onMutate: async ({ id, ...patch }) => {
      await queryClient.cancelQueries({ queryKey })
      const previousBoard = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (board) => moveCardInBoard(board, id, patch))
      return { previousBoard }
    },
    onError: (error, _variables, context) => {
      if (context?.previousBoard) queryClient.setQueryData(queryKey, context.previousBoard)
      toastApiError(error, 'Không cập nhật được card')
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
