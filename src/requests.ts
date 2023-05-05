import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

import { generateJWTToken, retrieveOwnedNFTDetails } from "./api/aquaStudios";
import { getCachedUserData, deleteCachedUserData } from "./api/cacheUserData";
import { CheckNFT, IUserInfo, NFTTypes, IWalletAddress } from "./types";

export const checkNFTOwnership = async ({
  walletAddress,
  nftType,
}: CheckNFT) => {
  const nftList = await getNFTOwnership(walletAddress.toLowerCase());

  return {
    valid: nftList.includes(nftType),
  };
};

export const retrieveNFTList = async ({ walletAddress }: IWalletAddress) => {
  const nftList = await getNFTOwnership(walletAddress.toLowerCase());
  return nftList;
};

// TODO: TO BE DEPRECATED

const getNFTOwnership = async (walletAddress: string): Promise<NFTTypes[]> => {
  const tokenAddress = "0x87966e1e839065d6abf069e685f1cd3ba987ff51";
  const boostAssetClassKeys = {
    "aqua_boosts:TimeBonus": "slowdown",
    "aqua_boosts:Rewind": "redo",
    "aqua_boosts:Skip": "skip",
  };
  const url = `https://api-v2.aqua.xyz/wallet-summary?wallet_address=${walletAddress}&token_addresses=${tokenAddress}`;

  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg);
  }

  return data.walletSummary.map(
    ({ asset_class_key }: { asset_class_key: string }) =>
      boostAssetClassKeys[asset_class_key as keyof typeof boostAssetClassKeys]
  );
};

export const getBrowserFingerprint = async () => {
  const fp = await FingerprintJS.load({
    apiKey: "i3QlmfXIQONAODnnwwWa",
  });

  const result = await fp.get({ extendedResult: true });

  return result;
};

export const getUserDetails = async (visitorId: string): Promise<IUserInfo> => {
  const { walletAddress } = await getCachedUserData(visitorId);
  const response = {
    isLoggedIn: false,
    walletAddress: null,
    jwtToken: null,
    nftList: [],
    nfts: {
      0: 0,
      1: 0,
      2: 0,
    },
  };

  if (walletAddress) {
    const nftList = await getNFTOwnership(walletAddress);
    const jwtToken = await generateJWTToken(walletAddress);
    const { nfts } = await retrieveOwnedNFTDetails(walletAddress);

    return {
      isLoggedIn: true,
      walletAddress,
      jwtToken,
      nftList,
      nfts,
    };
  }

  return response;
};

export const logoutUser = async (visitorId: string) => {
  const response = await deleteCachedUserData(visitorId);
  return response;
};
