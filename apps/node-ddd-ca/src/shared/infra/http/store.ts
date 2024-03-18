import { AsyncLocalStorage } from "async_hooks";
import type { ParameterizedContext } from "koa";

const storage = new AsyncLocalStorage<ParameterizedContext>();

export const asyncLocalStorage = {
  async run(store: ParameterizedContext, cb: () => Promise<void>) {
    return storage.run(store, cb);
  },

  get() {
    return storage.getStore();
  },
};
