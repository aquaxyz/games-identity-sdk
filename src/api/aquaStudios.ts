import {
  AQUA_STUDIOS_REQUEST_TYPES,
  IVerifyUserIdentity,
  CheckNFT,
  fromNFTToIndex,
  RetrievedNFTDetails,
} from "../types";

export const fetchAquaStudioData = async (
  dataType: AQUA_STUDIOS_REQUEST_TYPES,
  queryParams: URLSearchParams
) => {
  const response = await fetch(
    `https://api-v2.aqua.xyz/aquaStudios/${dataType}?${queryParams}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.msg ?? json.message);
  }

  if (
    json?.error &&
    dataType === AQUA_STUDIOS_REQUEST_TYPES.VALIDATE_JWT_TOKEN
  ) {
    throw new Error(
      `${json.error}. ${JSON.stringify(
        {
          jwtToken: json.jwt_token,
          walletAddress: json.wallet_address,
        },
        null,
        2
      )}`
    );
  }

  return json;
};

export const generateJWTToken = async (walletAddress: string) => {
  const response = await fetchAquaStudioData(
    AQUA_STUDIOS_REQUEST_TYPES.GENERATE_JWT_TOKEN,
    new URLSearchParams({
      wallet_address: walletAddress.toLowerCase(),
    })
  );

  return response;
};

export const verifyUserIdentity = async ({
  walletAddress,
  jwtToken,
}: IVerifyUserIdentity) => {
  const response = await fetchAquaStudioData(
    AQUA_STUDIOS_REQUEST_TYPES.VALIDATE_JWT_TOKEN,
    new URLSearchParams({
      wallet_address: walletAddress.toLowerCase(),
      jwt_token: jwtToken,
    })
  );

  return {
    valid: !!response.success,
    jwtToken,
    walletAddress,
  };
};

export const awardNFT = async ({ walletAddress, nftType }: CheckNFT) => {
  const { status } = await fetchAquaStudioData(
    AQUA_STUDIOS_REQUEST_TYPES.MINT,
    new URLSearchParams({
      wallet_address: walletAddress.toLowerCase(),
      nft_type: fromNFTToIndex[nftType].toString(),
    })
  );

  return { valid: status === 200 };
};

export const retrieveOwnedNFTDetails = async (walletAddress: string) => {
  const nfts: RetrievedNFTDetails = await fetchAquaStudioData(
    AQUA_STUDIOS_REQUEST_TYPES.RETRIEVE_OWNED_NFTS,
    new URLSearchParams({
      wallet_address: walletAddress.toLowerCase(),
    })
  );

  return { nfts };
};

export const retrieveAwardNFTDetails = async (walletAddress: string) => {
  const nfts: RetrievedNFTDetails = await fetchAquaStudioData(
    AQUA_STUDIOS_REQUEST_TYPES.RETRIEVE_AWARDED_NFTS,
    new URLSearchParams({
      wallet_address: walletAddress.toLowerCase(),
    })
  );

  return { nfts };
};
