import dotenv from "dotenv";
import path from "node:path";

import { pathExists } from "~/shared/common/utils/files";

export const loadEnv = async (cwd = ".") => {
  const pathToEnv = path.resolve(cwd, ".env");

  if (await pathExists(pathToEnv)) {
    dotenv.config({ path: pathToEnv });
  }
};
