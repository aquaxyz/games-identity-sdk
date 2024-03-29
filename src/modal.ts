import { Container, View, Environment, ModalParams } from "./types";

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

export interface AuthError {
  status: "ERROR";
  msg: string;
}
export interface AuthChallengeResponse extends Partial<AuthError> {
  public_address: string;
  challenge: string;
  sb_user_id: string;
}

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
      width: "380px",
      height: "735px",
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
