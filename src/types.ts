import { AquaIdentitySDK } from "./index";
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

export enum Messages {
  AQUA_IDENTITY_LOGIN_CLOSE_MODAL = "AQUA_IDENTITY_LOGIN_CLOSE_MODAL",
  AQUA_IDENTITY_LOGOUT_CLOSE_MODAL = "AQUA_IDENTITY_LOGOUT_CLOSE_MODAL",
  AQUA_IDENTITY_WALLET_CLOSE_MODAL = "AQUA_IDENTITY_WALLET_CLOSE_MODAL",
  AQUA_IDENTITY_SDK_INVENTORY_REQUEST_LOGIN = 'AQUA_IDENTITY_SDK_INVENTORY_REQUEST_LOGIN',
  AQUA_IDENTITY_SDK_INVENTORY_DATA = 'AQUA_IDENTITY_SDK_INVENTORY_DATA',
  AQUA_IDENTITY_SDK_INVENTORY_ERROR = 'AQUA_IDENTITY_SDK_INVENTORY_ERROR',
  AQUA_IDENTITY_SUCCESSFULLY_LOG_IN = "AQUA_IDENTITY_SUCCESSFULLY_LOG_IN",
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
  }
}