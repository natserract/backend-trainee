import { z } from "zod";

export const UserAttributesSchema = z.object({
  id: z.number(),
  credentialUuid: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().nullish(),
});

export interface IUserAttributes extends z.infer<typeof UserAttributesSchema> {}
