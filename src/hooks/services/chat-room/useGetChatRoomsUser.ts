import { useQuery } from "@tanstack/react-query"
import { QK_GET_CHAT_ROOMS_USER } from "../../../constants/query-client-constants"
import { getChatRoomsUser, GetChatRoomsUserResponse } from "../../../requests/chat-room/getChatRoomsUser"
import { useEffect } from "react"
import { enqueueSnackbar } from "notistack"

export const useGetChatRoomsUser = () => {
  const query = useQuery({
    queryKey: [QK_GET_CHAT_ROOMS_USER],
    queryFn: getChatRoomsUser,
  })

  useEffect(() => {
    if (query.isError) {
      enqueueSnackbar("Erro ao buscar salas de chat", { variant: "error" })
    }
  }, [query.isError, query.error])

  return {
    data: (query.data as GetChatRoomsUserResponse) || [],
    isLoading: query.isFetching,
    refetch: query.refetch,
  }
}