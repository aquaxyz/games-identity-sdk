import {
  Environment,
  LoginParams,
  LogoutParams,
  View,
  WalletInventory,
} from "./types";
import {
  generateModalContent,
  getModalSize,
  getUrlSearchParams,
} from "./utils";

export class AquaIdentitySDK {
  private readonly environment: Environment;

  constructor({ environment }: { environment: Environment }) {
    this.environment = environment;
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
      query: getUrlSearchParams(queryParams),
    });
  }
}
