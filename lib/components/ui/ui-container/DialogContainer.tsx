//ui-library-lib-components-ui-ui-container-DialogContainer.tsx

import React from "react";
import type { IDialogStatus } from "@lib/types/components";

// react에서 제공하는 forceUpdate()를 사용하여 다이얼로그 child component를 update하기 위해
// class형식으로 생성.
export default class DialogContainer extends React.Component {
  uiChild = () => {
    if (
      (window as any).$ui &&
      (window as any).$ui.dialogStatus &&
      !(window as any).$ui.dialogStatus.dialogContainerVm
    ) {
      (window as any).$ui.dialogStatus.dialogContainerVm = this;
    }

    if ((window as any).$ui && (window as any).$ui.dialogStatus) {
      return (window as any).$ui.dialogStatus.list.map(
        (popup: IDialogStatus, index: number) => {
          const attrProps = popup.params ? popup.params : {};
          return (
            <div key={index}>
              {" "}
              {React.createElement(popup.component, {
                childKey: popup.key,
                ...attrProps,
              })}{" "}
            </div>
          );
        }
      );
    } else {
      return <></>;
    }
  };

  componentDidMount() {
    if (
      (window as any).$ui &&
      (window as any).$ui.dialogStatus &&
      !(window as any).$ui.dialogStatus.dialogContainerVm
    ) {
      (window as any).$ui.dialogStatus.dialogContainerVm = this;
      console.log(
        "dialogContainerVm셋팅  :::  ",
        (window as any).$ui.dialogStatus.dialogContainerVm
      );
    }
  }

  render() {
    return (
      <div
        className="g-dialog-component-container"
        style={{ zIndex: "999999" }}
      ></div>
    );
  }
}
