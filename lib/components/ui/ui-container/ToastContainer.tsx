import React from "react";
import { XToast } from "opus-x-react-assets";

// react에서 제공하는 forceUpdate()를 사용하여 다이얼로그 child component를 update하기 위해
// class형식으로 생성
export default class ToastContainer extends React.Component {
  prop = this.props as any;

  componentDiaMount() {
    if (
      (window as any).$ui &&
      (window as any).$ui.toastStatus &&
      !(window as any).$ui.toastStatus.toastContainerVm
    ) {
      (window as any).$ui.toastStatus.toastContainerVm = this;
      console.log(
        "toastContainerVm셋팅 :: ",
        (window as any).$ui.toastStatus.toastContainerVm
      );
    }
  }

  render() {
    return (
      <div
        className="g-toast-component-container"
        style={{ zIndex: "9999999" }}
      >
        <XToast
          placement={
            this.prop?.placement ? this.prop?.placement : "bootomCenter"
          }
          maxVisibleCount={
            this.prop?.maxVisibleCount ? this.prop?.maxVisbleCount : 5
          }
          duration={this.prop?.duration ? this.prop?.duration : 5000}
        />
      </div>
    );
  }
}
