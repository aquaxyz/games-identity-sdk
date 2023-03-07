import events from "events";
import queryString from "query-string";
import {
  Environment,
  EVENTS,
  EXTERNAL_EVENTS,
  LoginParams,
  HandlerProps,
  View,
  AwardNFT,
  ValidateNFTOwnership,
} from "./types";
import { closeModal, generateModalContent, getModalSize } from "./utils";
const eventEmitter = new events.EventEmitter();

export class AquaIdentitySDK {
  private readonly environment: Environment;

  constructor({ environment }: { environment: Environment }) {
    this.environment = environment;
    window.onmessage = this.handleMessage;
  }

  public async login({
    widget: { widgetHeight, widgetWidth },
    defaultUrl,
  }: LoginParams) {
    const { width, height } = getModalSize({
      widgetHeight,
      widgetWidth,
    });

    generateModalContent({
      widget: {
        width,
        height,
      },
      environment: this.environment,
      view: View.LOGIN,
      defaultUrl,
    });
  }

  public async logout({
    widget = { widgetHeight: "0", widgetWidth: "0" },
    defaultUrl,
  }: HandlerProps) {
    const { widgetHeight, widgetWidth } = widget;
    const { width, height } = getModalSize({
      widgetHeight,
      widgetWidth,
    });

    generateModalContent({
      widget: {
        width,
        height,
      },
      environment: this.environment,
      view: View.LOGOUT,
      defaultUrl,
    });
  }

  public async validateNFTOwnership({
    widget = { widgetHeight: "0", widgetWidth: "0" },
    defaultUrl,
    queryParams,
  }: ValidateNFTOwnership) {
    const { widgetHeight, widgetWidth } = widget;
    const { width, height } = getModalSize({
      widgetHeight,
      widgetWidth,
    });

    generateModalContent({
      widget: {
        width,
        height,
      },
      environment: this.environment,
      view: View.VALIDATE_NFT_OWNERSHIP,
      defaultUrl,
      query: queryString.stringify(queryParams),
    });
  }

  public async awardNFT({
    widget = { widgetHeight: "0", widgetWidth: "0" },
    defaultUrl,
    queryParams,
  }: AwardNFT) {
    const { widgetHeight, widgetWidth } = widget;
    const { width, height } = getModalSize({
      widgetHeight,
      widgetWidth,
    });

    generateModalContent({
      widget: {
        width,
        height,
      },
      environment: this.environment,
      view: View.AWARD_NFT,
      defaultUrl,
      query: queryString.stringify(queryParams),
    });
  }

  public async getWalletAddress({
    widget = { widgetHeight: "0", widgetWidth: "0" },
    defaultUrl,
  }: HandlerProps) {
    const { widgetHeight, widgetWidth } = widget;
    const { width, height } = getModalSize({
      widgetHeight,
      widgetWidth,
    });

    generateModalContent({
      widget: {
        width,
        height,
      },
      environment: this.environment,
      view: View.WALLET_ADDRESS,
      defaultUrl,
    });
  }

  public on(type: EVENTS, cb: (data?: unknown) => void) {
    if (EVENTS[type]) {
      eventEmitter.on(type, cb);
    }
  }

  public close() {
    closeModal();
  }

  private handleMessage(event: {
    data: { data: unknown; event_id: EXTERNAL_EVENTS };
  }) {
    const isAquaIdentityEvent =
      event &&
      event.data &&
      event.data.event_id &&
      EXTERNAL_EVENTS[event.data.event_id];
    if (isAquaIdentityEvent) {
      if (event.data.event_id === EXTERNAL_EVENTS.MODAL_CLOSE) {
        return eventEmitter.emit(EVENTS.AQUA_IDENTITY_MODAL_CLOSE, {
          eventName: EVENTS.AQUA_IDENTITY_MODAL_CLOSE,
        });
      }
      return eventEmitter.emit(EVENTS[`AQUA_IDENTITY_${event.data.event_id}`], {
        data: event.data.data,
        eventName: EVENTS[`AQUA_IDENTITY_${event.data.event_id}`],
      });
    }
  }
}
