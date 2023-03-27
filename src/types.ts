export type Container =
  | HTMLCollectionOf<HTMLBodyElement>
  | HTMLCollectionOf<HTMLHtmlElement>
  | HTMLCollectionOf<HTMLDivElement>;

export enum View {
  LOGIN = "login",
  LOGOUT = "logout",
  IS_NFT_AWARDED = "isNFTAwarded",
  AWARD_NFT = "awardNFT",
  RETRIEVE_NFT_LIST = "retrieveNFTList",
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
  AQUA_IDENTITY_IS_NFT_AWARDED = "AQUA_IDENTITY_IS_NFT_AWARDED",
  AQUA_IDENTITY_RETRIEVE_NFT_LIST = "AQUA_IDENTITY_RETRIEVE_NFT_LIST",
  AQUA_IDENTITY_AWARD_NFT = "AQUA_IDENTITY_AWARD_NFT",
}

export enum EXTERNAL_EVENTS {
  MODAL_CLOSE = "MODAL_CLOSE",
  SUCCESSFULLY_LOG_IN = "SUCCESSFULLY_LOG_IN",
  SUCCESSFULLY_LOG_OUT = "SUCCESSFULLY_LOG_OUT",
  WALLET_ADDRESS = "WALLET_ADDRESS",
  IS_NFT_AWARDED = "IS_NFT_AWARDED",
  RETRIEVE_NFT_LIST = "RETRIEVE_NFT_LIST",
  AWARD_NFT = "AWARD_NFT",
}

export enum NFTTypes {
  REDO = "redo",
  SKIP = "skip",
  SLOWDOWN = "slowdown",
}
export interface ModalParams {
  width?: string;
  height?: string;
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
}

export interface ValidateNFTOwnershipEvent {
  valid: boolean;
}
export enum NFTTypes {
  slowdown = 0,
  redo,
  skip,
}

export const fromNFTToIndex: Record<string, NFTTypes> = {
  slowdown: NFTTypes.slowdown,
  redo: NFTTypes.redo,
  skip: NFTTypes.skip,
};

export const fromIndexToNFT: Record<string, string> = {
  0: "slowdown",
  1: "redo",
  2: "skip",
};
export interface AwardNFT {
  nftType: NFTTypes.REDO | NFTTypes.SKIP | NFTTypes.SLOWDOWN;
  walletAddress: string;
}
