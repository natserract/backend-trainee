import { z } from "zod";

import { UserAttributesSchema } from "~/modules/user/application/model/user";

export const CreateUserDTOSchema = UserAttributesSchema.pick({
  email: true,
  phone: true,
});

export type CreateUserDTO = z.infer<typeof CreateUserDTOSchema>;
