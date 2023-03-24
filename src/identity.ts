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
} from "./types";
import { closeModal, computeModalSize, generateModalContent } from "./utils";
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

  public async isNFTAwarded(queryParams: { nftType: NFTTypes }) {
    generateModalContent({
      environment: this.environment,
      view: View.IS_NFT_AWARDED,
      query: new URLSearchParams(queryParams).toString(),
      defaultUrl: this.defaultUrl,
    });
  }

  public async awardNFT(queryParams: { nftType: NFTTypes }) {
    generateModalContent({
      environment: this.environment,
      view: View.AWARD_NFT,
      query: new URLSearchParams(queryParams).toString(),
      defaultUrl: this.defaultUrl,
    });
  }
  public async retrieveNFTList() {
    generateModalContent({
      environment: this.environment,
      view: View.RETRIEVE_NFT_LIST,
      defaultUrl: this.defaultUrl,
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

  public close() {
    closeModal();
  }

  private handleMessage(event: {
    data: {
      data:
        | WalletAddressEvent
        | LoginEvent
        | AwardNFTEvent
        | ValidateNFTOwnershipEvent;
      event_id: EXTERNAL_EVENTS;
    };
  }) {
    const isAquaIdentityEvent =
      event &&
      event.data &&
      event.data.event_id &&
      EXTERNAL_EVENTS[event.data.event_id];
    if (isAquaIdentityEvent) {
      if (event.data.event_id === EXTERNAL_EVENTS.MODAL_CLOSE) {
        setTimeout(() => eventEmitter.emit(EVENTS.AQUA_IDENTITY_MODAL_CLOSE, {
          eventName: EVENTS.AQUA_IDENTITY_MODAL_CLOSE,
        }), 1000);
      }
      return eventEmitter.emit(EVENTS[`AQUA_IDENTITY_${event.data.event_id}`], {
        data: event.data.data,
        eventName: EVENTS[`AQUA_IDENTITY_${event.data.event_id}`],
      });
    }
  }
}
