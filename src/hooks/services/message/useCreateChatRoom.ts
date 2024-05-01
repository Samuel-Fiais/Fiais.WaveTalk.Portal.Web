import { useMutation } from "@tanstack/react-query"
import { createChatRoom } from "../../../requests/chat-room/createChatRoom"
import { AxiosError } from "axios"
import { ResponseError } from "../../../common/ResponseError"
import { enqueueSnackbar } from "notistack"

export const useCreateChatRoom = () => {
  const createMutation = useMutation({
    mutationFn: createChatRoom,
    onError: (error: AxiosError<ResponseError>) => {
      enqueueSnackbar(error.response?.data.Message, { variant: "error" });
    }
  });

  const execute = (variables: { description: string; password: string }) => {
    createMutation.mutate(variables, {
      onSuccess: () => {
        enqueueSnackbar("Sala de chat criada com sucesso", { variant: "success" });
      }
    });
  };

  return {
    execute,
    finish: createMutation.isSuccess,
    loading: createMutation.isPending,
  };
}