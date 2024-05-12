import { z } from "zod";
import { coreApi } from "../../config/api";

const getChatRoomByCodeResponse = z.object({
  id: z.string(),
  description: z.string(),
  ownerName: z.string(),
  isPrivate: z.boolean(),
});

export type GetChatRoomByCodeResponse = z.infer<
  typeof getChatRoomByCodeResponse
>;

export const getChatRoomByCode = async (code: string) => {
  const url = `/chat-rooms/${code}`;
  const response = await coreApi.get(url);
  return getChatRoomByCodeResponse.parse(response.data.data);
};
