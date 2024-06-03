import { z } from "zod";
import { coreApi } from "../../config/api";

const getMessagesByChatRoomResponse = z.array(
  z.object({
    id: z.string(),
    alternateId: z.number(),
    chatRoomId: z.string(),
    userId: z.string(),
    username: z.string(),
    content: z.string(),
    createdAt: z.string(),
  })
);

export type GetMessagesByChatRoomResponse = z.infer<
  typeof getMessagesByChatRoomResponse
>;

export const getMessagesByChatRoom = async (chatRoomId: string) => {
  const url = `/messages/${chatRoomId}`;
  const response = await coreApi.get(url);
  return getMessagesByChatRoomResponse.parse(response.data.data);
};
