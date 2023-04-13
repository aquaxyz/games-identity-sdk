import events from "events";
import { Environment, View, NFTTypes } from "./types";

import { closeModal, computeModalSize, generateModalContent } from "./modal";

import {
  awardNFT,
  checkNFTOwnership,
  retrieveNFTList,
  verifyUserIdentity,
} from "./requests";
import {
  EVENTS,
  WalletAddressEvent,
  LoginEvent,
  LogoutEvent,
  EXTERNAL_EVENTS,
} from "./events";

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

  public async getWalletAddress() {
    generateModalContent({
      environment: this.environment,
      view: View.WALLET_ADDRESS,
      defaultUrl: this.defaultUrl,
    });
  }

  public async isNFTAwarded(queryParams: {
    nftType: NFTTypes;
    walletAddress: string;
  }) {
    const data = await checkNFTOwnership(queryParams);
    eventEmitter.emit(EVENTS.AQUA_IDENTITY_IS_NFT_AWARDED, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_IS_NFT_AWARDED,
    });
  }

  public async awardNFT(queryParams: {
    nftType: NFTTypes;
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

  public async verifyUserIdentity(queryParams: { walletAddress: string }) {
    const data = await verifyUserIdentity(queryParams);
    eventEmitter.emit(EVENTS.AQUA_IDENTITY_VERIFY_USER_IDENTITY, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_VERIFY_USER_IDENTITY,
    });
  }

  public on(
    type: EVENTS,
    cb: (event: {
      data?: WalletAddressEvent | LoginEvent | LogoutEvent;
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
