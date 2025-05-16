//ui-library-lib-components-common-ui-UIIconButton.tsx

import { memo } from "react";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import type { IComponent } from "@lib/types";
import { XIconutton } from "opus-x-react-assets";
import { XIconButtonProps, XIconProps } from "opus-x-react-assets";
import { iconArr, type TIcon, type TCustomIcon } from "./index";

type BaseButtonColorType = "primary" | "neutral" | "alert" | "invert";
type BaseButtonVarianType = "solid" | "outline" | "ghost";
type IconSizeType = XIconButtonProps["size"];
type Digit = "${number}";

export interface IUIIconButtonProps extends ComponentPropsWithoutRef<"i"> {
  iconName: TIcon | TCustomIcon;
  iconProps?: XIconProps;
  shape?: XIconButtonProps["shap"];
  color?: BaseButtonColorType | "neutralSecondary";
  size?: IconSizeType | Digit;
  type?: "font" | "svg";
  style?: CSSProperties;
  disabled?: boolean;
  variant?: BaseButtonVarianType;
}

import Collapse01 from "./svg/collapse-01.svg?react";
import Collapse02 from "./svg/collapse-02.svg?react";
import Collapse03 from "./svg/collapse-03.svg?react";
import Collapse04 from "./svg/collapse-04.svg?react";
import Collapse05 from "./svg/collapse-05.svg?react";
import Collapse06 from "./svg/collapse-06.svg?react";
import NovaNewSolid from "./svg/novaNewSolid.svg?react";
import NovaAiLogBasic from "./svg/novaAiLogBasic.svg?react";
import NovaEmpty from "./svg/novaEmpty.svg?react";
import NovaEmptySearchLg from "./svg/novaEmptySearchLg.svg?react";
import NovaGridFilter from "./svg/novaGridFilter.svg?react";
import NovaGridformStatusIconFail from "./svg/novaGridformStatusIconFail.svg?react";
import NovaGridformStatusIconSuccess from "./svg/novaGridformStatusIconSuccess.svg?react";
import NovaIconTotal from "./svg/novaIconTotal.svg?react";
import NovaIngSolid from "./svg/novaIngSolid.svg?react";
import NovaLogo from "./svg/novaLogo.svg?react";
import NovaReport from "./svg/novaReport.svg?react";
import NovaSend03Solid from "./svg/novaSend03Solid.svg?react";
const ICON_MAP = {
  "collapse-01": Collapse01,
  "collapse-02": Collapse02,
  "collapse-03": Collapse03,
  "collapse-04": Collapse04,
  "collapse-05": Collapse05,
  "collapse-06": Collapse06,
  novaNewSolid: NovaNewSolid,
  novaAiLogBasic: NovaAiLogBasic,
  novaEmpty: NovaEmpty,
  novaEmptySearchLg: NovaEmptySearchLg,
  novaGridFilter: NovaGridFilter,
  novaGridformStatusIconFail: NovaGridformStatusIconFail,
  novaGridformStatusIconSuccess: NovaGridformStatusIconSuccess,
  novaIconTotal: NovaIconTotal,
  novaIngSolid: NovaIngSolid,
  novaLogo: NovaLogo,
  novaReport: NovaReport,
  novaSend03Solid: NovaSend03Solid,
};

//아직진행중 5월16일
