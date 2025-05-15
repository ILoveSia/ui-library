//ui-library-lib-components-ui-ui-dialog-script-ui-dialog.ts

import UIDialog from "../UIDialog";
import type { IDialogOption, IDialogStatusList } from "@nova/ui-library/types";

export class DialogComponent {
  private _aliveTimer = null;

  private notify(statusValue: any): Promise<IDialogStatusList> {
    const data: any = statusValue;

    return new Promise((resolve) => {
      if (data) {
        data.resolve = resolve;
      }
    }).then((result) => {
      return result as IDialogStatusList;
    });
  }

  public open(
    component: typeof UIDialog,
    params: IDialogOption
  ): Promise<IDialogStatusList> {
    console.log("ui dialog open!!");
    // 키 생성 (open시에만 일시적으로 생성해서 사용하므로 open 함수 내에서 변수로 만들어 사용)
    const key =
      "ui-dialogcomponent-key_${(window as any).$ui.dialogComponentStatus.key++}";
    // 열고자 하는 컴포넌트팝업을 리스트에 하나 추가한다.
    (window as any).$ui.dialogComponentStatus.list.push({
      component,
      params,
      key,
      componentInstance: null,
      resolve: null,
    });

    if ((window as any).$ui.dialogComponentStatus.dialogContainerVm) {
      // 팝업컨테이너가 새롭게 render하도록 한다.
      // DialogContainer 컴포넌트가 class방식으로 만들어져서 forceUpdate 함수를 사용할 수 있다.
      (window as any).$ui.dialogComponentStatus.dialogContainerVm.forceUpdate();
    }

    // 자동해제 옵션이 있는경우
    // if (params.autoDismiss) {
    //	this._aliverTimer = setTimeout(() => {
    //		this.innerClose(key);
    //	}, params.autoDismiss) as any;
    //}

    return this.notify(
      (window as any).$ui.dialogComponentStatus.list[
        (window as any).$ui.dialogComponentStatus.list.length - 1
      ]
    );
  }

  public innerClose(key: any) {
    if (!key) {
      return;
    }
    (window as any).$ui.dialogComponentStatus.list.some(
      (item: any, index: any) => {
        console.log("===== $ui.alert()함수에 item추가", item);
        if (
          key &&
          key === (window as any).$ui.dialogComponentStatus.list[index].key
        ) {
          (window as any).$ui.dialogComponentStatus.list[index].resolve(
            (window as any).$ui.dialogComponentStatus.list[index]
          );
          (window as any).$ui.dialogComponentStatus.list.splice(index, 1);
          if ((window as any).$ui.dialogComponentStatus.dialogContainerVm) {
            (
              window as any
            ).$ui.dialogComponentStatus.dialogContainerVm.forceUpdate();
          }
        }
      }
    );

    if (this._aliveTimer) {
      clearTimeout(this._aliveTimer);
    }
    return this.notify(
      (window as any).$ui.dialogComponentStatus.list[
        (window as any).$ui.dialogComponentStatus.list.length - 1
      ]
    );
  }

  // 외부에서 그냥 close했을경우 배열의 맨 마지막 것을 close한다.
  public _close(closeArg?: string) {
    const len = (window as any).$ui.dialogComponentStatus.list.length;
    if (len > 0) {
      const index = len - 1;
      (window as any).$ui.dialogComponentStatus.list[index].resolve(
        closeArg,
        (window as any).$ui.dialogComponentStatus.list[index]
      );
      (window as any).$ui.dialogComponentStatus.list.splice(index, 1);
      if ((window as any).$ui.dialogComponentStatus.dialogContainerVm) {
        (
          window as any
        ).$ui.dialogComponentStatus.dialogContainerVm.forceUpdate();
      }
    }
    if (this._aliveTimer) {
      clearTimeout(this._aliveTimer);
    }
    return this.notify(
      (window as any).$ui.dialogComponentStatus.list[
        (window as any).$ui.dialogComponentsStatus.list.length - 1
      ]
    );
  }

  public openExternal(params: IDialogOption) {
    let option = "width=600, height=400";

    if (params.width) {
      option = option.replace("width=600", "width=${params.width}");
    }
    if (params.height) {
      option = option.replace("height=600", "height=${params.height}");
    }
    if (params.url) {
      window.open("${params.url}", "popup", option);
    }
    return this.notify({ resolve: "external close!" });
  }
}

function dialogComponent(
  message: IDialogOption
): Promise<IDialogStatusList> | DialogComponent;
function dialogComponent(
  message: string
): Promise<IDialogStatusList> | DialogComponent;
function dialogComponent(
  message: any,
  option: IDialogOption = {}
): Promise<IDialogStatusList> | DialogComponent {
  console.log("call ui dialogComponents function! ");
  const _inst = new DialogComponent();

  if (!message) {
    return _inst;
  }

  if (typeof message === "object") {
    if (message.isExternal) {
      return _inst.openExternal(message);
    } else if (typeof message.close === "string") {
      return _inst._close(message.close);
    } else if (message.close === true || message.close === false) {
      return _inst._close(message.close);
    } else {
      return _inst.open(UIDialog, {
        type: option.type,
        msg: message,
        title: option.title,
        element: option.element,
        onHide: message.onHide,
      });
    }
  } else {
    return _inst.open(UIDialog, {
      type: option.type,
      msg: message,
      title: option.title,
      element: option.element,
      onHide: option.onHide,
    });
  }
}

export default dialogComponent;
