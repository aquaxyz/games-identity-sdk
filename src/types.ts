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

export enum EVENTS {
  AQUA_IDENTITY_MODAL_CLOSE = "AQUA_IDENTITY_MODAL_CLOSE",
  AQUA_IDENTITY_SUCCESSFULLY_LOG_IN = "AQUA_IDENTITY_SUCCESSFULLY_LOG_IN",
  AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT = "AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT",
  AQUA_IDENTITY_WALLET_ADDRESS = "AQUA_IDENTITY_WALLET_ADDRESS",
  AQUA_IDENTITY_VALIDATE_NFT_OWNERSHIP = "AQUA_IDENTITY_VALIDATE_NFT_OWNERSHIP",
  AQUA_IDENTITY_AWARD_NFT = "AQUA_IDENTITY_AWARD_NFT",
}

export enum EXTERNAL_EVENTS {
  MODAL_CLOSE = "MODAL_CLOSE",
  SUCCESSFULLY_LOG_IN = "SUCCESSFULLY_LOG_IN",
  SUCCESSFULLY_LOG_OUT = "SUCCESSFULLY_LOG_OUT",
  WALLET_ADDRESS = "WALLET_ADDRESS",
  VALIDATE_NFT_OWNERSHIP = "VALIDATE_NFT_OWNERSHIP",
  AWARD_NFT = "AWARD_NFT",
}
export interface LoginParams {
  widgetWidth: string;
  widgetHeight: string;
}

export enum NFTTypes {
  REDO = "redo",
  SKIP = "skip",
  SLOWDOWN = "slowdown",
}
export interface ModalParams {
  widgetWidth?: string;
  widgetHeight?: string;
  environment: Environment;
  view: View;
  defaultUrl?: string;
  query?: string;
}

export interface WalletAddressEvent {
  isLoggedIn: boolean;
  walletAddress?: string;
}

export interface LoginEvent {
  isLoggedIn: boolean;
  walletAddress?: string;
}

export interface AwardNFTEvent {
  valid: boolean;
  nftType: NFTTypes;
  status?: string;
}

export interface ValidateNFTOwnershipEvent {
  valid: boolean;
  nftType: NFTTypes;
  status?: string;
}
