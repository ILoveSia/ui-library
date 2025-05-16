//ui-library-lib-components-ui-ui-confirm-UIConfirm.tsx.txt

import { useRef, useEffect, useCallback, memo, useState, useMemo } from "react";
import {
  XButton,
  XDialog,
  XDialogHeader,
  XDialogBody,
  XDialogFooter,
} from "opus-x-react-assets";

const UIAlert = memo(({ msg, title, childKey }: any) => {
  const [show, setShow] = useState(false);
  const result = useRef(false);

  const setHeader = useMemo((): any => {
    if (title) {
      return <div dangerouslySetInnerHTML={{ __html: title }} />;
    } else {
      return <></>;
    }
  }, [title]);

  const handleIsClose = useCallback(
    (isOpen: boolean) => {
      console.log(isOpen);
      (window as any).$ui.confirm().close(childKey, result.current);
      setShow(false);
    },
    [childKey, show]
  );

  const onOk = useCallback(() => {
    result.current = true;
    handleIsClose(true);
  }, [result]);

  const onCancel = useCallback(() => {
    result.current = false;
    handleIsClose(false);
  }, [result]);

  useEffect(() => {
    console.log(
      "얼럿 로드 useEffect !!",
      document.getElementsByIagName("body")[0]
    );
    setShow(true);
  }, [show]);

  return (
    <>
      <div className="main-wrapper">
        <XDialog
          open={show}
          content="default"
          size="small"
          backgroudOverlay={false}
          alert={false}
          onOpenChange={(open) => handleIsClose(open)}
        >
          <XDialogHeader title={setHeander} showCloseButton />
          <XDialogBody>
            <div
              className="confirm-warp"
              dangerouslySetInnerHTML={{ __html: msg }}
            />
          </XDialogBody>
          <XDialogFooter>
            <div className="">
              <XButton
                color="neutral"
                label="ekerl"
                leadingIconName=""
                size="medium"
                trailingIconName=""
                variant="outline"
                onClick={onCancel}
                style={{
                  width: "33%",
                }}
              />
              <XButton
                color="neutral"
                label="아니요"
                leadingIconName=""
                size="medium"
                trailingIconName=""
                variant="outline"
                onClick={onCancel}
                style={{
                  width: "33%",
                }}
              />
              <XButton
                color="primary"
                label="확인"
                leadingIconName=""
                size="medium"
                trailingIconName=""
                variant="solid"
                onClick={onOk}
                style={{
                  width: "33%",
                }}
              />
            </div>
          </XDialogFooter>
        </XDialog>
      </div>
    </>
  );
});
UIAlert.displayName = "UIAlert";

export default UIAlert;
