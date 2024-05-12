import { useQuery } from "@tanstack/react-query";
import { QK_GET_CHAT_ROOM_BY_CODE } from "../../../constants/query-client-constants";
import { getChatRoomByCode } from "../../../requests/chat-room/getChatRoomByCode";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

export const useGetChatRoomByCode = async (code: string) => {
  const query = useQuery({
    queryKey: [QK_GET_CHAT_ROOM_BY_CODE, code],
    queryFn: () => getChatRoomByCode(code),
  });

  useEffect(() => {
    if (query.isError) {
      enqueueSnackbar("Erro ao buscar sala de chat", { variant: "error" });
    }
  }, [query.isError, query.error]);

  return {
    data: query.data,
    isLoading: query.isFetching,
    refetch: query.refetch,
  };
};
