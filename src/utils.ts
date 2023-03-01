import { Container, View, Environment, Messages, ModalParams } from "./types";

export const getViewPath = (view: View) => {
  switch (view) {
    case View.LOGIN:
      return `identity/${View.LOGIN}`;
    case View.LOGOUT:
      return `identity/${View.LOGOUT}`;
    case View.INVENTORY:
      return `identity/${View.INVENTORY}`;
    default:
      throw new Error(`${view} - undefined view`);
  }
};

export const getModalSize = ({
  widgetWidth,
  widgetHeight,
}: {
  widgetWidth?: string;
  widgetHeight?: string;
} = {}): { width: string; height: string } => {
  let width = "100%";
  let height = "100%";

  if (widgetWidth) {
    width = widgetWidth;
  }
  if (widgetHeight) {
    height = widgetHeight;
  }
  return { width, height };
};

const getCSS = (width: string, height: string) => {
  return `
      /* Modal Content/Box */
  
      .aquaIdentityModal {
      display: block;
      width: ${width};
      max-width: 500px;
      height: ${height};
      max-height: 100%;
      position: fixed;
      z-index: 100;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border: none;
      border-radius: 2%;
      margin: 0px auto;
      display: block;
      }
      
      #aquaIdentityModal{
      min-height: ${height}; 
      position: absolute; 
      border: none; 
      border-radius: 2%; 
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
      
      .aquaIdentityModalContainer{
      height: 100%;
      width:100%;
      }
      
      #aquaIdentityModalWrapper{
      margin-left: 10px;
      margin-right: 10px;
      }
      
      @media all and (max-width: ${width}) {
      .aqua_identity_modal {
      height: 100%;
      max-height:${height};
      top: 53%;
      }
      }
      
      @media all and (max-height: ${height}) and (max-width: ${width}) {
      #aquaIdentityWidget{
      padding-bottom: 15px;
      }
      }
      `;
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

const createModalContent = ({
  view,
  width,
  height,
  url,
}: {
  width: string;
  height: string;
  url: string;
  view: View;
}) => {
  switch (view) {
    case View.LOGIN:
      return `
          <div class="aquaIdentityModalOverlay" id="aquaIdentityModalOverlay">
          </div>
          <div class="aquaIdentityModal" id="aquaIdentityModal">
            <div class="aquaIdentityModalContent">
                <div class="aqua_identityContainer">
                  <iframe 
                  id="aquaIdentityWidget" 
                  allow="fullscreen" 
                  allowFullScreen 
                  src="${url}" 
                  style="width: ${width}; height: ${height}"
                  ></iframe>
                </div>
            </div>
          </div>`;
    case View.INVENTORY:
    case View.LOGOUT:
      return `<iframe 
        id="aquaIdentityWidget" 
        allow="fullscreen" 
        allowFullScreen 
        src="${url}" 
        style="width: 0px; height: 0px"
        ></iframe>`;
    default:
      throw new Error(`${view} - undefined view`);
  }
};

export const generateModalContent = ({
  widget: { width, height },
  view,
  environment,
  defaultUrl,
  query,
}: ModalParams) => {
  const path =
    environment === Environment.DEVELOPMENT && defaultUrl
      ? defaultUrl
      : environment;

  let url = `${path}/${getViewPath(view)}`;

  if (query) {
    url += `?${query}`;
  }

  let wrapper = document.getElementById("aquaIdentityModalWrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "aquaIdentityModalWrapper";
  }

  const innerHTML = createModalContent({
    width,
    height,
    url,
    view,
  });
  if (innerHTML) {
    wrapper.innerHTML = innerHTML;
  }

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

  //Prevent background scrolling when overlay appears
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = () => {
    return null;
  };
};

window.onmessage = ({ data }: { data: { type: Messages; json: string } }) => {
  const modalExists = document.getElementById("aquaIdentityModalWrapper");
  if (Messages[data?.type]) {
    console.log(data);
  }

  if (data?.type === Messages.AQUA_IDENTITY_LOGIN_CLOSE_MODAL && modalExists) {
    return closeModal();
  }
  if (data?.type === Messages.AQUA_IDENTITY_LOGOUT_CLOSE_MODAL && modalExists) {
    return closeModal();
  }
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === document.getElementById("aquaIdentityModal")) {
    return closeModal();
  }
};

export const getUrlSearchParams = (
  params: Record<string, string>
): string => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key: string) => searchParams.append(key, params[key]));
  return searchParams.toString();
};
