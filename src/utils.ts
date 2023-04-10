import {
  Container,
  View,
  Environment,
  ModalParams,
  fromNFTToIndex,
  AwardNFT,
} from "./types";

const getCSS = (width: string, height: string) => {
  return `
.aquaIdentityModal {
  display: block;
  width: ${width};
  max-width: ${width};
  height: ${height};
  max-height: 100%;
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: none;
  margin: 0px auto;
  display: block;
}

#aquaIdentityModalWidget{
  min-height: ${height}; 
  position: absolute; 
  border: none; 
  margin: 0px auto; 
  display: block;
}

.aquaIdentityModalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;

  background: rgba(0, 0, 0, 0.6);
}

.aquaIdentityModalContent{
  width: 100%;
  height: 100%;
  overflow: auto;
}

.aquaIdentityContainer {
  display: flex;
}

@media all and (max-width: ${width}) {
  .aquaIdentityModal {
    height: 100%;
    max-height: ${height};
    top: 50%;
  }
}

@media all and (max-height: ${height}) and (max-width: ${width}) {
    #aquaIdentityModalWidget{
      padding-bottom: 15px;
    }
  }`;
};

const setStyle = (width: string, height: string) => {
  const style = document.createElement("style");
  style.innerHTML = getCSS(width, height);
  const modal = document.getElementById("aquaIdentityModalWrapper");
  if (modal) {
    modal.appendChild(style);
  }
};

export const closeModal = () => {
  const modal = document.getElementById("aquaIdentityModalWrapper");

  if (modal && modal.style) {
    modal.style.display = "none";
    modal.innerHTML = "";
    modal.remove();
  }
};

export const generateModalContent = ({
  width = "0px",
  height = "0px",
  view,
  environment,
  defaultUrl,
  query,
}: ModalParams) => {
  const path =
    environment === Environment.DEVELOPMENT && defaultUrl
      ? defaultUrl
      : environment;

  let url = `${path}/identity/${view}`;

  if (query) {
    url += `?${query}`;
  }

  let wrapper = document.getElementById("aquaIdentityModalWrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "aquaIdentityModalWrapper";
  }

  const iframeHTML = `<iframe 
  id="aquaIdentityWidget" 
  allow="fullscreen" 
  src="${url}" 
  style="width: ${width}; height: ${height};border: 0px"
  ></iframe>`;
  let innerHTML = iframeHTML;

  if (view === View.LOGIN) {
    innerHTML = `
      <div class="aquaIdentityModalOverlay">
      </div>
      <div class="aquaIdentityModal" id="aquaIdentityModal">
        <div class="aquaIdentityModalContent">
          <div class="aquaIdentityContainer">
            ${iframeHTML}
          </div>
        </div>
      </div>`;
  }

  wrapper.innerHTML = innerHTML;

  let container: Container = document.getElementsByTagName("body");
  if (!container) {
    container = document.getElementsByTagName("html");
  }
  if (!container) {
    container = document.getElementsByTagName("div");
  }
  container[0].appendChild(wrapper);

  setStyle(width, height);

  const modal = document.getElementById("aquaIdentityModal");
  if (modal && modal.style) {
    modal.style.display = "block";
  }
};

const getSizeBetweenMinMax = (
  min: number,
  max: number,
  value: number
): number => {
  if (value >= min && value <= max) {
    return value;
  }
  if (value >= max) {
    return max;
  }

  return min;
};

export const computeModalSize = (isLandscape = false) => {
  const MOBILE_USER_AGENTS = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  const isMobile =
    MOBILE_USER_AGENTS.reduce((acc, agent) => {
      if (acc) {
        return acc;
      }

      const agentMatches = navigator.userAgent.match(agent);

      return agentMatches ? agentMatches?.length > 1 : false;
    }, false) ||
    (/Macintosh/i.test(navigator.userAgent) &&
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 1);

  if (!isMobile) {
    return {
      width: "375px",
      height: "667px",
    };
  }

  const minWidth = 300;
  const maxWidth = 448;

  const portraitWidth = getSizeBetweenMinMax(
    minWidth,
    maxWidth,
    window.innerWidth - 10
  );
  const landscapeWidth = getSizeBetweenMinMax(
    minWidth,
    maxWidth,
    window.innerWidth - 50
  );

  const width = isLandscape ? landscapeWidth : portraitWidth;

  const maxHeight = 660;

  const portraitHeight =
    window.innerHeight - 60 > maxHeight ? maxHeight : window.innerHeight - 60;
  const landscapeHeight =
    window.innerHeight - 10 > maxHeight ? maxHeight : window.innerHeight - 10;

  const height = isLandscape ? landscapeHeight : portraitHeight;
  return {
    width: `${width}px`,
    height: `${height}px`,
  };
};

export const checkNFTOwnership = async ({
  walletAddress,
  nftType,
}: AwardNFT) => {
  const nftList = await getNFTOwnership(walletAddress);

  return {
    valid: nftList.includes(nftType),
  };
};

export const retrieveNFTList = async ({
  walletAddress,
}: {
  walletAddress: string;
}) => {
  const nftList = await getNFTOwnership(walletAddress);
  return nftList;
};

export const awardNFT = async ({ walletAddress, nftType }: AwardNFT) => {
  const { status } = await fetch(
    `https://api-v2.aqua.xyz/aquaStudios/mint?${new URLSearchParams({
      wallet_address: walletAddress,
      nft_type: fromNFTToIndex[nftType].toString(),
    })}`
  );

  return { valid: status === 200 };
};

const getNFTOwnership = async (walletAddress: string): Promise<string[]> => {
  const tokenAddress = "0x87966e1e839065d6abf069e685f1cd3ba987ff51";
  const boostAssetClassKeys = {
    "aqua_boosts:TimeBonus": "slowdown",
    "aqua_boosts:Rewind": "redo",
    "aqua_boosts:Skip": "skip",
  };
  const url = `https://api-v2.aqua.xyz/wallet-summary?wallet_address=${walletAddress?.toLowerCase()}&token_address=${tokenAddress}`;

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
