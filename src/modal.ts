import { Container } from "./types";

const getCSS = (width: number, height: number) => {
  return `
.aquaIdentityModal {
  display: block;
  width: ${width}px;
  max-width: ${width}px;
  height: ${height}px;
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
  min-height: ${height}px; 
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

@media all and (max-width: ${width}px) {
  .aquaIdentityModal {
    height: 100%;
    max-height: ${height}px;
    top: 50%;
  }
}

@media all and (max-height: ${height}px) and (max-width: ${width}px) {
    #aquaIdentityModalWidget{
      padding-bottom: 15px;
    }
  }`;
};
export class LoginModal {
  private computeModalWithMobileSize = (isLandscape: boolean) => {
    const MIN_WIDTH = 300;
    const MAX_WIDTH = 448;
    const MAX_HEIGHT = 660;

    const { innerWidth, innerHeight } = window;

    const horizontalPadding = isLandscape ? 50 : 10;
    const verticalPadding = isLandscape ? 10 : 60;

    const width = Math.min(
      Math.max(innerWidth - horizontalPadding, MIN_WIDTH),
      MAX_WIDTH
    );
    const height = Math.min(
      Math.max(innerHeight - verticalPadding, innerHeight - verticalPadding),
      MAX_HEIGHT
    );

    return { width, height };
  };

  public showModal = (isLandscape: boolean, isMobile: boolean, url: string) => {
    let modalSizes = {
      width: 375,
      height: 667,
    };

    if (isMobile) {
      modalSizes = this.computeModalWithMobileSize(isLandscape);
    }
    const { width, height } = modalSizes;

    // create modal structure
    let wrapper = document.getElementById("aquaIdentityModalWrapper");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "aquaIdentityModalWrapper";
    }

    wrapper.innerHTML = `
      <div class="aquaIdentityModalOverlay">
      </div>
      <div class="aquaIdentityModal" id="aquaIdentityModal">
        <div class="aquaIdentityModalContent">
          <div class="aquaIdentityContainer">
            <iframe 
              id="aquaIdentityWidget" 
              allow="fullscreen" 
              src=${url}
              style="width: ${width}px; height: ${height}px;border: 0px"
            >
            </iframe>
          </div>
        </div>
      </div>`;

    let container: Container = document.getElementsByTagName("body");
    if (!container) {
      container = document.getElementsByTagName("html");
    }
    if (!container) {
      container = document.getElementsByTagName("div");
    }
    container[0].appendChild(wrapper);

    // set modal style
    const style = document.createElement("style");
    style.innerHTML = getCSS(width, height);

    wrapper.appendChild(style);

    const modal = document.getElementById("aquaIdentityModal");
    if (modal && modal.style) {
      modal.style.display = "block";
    }
  };

  public closeModal = () => {
    const modal = document.getElementById("aquaIdentityModalWrapper");

    if (modal && modal.style) {
      modal.style.display = "none";
      modal.innerHTML = "";
      modal.remove();
    }
  };
}
