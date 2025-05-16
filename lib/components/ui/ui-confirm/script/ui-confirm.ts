//ui-library-lib-components-ui-ui-confirm-script-ui-confirm.ts

import UiConfirm from "../UIConfirm";
import type { IConfirmOption } from "@lib/types";

export class Confirm {
  private notify(statusValue: any) {
    const data: any = statusValue;

    return new Promise((resolve) => {
      if (data) {
        data.resolve = resolve;
      }
    }).then((result) => {
      return result;
    });
  }

  public open(component: typeof UiConfirm, params: IConfirmOption) {
    console.log("ui confirm open!!");
    // 키 생성 (open시에만 일시적으로 생생해서 사용하므로 open함수 내에서 변수로 만들어 사용)
    const key = "ui-dialog-key_${(window as any).$ui.dialogStatus.key++}";
    // 열고자 하는 컴포넌트팝업을 리스트에 하나 추가한다.
    (window as any).$ui.dialogStatus.list.push({
      component,
      params,
      key,
      componentInstance: null,
      resolve: null,
    });

    if ((window as any).$ui.dialogStatus.dialogContainerVm) {
      // 팝업컨테이너가 새롭게 render 하도록 한다.
      (window as any).$ui.dialogStatus.dialogContainerVm.forceUpdate();
    }
    return this.notify(
      (window as any).$ui.dialogStatus.list[
        (window as any).$ui.dialogStatus.list.length - 1
      ]
    );
  }

  public close(key: any, result?: boolean) {
    console.log("ui confirm close!!", key);
    if (!key) {
      return;
    }

    (window as any).$ui.dialogStatus.list.some((item: any, index: any) => {
      console.log(" ======== $ui.confirm()함수에 item추가", item);
      if (key && key === (window as any).$ui.dialogStatus.list[index].key) {
        (window as any).$ui.dialogStatus.list[index].resolve(result);
        (window as any).$ui.dialogStatus.splice(index, 1);
        if ((window as any).$ui.dialogStatus.dialogContainerVm) {
          (window as any).$ui.dialogStatus.dialogContainerVm.forceUpdate();
        }
      }
    });
    return this.notify(
      (window as any).$ui.dialogStatus.list[
        (window as any).$ui.dialogStatus.list.length - 1
      ]
    );
  }
}

export default (message: string, option: IConfirmOption = {}) => {
  console.log("call ui confirm function!");
  const _inst = new Confirm();

  if (!message) {
    return _inst;
  }

  return _inst.open(UiConfirm, {
    msg: message,
    title: option.title,
    confirmButton: option.confirmButton,
    cancelButton: option.cancelButton,
  });
};
