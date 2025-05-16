ui - library - lib - components - common - ui - UIIcon.tsx;

import { memo } from "react";
import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import type { IComponent } from "@lib/types";
import { XIcon, type XIconProps } from "opus-x-react-assets";
import { iconArr, type TIcon, type TCustomIcon } from "./index";

type Size = "small" | "medium" | "large";
type IconSizeType =
  | Size
  | "xSmall"
  | "sMedium"
  | "xLarge"
  | "2xLarge"
  | "3xLarge"
  | "6xLarge";
type Digit = "${number}";
export interface IUIIconProps extends ComponentPropsWithoutRef<"i"> {
  iconName: TIcon | TCustomIcon;
  color?: "default" | "primary" | "neutral" | "disable";
  size?: IconSizeType | Digit;
  type?: "font" | "svg";
  style?: CSSProperties;
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

const UIIcon: IComponent<IUIIconProps> = memo(
  ({ iconName, size = "medium", color = "", type = "font", style }) => {
    const isIcon = (x: any): x is TIcon => iconArr.includes(x);

    if (isIcon(iconName)) {
      return (
        <>
          <XIcon
            color={color as XIconProps["color"]}
            iconName={iconName}
            size={size as IconSizeType}
            style={style}
          />
        </>
      );
    } else if (
      type === "svg" ||
      iconName === "novaAiLogBasic" ||
      iconName === "novaEmptySearchLg" ||
      iconName === "novaLogo" ||
      iconName === "novaReport" ||
      iconName === "novaEmpty"
    ) {
      const inm = iconName as TCustomIcon;
      const IconComponent = ICON_MAP[inm] as any;

      let iconSize = size;
      if (!isNaN(Number(String(size).replace(/px/g, "")))) {
        iconSize = String(size).replace(/px/g, "") as Digit;
      } else {
        iconSize = "30";
      }
      return (
        <IconComponent
          fill={color}
          width={`${iconSize}px`}
          {...(iconName !== "novaLogo" && { height: `${iconSize}px` })}
        />
      );
    } else {
      let xiconStyle = style ? { ...style } : {};
      if (!isNaN(Number(String(size).replace(/px/g, "")))) {
        xiconStyle = Object.assign(xiconStyle, { fontSize: `${size}px` });
      }

      return (
        <i
          className={`icon_root_nova ${iconName}`}
          aria-hidden="true"
          data-size={size}
          data-color={color}
          style={xiconStyle}
        />
      );
    }
  }
);
UIIcon.displayName = "UIIcon";

export default UIIcon;
