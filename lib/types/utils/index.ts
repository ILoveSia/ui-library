export * from "./api";

export interface IUtils {
  hashStringTo32BitInteger(str: string): any;
  setCookie(key: string, value: string, expireTimes?: string): any;
  removeCookie(keyName: string): boolean;
  getCookie(key: string): string;
  setLocalStorage(key: string, value: string): void;
  getLocalStorage(key: string): string | null;
  delItemLocalStorage(key: string): void;
  delAllLocalStorage(): void;
  setSessionStorage(key: string, value: string): void;
  getSessionStorage(key: string): string | null;
  delItemSessionStorage(key: string): void;
  delAllSessionStorage(): void;
  renderReactDOM(
    target: Element | DocumentFragment,
    children: React.ReactNode
  ): any;
}
