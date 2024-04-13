import { z } from "zod";
import { coreApi } from "../../config/api";

const getChatRoomsUserResponse = z.array(
  z.object({
    id: z.string(),
    alternativeId: z.string(),
    createdAt: z.string(),
    description: z.string(),
    ownerUsername: z.string(),
    ownerName: z.string(),
    ownerEmail: z.string(),
  })
);

export type GetChatRoomsUserResponse = z.infer<typeof getChatRoomsUserResponse>;

export const getChatRoomsUser = async () => {
  const response = await coreApi.get("/chat-rooms/user");
  return getChatRoomsUserResponse.parse(response.data.data);
}