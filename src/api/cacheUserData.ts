import { IWalletAddress } from "../types";

export const getCachedUserData = async (
  visitorId: string
): Promise<IWalletAddress> => {
  console.log(visitorId);
  const walletAddress = "fsdfsd";
  return { walletAddress: walletAddress.toLowerCase() };
};

export const deleteCachedUserData = async (
  visitorId: string
): Promise<{ isLogout: boolean }> => {
  console.log(visitorId);
  return { isLogout: true };
};
