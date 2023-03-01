import { Environment, View } from "./types";
import { generateModalContent, getModalSize } from "./utils";

export class AquaIdentitySDK {
  private readonly environment: Environment;

  constructor({ environment }: { environment: Environment }) {
    this.environment = environment;
  }

  public async login({
    widgetHeight,
    widgetWidth,
    defaultUrl,
  }: {
    widgetWidth?: string;
    widgetHeight?: string;
    defaultUrl?: string;
  }) {
    const { width, height } = getModalSize({
      widgetHeight,
      widgetWidth,
    });

    generateModalContent({
      width,
      height,
      environment: this.environment,
      view: View.LOGIN,
      defaultUrl,
    });
  }

  public async logout({
    widgetHeight,
    widgetWidth,
    defaultUrl,
  }: {
    widgetWidth?: string;
    widgetHeight?: string;
    defaultUrl?: string;
  }) {
    const { width, height } = getModalSize({
      widgetHeight,
      widgetWidth,
    });

    generateModalContent({
      width,
      height,
      environment: this.environment,
      view: View.LOGOUT,
      defaultUrl,
    });
  }

  public async showWallet({
    widgetHeight,
    widgetWidth,
    defaultUrl,
  }: {
    widgetWidth?: string;
    widgetHeight?: string;
    defaultUrl?: string;
  }) {
    const { width, height } = getModalSize({
      widgetHeight,
      widgetWidth,
    });

    generateModalContent({
      width,
      height,
      environment: this.environment,
      view: View.WALLET_INVENTORY,
      defaultUrl,
    });
  }
}
