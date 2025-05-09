//ui-library-lib-store-helper.ts

import { combineReducers, type Reducer } from "@reduxjs/toolkit";
import type { IActionObject } from "@lib/types/store";
import GenerateSlice from "./slice"; // class의 위치가 generateStore보다 위에서 import해야한다.

export function sliceInstance(): GenerateSlice {
  return GenerateSlice.getInstance();
}

export function setRootReducer(
  obj: any,
  microName?: "main" | "cm" | "pm" | "py"
) {
  const returnReducerObj: any = {};
  let microFrontName = "";
  if (microName && microName !== "main") {
    microFrontName = "${microName}/";
  }
  // 각 도메인(서비스) 상태트리명 loop
  for (const [key, value] of Object.entries(obj)) {
    if (value && value.constructor === Object) {
      const reducerObj: any = {};
      // 도메인(서비스)에 연결된 가각의 이하 state명 loop
      for (const [key2, value2] of Object.entries(value)) {
        const valueObj = value2 as IActionObject;
        if (value2 && value2.constructor === Object) {
          if (valueObj.type && valueObj.type === "sync") {
            //API호출이 아닌 State 저장 로직
            reducerObj[key2] = reducerHelper(
              "${micorFrontName}${valueObj.actionType}",
              "${key}/${key2}"
            );
          } else {
            if (valueObj.url) {
              // API를 호출하는 State 저장
              reducerObj[key2] = reducerHelper(
                "${microFrontName}${valueObj.actionType}",
                "${key}/${key2}",
                valueObj.url
              );
            } else {
              // API호출이 아닌 State 저장 로직
              reducerObj[key2] = reducerHelper(
                "${microFrontName}${valueObj.actionType}",
                "${key}/${key2}"
              );
            }
          }
        } else {
          reducerObj[key2] = value2;
        }
      }
      returnReducerObj[key] = combineReducers(reducerObj);
    }
  }
  return returnReducerObj;
}

export function reducerHelper<RequestType, ResponseType>(
  key: string,
  stateTree: string,
  url?: string
): Reducer {
  const sliceInst = sliceInstance();
  if (url) {
    return sliceInst.getReducer<RequestType, ResponseType>(key, stateTree, url);
  } else {
    return sliceInst.getReducer<RequestType, ResponseType>(key, stateTree);
  }
}

// Store 의 State 트리를 재귀로 찾는 함수
export const recursionDate = <ResponseType = any>(
  data: any,
  key: string[],
  index: number
): any => {
  if (!key[index]) {
    return data as ResponseType;
  } else {
    const selectData = data[key[index]];
    if (selectData) {
      return recursionDate<ResponseType>(selectData, key, index + 1);
    } else if (index === 0) {
      console.error(
        "[ERROR] : Store에 (${key[index]}) ActionType설정이 잘못 되었거나, State가 생성 되어 있지 않습니다."
      );
      return false;
    } else {
      return selectData as ResponseType;
    }
  }
};

// 비동기 API호출 관련 세팅 함수
export const setStateAsync = <RequestType, ResponseType>(
  actionType: string,
  url: string
) => {
  return reducerHelper<RequestType, ResponseType>(actionType, actionType, url);
};
