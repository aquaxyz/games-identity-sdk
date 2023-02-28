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
  }: {
    widgetWidth?: string;
    widgetHeight?: string;
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
    });
  }

  public async logout({
    widgetHeight,
    widgetWidth,
  }: {
    widgetWidth?: string;
    widgetHeight?: string;
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
    });
  }

  public async showWallet({
    widgetHeight,
    widgetWidth,
  }: {
    widgetWidth?: string;
    widgetHeight?: string;
  }) {
    const { width, height } = getModalSize({
      widgetHeight,
      widgetWidth,
    });

    generateModalContent({
      width,
      height,
      environment: this.environment,
      view: View.WALLET,
    });
  }
}
