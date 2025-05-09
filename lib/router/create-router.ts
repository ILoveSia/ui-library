//ui-library-lib-router-create-router.ts

import { createBrowserRouter } from "react-router";
import type { TNovaRoute } from "@lib/types/router";

export const createAppRouter = (routers: TNovaRoute[]) => {
  return createBrowserRouter(routers);
};
