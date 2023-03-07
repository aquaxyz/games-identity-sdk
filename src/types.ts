export type Container =
  | HTMLCollectionOf<HTMLBodyElement>
  | HTMLCollectionOf<HTMLHtmlElement>
  | HTMLCollectionOf<HTMLDivElement>;

export enum View {
  LOGIN = "login",
  LOGOUT = "logout",
  VALIDATE_NFT_OWNERSHIP = "validateNFTOwnership",
  AWARD_NFT = "awardNFT",
  WALLET_ADDRESS = "walletAddress",
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
  AQUA_IDENTITY_VALIDATE_NFT_OWNERSHIP = "AQUA_IDENTITY_VALIDATE_NFT_OWNERSHIP",
  AQUA_IDENTITY_AWARD_NFT = "AQUA_IDENTITY_AWARD_NFT",
  AQUA_IDENTITY_SUCCESSFULLY_LOG_IN = "AQUA_IDENTITY_SUCCESSFULLY_LOG_IN",
  AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT = "AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT",
  AQUA_IDENTITY_WALLET_ADDRESS = "AQUA_IDENTITY_WALLET_ADDRESS",
}

export enum EXTERNAL_EVENTS {
  MODAL_CLOSE = "MODAL_CLOSE",
  VALIDATE_NFT_OWNERSHIP = "VALIDATE_NFT_OWNERSHIP",
  AWARD_NFT = "AWARD_NFT",
  SUCCESSFULLY_LOG_IN = "SUCCESSFULLY_LOG_IN",
  SUCCESSFULLY_LOG_OUT = "SUCCESSFULLY_LOG_OUT",
  WALLET_ADDRESS = "WALLET_ADDRESS",
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

export interface HandlerProps {
  widget?: {
    widgetWidth?: string;
    widgetHeight?: string;
  };
  defaultUrl?: string;
}

export interface ValidateNFTOwnership {
  widget?: {
    widgetWidth?: string;
    widgetHeight?: string;
  };
  defaultUrl?: string;
  queryParams: {
    nftType: NFTTypes;
  };
}

export interface AwardNFT {
  widget?: {
    widgetWidth?: string;
    widgetHeight?: string;
  };
  defaultUrl?: string;
  queryParams: {
    nftType: NFTTypes;
  };
}

export interface LoginInfo {
  walletAddress?: WalletAddress;
  authorization?: string;
  userId?: string;
  email?: string;
  domainConnected?: boolean;
}

export interface WalletAddress {
  walletAddress?: string;
}

export enum NFTTypes {
  REDO = "redo",
  SKIP = "skip",
  SLOWDOWN = "slowdown",
}

export interface ModalContentProps {
  width: string;
  height: string;
  url: string;
  view: View;
}
