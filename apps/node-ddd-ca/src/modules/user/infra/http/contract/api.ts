import { z } from "zod";

import { UserAttributesSchema } from "~/modules/user/domain/interface/user";

export const GetAllResponseDTOSchema = z.array(
  z.object({
    users: UserAttributesSchema.pick({
      id: true,
      email: true,
      phone: true,
    }),
  }),
);
export type GetAllResponseDTO = z.infer<typeof GetAllResponseDTOSchema>;
