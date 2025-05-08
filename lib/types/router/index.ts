import type { RouteObject } from "react-router";

export type TNovaRoute = RouteObject & {
  name?: string;
};

export interface IRouter {
  goBack(): void;
  push(path: string, options?: object): void;
  openExternal(url: string, options?: any): void;
  setNaviInstance(nav: any): void;
  setNavigationInstance(navigation: any): void;
  getNavigation(): any;
  setLocaionInstance(location: any): void;
  getLocation(): any;
}
