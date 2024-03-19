import { z } from "zod";
import { injectable } from "inversify";

import { removeNulls } from "~/shared/infra/http/utils/base_controller_helper";

@injectable()
export abstract class BaseController {
  generateResponse<O extends object>(schema: z.ZodType, data: O) {
    return schema.transform((d) => removeNulls(d)).parse(data);
  }
}
