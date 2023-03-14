import { Container, View, Environment, ModalParams } from "./types";

const getCSS = (width: string, height: string) => {
  return `
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

#aquaIdentityModalWidget{
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

@media all and (max-width: ${width}) {
  .aquaIdentityModal {
    height: 100%;
    max-height: ${height};
    top: 53%;
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
  widgetWidth = "0px",
  widgetHeight = "0px",
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

  const iframeHTML = `<iframe id="aquaIdentityWidget" allow="fullscreen" allowFullScreen src="${url}" style="width: ${widgetWidth}; height: ${widgetHeight}"></iframe>`;
  let innerHTML = iframeHTML;

  if (view === View.LOGIN) {
    innerHTML = `
      <div class="aquaIdentityModalOverlay" id="aquaIdentityModalOverlay">
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
  setStyle(widgetWidth, widgetHeight);

  const modal = document.getElementById("aquaIdentityModal");

  if (modal && modal.style) {
    modal.style.display = "block";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target === document.getElementById("aquaIdentityModal")) {
      return closeModal();
    }
  };
};
