export type Container =
  | HTMLCollectionOf<HTMLBodyElement>
  | HTMLCollectionOf<HTMLHtmlElement>
  | HTMLCollectionOf<HTMLDivElement>;

export enum View {
  LOGIN = "login",
  LOGOUT = "logout",
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
  walletAddress: string | null;
  nftList: NFTTypes[];
}

export interface LoginEvent {
  isLoggedIn: boolean;
  walletAddress: string;
  nftList: NFTTypes[];
}

export interface LogoutEvent {
  isLogout: boolean;
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

export const fromNFTId: Record<
  string,
  NFTTypes.skip | NFTTypes.redo | NFTTypes.slowdown
> = {
  0: NFTTypes.skip,
  1: NFTTypes.redo,
  2: NFTTypes.slowdown,
};

export interface AwardNFT {
  nftType: NFTTypes.REDO | NFTTypes.SKIP | NFTTypes.SLOWDOWN;
  walletAddress: string;
}
