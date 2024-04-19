import { z } from "zod";
import { coreApi } from "../../config/api";

const getChatRoomsUserResponse = z.array(
  z.object({
    id: z.string(),
    alternateId: z.string(),
    createdAt: z.string(),
    description: z.string(),
    ownerUsername: z.string(),
    ownerName: z.string(),
    ownerEmail: z.string(),
    users: z.array(
      z.object({
        id: z.string(),
        alternateId: z.string(),
        name: z.string(),
        email: z.string(),
        username: z.string(),
      })
    ),
  })
);

export type GetChatRoomsUserResponse = z.infer<typeof getChatRoomsUserResponse>;

export const getChatRoomsUser = async () => {
  const url = "/chat-rooms/user-logged";
  const response = await coreApi.get(url);
  return getChatRoomsUserResponse.parse(response.data.data);
}