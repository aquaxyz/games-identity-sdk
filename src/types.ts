import { EXTERNAL_EVENTS } from "./events";

export type Container =
  | HTMLCollectionOf<HTMLBodyElement>
  | HTMLCollectionOf<HTMLHtmlElement>
  | HTMLCollectionOf<HTMLDivElement>;

export enum Environment {
  DEVELOPMENT = "http://localhost:3000",
  PRODUCTION = "https://aqua.xyz",
}

export interface ModalParams {
  isMobile: boolean;
  isLandscape: boolean;
  environment: Environment;
  defaultUrl?: string;
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

export interface IWalletAddress {
  walletAddress: string;
}

export interface IVerifyUserIdentity {
  jwtToken: string;
  walletAddress: string;
}

export interface IEventMessage {
  data: {
    data: IUserInfo;
    event_id: EXTERNAL_EVENTS;
  };
}

export interface IUserInfo {
  isLoggedIn: boolean;
  walletAddress: string | null;
  jwtToken: string | null;
  nftList: NFTTypes[] | [];
  nfts: RetrievedNFTDetails;
}

export interface RetrievedNFTDetails {
  0: number;
  1: number;
  2: number;
}

export enum AQUA_STUDIOS_REQUEST_TYPES {
  MINT = "mint",
  VALIDATE_JWT_TOKEN = "validate-jwt-token",
  RETRIEVE_OWNED_NFTS = "retrieve-owned-nfts",
  RETRIEVE_AWARDED_NFTS = "retrieve-awarded-nfts",
  GENERATE_JWT_TOKEN = "generate-jwt-token",
}
