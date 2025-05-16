//ui-library-lib-components-ui-ui-alert-UIAlert.tsx

import { useEffect, useCallback, memo, useState, useMemo } from "react";
import {
  XButton,
  XDialog,
  XDialogHeader,
  XDialogBody,
  XDialogFooter,
} from "opus-x-react-assets";

const UIAlert = memo(({ msg, title, childKey }: any) => {
  const [show, setShow] = useState(false);

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
      (window as any).$ui.alert().innerClose(childKey);
      setShow(false);
    },
    [childKey, show]
  );

  useEffect(() => {
    console.log(
      "얼럿 로드 useEffect!!!",
      document.getElementsByTagName("body")[0]
    );
    setShow(true);
  }, [show]);

  return (
    <>
      <div className="main-wrapper">
        <XDialog
          open={show}
          conent="default"
          size="small"
          backgroundOverlay={false}
          alert={false}
          onOpenChange={(open) => handleIsClose(open)}
        >
          <XDialogHeader title={setHeader} showCloseButton />
          <XDialogBody>
            <div
              className="confirm-warp"
              dangerouslySetInnerHTML={{ __html: msg }}
            />
          </XDialogBody>
          <XDialogFooter>
            <div className="dialog-footer-alert">
              <XButton
                color="primary"
                label="확인"
                leadingIconName=""
                size="medium"
                trailingIconName=""
                variant="solid"
                style={{ width: "100%" }}
                onClick={() => handleIsClose(false)}
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
