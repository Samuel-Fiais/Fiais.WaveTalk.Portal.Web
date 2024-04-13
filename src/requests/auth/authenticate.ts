import { z } from "zod";
import { coreApi } from "../../config/api";

export type AuthenticateVariables = {
  emailOrUsername: string;
  password: string;
};

const authenticateResponseSchema = z.object({
  data: z.string(),
});

export const authenticate = async (variables: AuthenticateVariables) => {
  const url = "/auth";
  const response = await coreApi.post(url, variables);
  return authenticateResponseSchema.parse(response.data);
};
