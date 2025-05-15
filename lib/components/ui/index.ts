//ui-library>lib> components>ui>index.ts.txt

import dialogComponent from "./ui-dialog/script/ui-dialog";
import type { TDialog } from "@lib/types/components";

export function setUiJS() {
  const dialog = {
    dialogStatus: {
      key: 0, //팝업 생성시 고유의 키값을 생성하기 위한 일련번호
      list: [], //생성된 팝업 컴포넌트등르 정장하는 리스트
      dialogContainerVm: null, //팝업이 열릴 컨테이너 div의 인스턴스
    },
    dialogComponentStatus: {
      key: 0, //팝업 생성시 고유의 키값을 생성하기 위한 일련번호
      list: [], //생성된 팝업 컴포넌트등르 정장하는 리스트
      dialogContainerVm: null, //팝업이 열릴 컨테이너 div의 인스턴스
    },
    toastStatus: {
      key: 0, // toast 생성시 고유의 키값을 생성하기 위한 일련번호
      list: [], // 생성된 toast 컴포넌트들을 저장하는 리스트
      toastContainerVm: null, // toast가 열릴 컨테이너 div의 인스턴스
    },
    dialog: dialogComponent as unknown as TDialog,
    alert: alert as TAlert,
    confirm: confirm as Tconfirm,
    toast: toast as any,
  };
  return dialog;
}
