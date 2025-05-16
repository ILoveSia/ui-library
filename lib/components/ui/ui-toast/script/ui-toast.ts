//ui-library-lib-components-ui-ui-toast-script-ui-toast.ts

import { toast as uitoas } from "opus-x-react-assets";

export class Toast {
  public open(option: any): void {
    console.log("ui toast open!!");
    uitoast(option);
  }
}

function toast(option: any = {}): void {
  console.log("call ui toast function!");
  const _inst = new Toast();

  _inst.open(option);
}

export default toast;
