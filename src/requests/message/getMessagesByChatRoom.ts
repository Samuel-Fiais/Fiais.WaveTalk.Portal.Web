import { z } from "zod";
import { coreApi } from "../../config/api";

const getMessagesByChatRoomResponse = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    username: z.string(),
    content: z.string(),
    createdAt: z.string(),
  })
);

export type GetMessagesByChatRoomResponse = z.infer<typeof getMessagesByChatRoomResponse>;

export const getMessagesByChatRoom = async (chatRoomId: string) => {
  const response = await coreApi.get(`/messages/${chatRoomId}`);
  return getMessagesByChatRoomResponse.parse(response.data.data);
}