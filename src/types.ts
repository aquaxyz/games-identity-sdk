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

export interface ModalParams {
  width?: string;
  height?: string;
  environment: Environment;
  view: View;
  defaultUrl?: string;
  query?: string;
}

export enum NFTTypes {
  SLOWDOWN = "slowdown",
  REDO = "redo",
  SKIP = "skip",
}

export const fromNFTToIndex: Record<NFTTypes, number> = {
  [NFTTypes.SLOWDOWN]: 0,
  [NFTTypes.REDO]: 1,
  [NFTTypes.SKIP]: 2,
};

export interface CheckNFT {
  nftType: NFTTypes.REDO | NFTTypes.SKIP | NFTTypes.SLOWDOWN;
  walletAddress: string;
}
