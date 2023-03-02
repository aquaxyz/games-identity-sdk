export type Container =
  | HTMLCollectionOf<HTMLBodyElement>
  | HTMLCollectionOf<HTMLHtmlElement>
  | HTMLCollectionOf<HTMLDivElement>;

export enum View {
  LOGIN = "login",
  LOGOUT = "logout",
  INVENTORY = "inventory",
}

export enum Environment {
  DEVELOPMENT = "http://localhost:3000",
  PRODUCTION = "https://aqua.xyz",
}

export interface Settings {
  view: View;
  environment: Environment;
  widgetHeight?: string;
  widgetWidth?: string;
}

export enum EVENTS {
  AQUA_IDENTITY_MODAL_CLOSE = "AQUA_IDENTITY_MODAL_CLOSE",
  AQUA_IDENTITY_SDK_INVENTORY = "AQUA_IDENTITY_SDK_INVENTORY",
  AQUA_IDENTITY_SUCCESSFULLY_LOG_IN = "AQUA_IDENTITY_SUCCESSFULLY_LOG_IN",
  AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT = "AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT",
}

export enum EXTERNAL_EVENTS {
  MODAL_CLOSE = "MODAL_CLOSE",
  INVENTORY = "INVENTORY",
  SUCCESSFULLY_LOG_IN = "SUCCESSFULLY_LOG_IN",
  SUCCESSFULLY_LOG_OUT = "SUCCESSFULLY_LOG_OUT",
}
export interface HandlerProps {
  widgetWidth?: string;
  widgetHeight?: string;
  defaultUrl?: string;
}

export interface ModalParams {
  widget: {
    width: string;
    height: string;
  };
  environment: Environment;
  view: View;
  defaultUrl?: string;
  query?: string;
}
export interface LoginParams {
  widget: {
    widgetWidth: string;
    widgetHeight: string;
  };
  defaultUrl?: string;
}

export interface LogoutParams {
  widget?: {
    widgetWidth?: string;
    widgetHeight?: string;
  };
  defaultUrl?: string;
}

export interface WalletInventory {
  widget?: {
    widgetWidth?: string;
    widgetHeight?: string;
  };
  defaultUrl?: string;
  queryParams: {
    walletAddress: string;
    gamePropertyId?: string;
  };
}

export interface LoginInfo {
  walletAddress?: string;
  authorization?: string;
  userId?: string;
  email?: string;
  domainConnected?: boolean;
}
