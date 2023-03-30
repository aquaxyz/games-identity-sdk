import events from "events";
import {
  Environment,
  EVENTS,
  EXTERNAL_EVENTS,
  View,
  NFTTypes,
  ValidateNFTOwnershipEvent,
  AwardNFTEvent,
  LoginEvent,
  WalletAddressEvent,
  LogoutEvent,
} from "./types";
import {
  awardNFT,
  checkNFTOwnership,
  closeModal,
  computeModalSize,
  generateModalContent,
  retrieveNFTList,
} from "./utils";
const eventEmitter = new events.EventEmitter();

export class AquaIdentitySDK {
  private readonly environment: Environment;
  private readonly defaultUrl: string | undefined;

  constructor({
    defaultUrl,
    environment,
  }: {
    environment: Environment;
    defaultUrl?: string;
  }) {
    this.environment = environment;
    if (defaultUrl) {
      this.defaultUrl = defaultUrl;
    }

    window.onmessage = this.handleMessage;
  }

  public async login({ isLandscape = false }: { isLandscape?: boolean }) {
    const { width, height } = computeModalSize(isLandscape);
    generateModalContent({
      width,
      height,
      defaultUrl: this.defaultUrl,
      environment: this.environment,
      view: View.LOGIN,
    });
  }

  public async logout() {
    generateModalContent({
      environment: this.environment,
      view: View.LOGOUT,
      defaultUrl: this.defaultUrl,
    });
  }

  public async isNFTAwarded(queryParams: {
    nftType: NFTTypes.REDO | NFTTypes.SKIP | NFTTypes.SLOWDOWN;
    walletAddress: string;
  }) {
    const data = await checkNFTOwnership(queryParams);
    eventEmitter.emit(EVENTS.AQUA_IDENTITY_IS_NFT_AWARDED, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_IS_NFT_AWARDED,
    });
  }

  public async awardNFT(queryParams: {
    nftType: NFTTypes.REDO | NFTTypes.SKIP | NFTTypes.SLOWDOWN;
    walletAddress: string;
  }) {
    const data = await awardNFT(queryParams);
    eventEmitter.emit(EVENTS.AQUA_IDENTITY_AWARD_NFT, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_AWARD_NFT,
    });
  }

  public async retrieveNFTList(queryParams: { walletAddress: string }) {
    const data = await retrieveNFTList(queryParams);
    eventEmitter.emit(EVENTS.AQUA_IDENTITY_RETRIEVE_NFT_LIST, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_RETRIEVE_NFT_LIST,
    });
  }

  public async getWalletAddress() {
    generateModalContent({
      environment: this.environment,
      view: View.WALLET_ADDRESS,
      defaultUrl: this.defaultUrl,
    });
  }

  public on(
    type: EVENTS,
    cb: (event: {
      data?:
        | WalletAddressEvent
        | LoginEvent
        | AwardNFTEvent
        | ValidateNFTOwnershipEvent;
    }) => void
  ) {
    if (EVENTS[type]) {
      eventEmitter.on(type, cb);
    }
  }

  private handleMessage(event: {
    data: {
      data: WalletAddressEvent | LoginEvent | LogoutEvent;
      event_id: EXTERNAL_EVENTS;
    };
  }) {
    const isAquaIdentityEvent =
      event &&
      event.data &&
      event.data.event_id &&
      EXTERNAL_EVENTS[event.data.event_id] !== undefined;

    if (isAquaIdentityEvent) {
      eventEmitter.emit(EVENTS[`AQUA_IDENTITY_${event.data.event_id}`], {
        data: event.data.data,
        eventName: EVENTS[`AQUA_IDENTITY_${event.data.event_id}`],
      });
      if (event.data.event_id === EXTERNAL_EVENTS.MODAL_CLOSE) {
        closeModal();
      }
    }
  }
}
