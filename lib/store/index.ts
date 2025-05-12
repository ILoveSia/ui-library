//ui-library-lib-store-index.ts

import { configureStore } from "@reduxjs/toolkit";

if (!(window as any).__HOST_STORE__) {
  (window as any).__HOST_STORE__ = {
    main: null,
    cm: null,
    pm: null,
    py: null,
  };
}

// 호스트 스토어 이름 세팅
export const setGlobalStore = () => {
  (window as any).__HOST_STORE_NAME__ = "main";
};

export const configureAppStore = (
  reducerObj: any,
  storeName: "main" | "cm" | "pm" | "py"
) => {
  console.log(" >>>>>> configureAppStore :: ", storeName, reducerObj);
  const store = configureStore({ reducer: reducerObj });
  if (storeName === "main") {
    (window as any).__HOST_STORE__.main = store;
  }
  if (storeName === "cm") {
    (window as any).__HOST_STORE__.cm = store;
  }
  if (storeName === "pm") {
    (window as any).__HOST_STORE__.pm = store;
  }
  if (storeName === "py") {
    (window as any).__HOST_STORE__.py = store;
  }
  return store;
};

export * from "./use-store";
export * from "./helper";
