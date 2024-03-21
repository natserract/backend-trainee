import { z } from "zod";

import { removeNulls } from "~/shared/infra/http/utils/base_controller_helper";

export abstract class BaseController {
  generateResponse<O extends object>(schema: z.ZodType, data: O) {
    return schema.transform((d) => removeNulls(d)).parse(data);
  }
}
