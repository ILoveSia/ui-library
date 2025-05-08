import type { RequestMethod } from "@app/store/request";

export interface IRootState<T = any> {
  value: T | null;
  status: "Loading" | "Complete" | "Fail" | "";
}

export interface IActionObject {
  actionType: string;
  url?: string;
  type?: "async" | "sync";
}

export interface ISliceObject {
  [key: string]: {
    key: string;
    url: string;
    stateTree: string;
    asyncThunk: any;
    reducer: any;
  };
}

export interface iGenerateSlice {
  sliceList: ISliceObject;
  generateAsyncThunk(url: string, key: string, methodType?: RequestMethod): any;
  generateSlice(key: string, stateTree: string, url?: string): any;
  generateSyncSlice(key: string, stateTree: string): any;
  getReducer(key: string, stateTree: string, url?: string): any;
  getAsyncThunk<T = string>(url: T, methodType?: RequestMethod): any;
}
