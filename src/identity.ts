import events from "events";
import { ExtendedGetResult } from "@fingerprintjs/fingerprintjs-pro";

import {
  Environment,
  IEventMessage,
  IUserInfo,
  IVerifyUserIdentity,
  IWalletAddress,
  NFTTypes,
} from "./types";

import { LoginModal } from "./modal";

import {
  checkNFTOwnership,
  getBrowserFingerprint,
  getUserDetails,
  logoutUser,
  retrieveNFTList,
} from "./requests";
import { EVENTS } from "./events";
import {
  awardNFT,
  retrieveAwardNFTDetails,
  retrieveOwnedNFTDetails,
  verifyUserIdentity,
} from "./api";

const eventEmitter = new events.EventEmitter();

export class AquaIdentitySDK {
  private readonly environment: Environment;
  private readonly defaultUrl: string | undefined;
  private browserFingerprint: ExtendedGetResult | undefined;
  private modal: LoginModal;

  constructor({
    defaultUrl,
    environment,
  }: {
    environment: Environment;
    defaultUrl?: string;
  }) {
    this.environment = environment;
    this.modal = new LoginModal();

    if (defaultUrl) {
      this.defaultUrl = defaultUrl;
    }

    window.onmessage = (e) => this.handleMessage(e, this.modal);
  }

  private async init() {
    this.browserFingerprint = await getBrowserFingerprint();
  }

  public async login({ isLandscape = false }: { isLandscape?: boolean }) {
    if (this.browserFingerprint === undefined) {
      await this.init();
    }

    if (!this.browserFingerprint) {
      throw new Error("Could not get the visitor id");
    }

    const isMobile = this.browserFingerprint.device !== "Other";

    const url = `${
      this.environment === Environment.DEVELOPMENT && this.defaultUrl
        ? this.defaultUrl
        : this.environment
    }/identity/login`;

    this.modal.showModal(isLandscape, isMobile, url);
  }

  public async logout() {
    if (this.browserFingerprint === undefined) {
      await this.init();
    }

    if (!this.browserFingerprint) {
      throw new Error("Could not get the visitor id");
    }

    const data = await logoutUser(this.browserFingerprint?.visitorId);

    eventEmitter.emit(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT,
    });
  }

  public async getWalletAddress() {
    if (this.browserFingerprint === undefined) {
      await this.init();
    }

    if (!this.browserFingerprint) {
      throw new Error("Could not get the visitor id");
    }

    const data = await getUserDetails(this.browserFingerprint?.visitorId);

    eventEmitter.emit(EVENTS.AQUA_IDENTITY_WALLET_ADDRESS, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_WALLET_ADDRESS,
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

  // TODO: TO BE DEPRECATED
  public async retrieveNFTList({ walletAddress }: IWalletAddress) {
    const data = await retrieveNFTList({ walletAddress });
    eventEmitter.emit(EVENTS.AQUA_IDENTITY_RETRIEVE_NFT_LIST, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_RETRIEVE_NFT_LIST,
    });
  }

  public async getAwardedDetailedNFTs({ walletAddress }: IWalletAddress) {
    const data = await retrieveAwardNFTDetails(walletAddress);
    eventEmitter.emit(EVENTS.AQUA_IDENTITY_AWARDED_NFTS_DETAILS, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_AWARDED_NFTS_DETAILS,
    });
  }

  public async getOwnedDetailedNFTs({ walletAddress }: IWalletAddress) {
    const data = await retrieveOwnedNFTDetails(walletAddress);

    eventEmitter.emit(EVENTS.AQUA_IDENTITY_OWNED_NFTS_DETAILS, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_OWNED_NFTS_DETAILS,
    });
  }

  public async verifyUserIdentity({
    jwtToken,
    walletAddress,
  }: IVerifyUserIdentity) {
    const data = await verifyUserIdentity({ jwtToken, walletAddress });

    eventEmitter.emit(EVENTS.AQUA_IDENTITY_VERIFY_USER_IDENTITY, {
      data,
      eventName: EVENTS.AQUA_IDENTITY_VERIFY_USER_IDENTITY,
    });
  }

  public on(type: EVENTS, cb: (event: { data: IUserInfo }) => void) {
    if (EVENTS[type]) {
      eventEmitter.on(type, cb);
    }
  }

  private handleMessage(event: IEventMessage, modal: LoginModal) {
    const eventName = EVENTS[`AQUA_IDENTITY_${event.data.event_id}`];
    if (eventName) {
      eventEmitter.emit(eventName, {
        data: event.data.data,
        eventName,
      });

      if (eventName === EVENTS.AQUA_IDENTITY_MODAL_CLOSE) {
        modal.closeModal();
      }
    }
  }
}
