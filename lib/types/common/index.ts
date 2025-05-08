import React from "react";

//export type TComponent<P = {}> = (props: P) => React.ReactElement | any;
export interface IComponent<P = {}> {
  (props: P, context?: any):
    | React.ReactElement<any, any>
    | React.ReactNode
    | null;
  displayName?: any;
}
