// import { useQuery } from "@tanstack/react-query"
// import { getMessagesByChatRoom } from "../../../requests/message/getMessagesByChatRoom"
// import { QK_GET_MESSAGES_BY_CHAT_ROOM } from "../../../constants/query-client-constants"
// import { useEffect } from "react"
// import { enqueueSnackbar } from "notistack"

// export const useGetMessagesByChatRoom = (chatRoomId: string) => {
//   const query = useQuery({
//     queryKey: [QK_GET_MESSAGES_BY_CHAT_ROOM],
//     queryFn: () => getMessagesByChatRoom(chatRoomId),
//   })

//   useEffect(() => {
//     if (query.isError) {
//       enqueueSnackbar("Erro ao buscar mensagens", { variant: "error" })
//     }
//   }, [query.isError, query.error])

//   return {
//     data: query.data || [],
//     isLoading: query.isPending,
//     refetch: query.refetch,
//   }
// }