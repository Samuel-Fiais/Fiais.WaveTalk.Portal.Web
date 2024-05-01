import { z } from "zod";
import { coreApi } from "../../config/api";

export type CreateChatRoom = {
    description: string;
    password: string;
}

const createChatroomResponseSchema = z.object({
    data: z.boolean(),
});

export type CreateChatRoomResponse = z.infer<typeof createChatroomResponseSchema>;

export const createChatRoom = async (variables: CreateChatRoom) => {
    const url = "/chat-rooms";
    const response = await coreApi.post(url, variables);
    return createChatroomResponseSchema.parse(response.data);
};