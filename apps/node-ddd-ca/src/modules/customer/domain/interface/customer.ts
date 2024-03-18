import { z } from "zod";

export const CustomerAttributesSchema = z.object({
  id: z.number(),
  name: z.string().nullish(),
  userId: z.number(),
  notes: z.string().nullish(),
});

export interface ICustomerAttributes
  extends z.infer<typeof CustomerAttributesSchema> {}
