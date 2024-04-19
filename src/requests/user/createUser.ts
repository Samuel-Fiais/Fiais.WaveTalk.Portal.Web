import { z } from "zod";
import { coreApi } from "../../config/api";

export type CreateUserVariables = {
  name: string;
  email: string;
  username: string;
  password: string;
};

const createUserResponseSchema = z.object({
  data: z.boolean(),
});

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;

export const createUser = async (variables: CreateUserVariables) => {
  const url = "/users";
  const response = await coreApi.post(url, variables);
  return createUserResponseSchema.parse(response.data);
};