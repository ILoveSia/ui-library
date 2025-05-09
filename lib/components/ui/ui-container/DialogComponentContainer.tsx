//ui-library-lib-components-ui-container-DialogComponentContainer.tsx

import React from "react";
import type { IDialogStatus } from "@lib/types/components";

// react에서 제공하는 forceUpdate()를 사용하여 다이얼로그 child component 를 update하기 위해
// class형식으로 생성.
export default class DialogComponentContainer extends React.Component {
  uiChild = () => {
    if (
      (window as any).$ui &&
      (window as any).$ui.dialogComponentStatus &&
      !(window as any).$ui.dialogComponentStatus.dialogContainerVm
    ) {
      (window as any).$ui.dialogComponentStatus.dialogContainerVm = this;
    }

    if ((window as any).$ui && (window as any).$ui.dialogComponentStatus) {
      return (window as any).$ui.dialogComponentStatus.list.map(
        (popup: IDialogStatus, index: number) => {
          const attrProps = popup.params ? popup.params : {};
          return (
            <div key={index}>
              {React.createElement(popup.component, {
                childkey: popup.key,
                ...attrProps,
              })}
            </div>
          );
        }
      );
    } else {
      return <></>;
    }
  };

  render() {
    return (
      <div
        className="g-dialog-component-container"
        style={{ zIndex: "9999999" }}
      >
        {this.uiChild()}
      </div>
    );
  }
}
