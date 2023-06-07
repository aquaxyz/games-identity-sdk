import { NFTTypes } from "./types";

export enum EVENTS {
  AQUA_IDENTITY_MODAL_CLOSE = "AQUA_IDENTITY_MODAL_CLOSE",
  AQUA_IDENTITY_SUCCESSFULLY_LOG_IN = "AQUA_IDENTITY_SUCCESSFULLY_LOG_IN",
  AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT = "AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT",
  AQUA_IDENTITY_WALLET_ADDRESS = "AQUA_IDENTITY_WALLET_ADDRESS",
  AQUA_IDENTITY_IS_NFT_AWARDED = "AQUA_IDENTITY_IS_NFT_AWARDED",
  AQUA_IDENTITY_RETRIEVE_NFT_LIST = "AQUA_IDENTITY_RETRIEVE_NFT_LIST",
  AQUA_IDENTITY_OWNED_NFTS_DETAILS = "AQUA_IDENTITY_OWNED_NFTS_DETAILS",
  AQUA_IDENTITY_AWARDED_NFTS_DETAILS = "AQUA_IDENTITY_AWARDED_NFTS_DETAILS",
  AQUA_IDENTITY_AWARD_NFT = "AQUA_IDENTITY_AWARD_NFT",
  AQUA_IDENTITY_VERIFY_USER_IDENTITY = "AQUA_IDENTITY_VERIFY_USER_IDENTITY",
}

export enum EXTERNAL_EVENTS {
  MODAL_CLOSE = "MODAL_CLOSE",
  SUCCESSFULLY_LOG_IN = "SUCCESSFULLY_LOG_IN",
  SUCCESSFULLY_LOG_OUT = "SUCCESSFULLY_LOG_OUT",
  WALLET_ADDRESS = "WALLET_ADDRESS",
}

export interface WalletAddressEvent {
  isLoggedIn: boolean;
  walletAddress: string | null;
  profile: {
    username: string | null;
    avatar: string | null;
  };
  jwtToken: string | null;
  nftList: NFTTypes[];
  ownedNfts: RetrievedNFTDetails;
}

export interface LoginEvent {
  isLoggedIn: boolean;
  walletAddress: string;
  profile: {
    username: string | null;
    avatar: string | null;
  };
  jwtToken: string;
  nftList: NFTTypes[];
  ownedNfts: RetrievedNFTDetails;
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

export interface RetrievedNFTDetails {
  0: number;
  1: number;
  2: number;
}
