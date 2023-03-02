import events from "events";
import queryString from "query-string";
import {
  Environment,
  EVENTS,
  EXTERNAL_EVENTS,
  LoginParams,
  LogoutParams,
  View,
  WalletInventory,
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
  }: LogoutParams) {
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

  public async getWalletInventory({
    widget = { widgetHeight: "0", widgetWidth: "0" },
    defaultUrl,
    queryParams,
  }: WalletInventory) {
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
      view: View.INVENTORY,
      defaultUrl,
      query: queryString.stringify(queryParams),
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
    if (event && event.data && event.data.event_id) {
      switch (event.data.event_id) {
        case EXTERNAL_EVENTS.MODAL_CLOSE: {
          eventEmitter.emit(EVENTS.AQUA_IDENTITY_MODAL_CLOSE, {
            eventName: EVENTS.AQUA_IDENTITY_MODAL_CLOSE,
          });
          break;
        }
        case EXTERNAL_EVENTS.INVENTORY: {
          eventEmitter.emit(EVENTS.AQUA_IDENTITY_SDK_INVENTORY, {
            data: event.data.data,
            eventName: EVENTS.AQUA_IDENTITY_SDK_INVENTORY,
          });
          break;
        }
        case EXTERNAL_EVENTS.SUCCESSFULLY_LOG_IN: {
          eventEmitter.emit(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_IN, {
            data: event.data.data,
            eventName: EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_IN,
          });
          break;
        }
        case EXTERNAL_EVENTS.SUCCESSFULLY_LOG_OUT: {
          eventEmitter.emit(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT, {
            data: event.data.data,
            eventName: EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT,
          });
          break;
        }

        default:
          break;
      }
    }
  }
}
