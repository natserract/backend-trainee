import { z } from "zod";

export const AdminAttributesSchema = z.object({
  id: z.number(),
  userId: z.number(),
});

export interface IAdminAttributes
  extends z.infer<typeof AdminAttributesSchema> {}
