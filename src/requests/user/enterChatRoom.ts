import { z } from "zod";
import { coreApi } from "../../config/api";

export type EnterChatRoomVariables = {
	chatRoomId: string;
	password: string;
};

const enterChatRoomResponseSchema = z.object({
	data: z.boolean(),
});

export type EnterChatRoomResponse = z.infer<typeof enterChatRoomResponseSchema>;

export const enterChatRoom = async (variables: EnterChatRoomVariables) => {
	const url = `/users/enter-chat-room`;
	const response = await coreApi.post(url, variables);
	return enterChatRoomResponseSchema.parse(response.data);
}