export type Container =
  | HTMLCollectionOf<HTMLBodyElement>
  | HTMLCollectionOf<HTMLHtmlElement>
  | HTMLCollectionOf<HTMLDivElement>;

export enum View {
  LOGIN = "login",
  LOGOUT = "logout",
  WALLET = "wallet",
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
  AQUA_IDENTITY_SUCCESSFULLY_LOG_IN = "AQUA_IDENTITY_SUCCESSFULLY_LOG_IN",
  AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT = "AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT",
  AQUA_IDENTITY_LOGIN_CLOSE_MODAL = "AQUA_IDENTITY_LOGIN_CLOSE_MODAL",
  AQUA_IDENTITY_LOGOUT_CLOSE_MODAL = "AQUA_IDENTITY_LOGOUT_CLOSE_MODAL",
  AQUA_IDENTITY_WALLET_CLOSE_MODAL = "AQUA_IDENTITY_WALLET_CLOSE_MODAL",
}
