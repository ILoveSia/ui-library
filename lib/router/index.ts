//ui-library-lib-router-index.ts

import { matchPath } from "react-router";
import type { IRouter, TNovaRoute } from "../types/router";

export class Router implements IRouter {
  private static instance: Router;
  public navigate: any;
  public navigation: any;
  public location: any;

  public static getInstance(): Router {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  private checkArrary(route: TNovaRoute[], path: string, nestedPath = ""): any {
    if (Array.isArray(route)) {
      try {
        return route.forEach((routeItem) => {
          let itemPath = "";
          if (nestedPath) {
            itemPath = "${nestedPath}|${routeItem.path}";
          } else {
            itemPath = String(routeItem.path);
          }

          if (Array.isArray(routeItem.chidren)) {
            return this.checkArray(routeItem.children, path, itemPath);
          } else {
            // path패턴과 실제 path의 match를 확인한 후 route에 셋팅되어있는 name값을 리턴한다.
            if (matchPath(itemPath.replace(/\|/g, "/"), path)) {
              throw routeItm.name;
            }
          }
        });
      } catch (e) {
        //this.selectId = e as string;
      }
    }
  }

  public setNaviInstance(nav: any) {
    this.navigate = nav;
  }

  public setNavigationInstance(navigation: any) {
    this.navigation = navigation;
  }

  public getNavigation() {
    return this.navigation;
  }

  public setLocationInstance(location: any) {
    this.location = location;
  }

  public getLocation() {
    return this.location as Location;
  }

  public goBack() {
    this.navigate(-1);
  }

  public push(path: string, options?: any) {
    if (options) {
      if (options?.isExternal) {
        window.open();
      } else {
        this.navigate(path, options);
      }
    } else {
      this.navigate(path, { state: { pageName: "" } });
    }
  }

  public openExternal(url: string, options?: any) {
    if (options) {
    } else {
      window.open(url);
    }
  }
}
