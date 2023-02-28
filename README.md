# @aquaxyz/identity-sdk

A typescript library using aqua identity authentication.

## Installation

### Using yarn

```sh
# Using yarn
$ yarn add @aquaxyz/identity-sdk

# Using npm
$ npm install @aquaxyz/identity-sdk
```

### Example usage

```sh
import AquaIdentitySDK from '@aquaxyz/identity-sdk';
const aquaIdentitySdk = new AquaIdentitySDK(environment: '<environment: DEVELOPMENT/PRODUCTION>'), // (Required)

onLogin = () => aquaIdentitySdk.login({ widgetHeight, widgetWidth, defaultUrl, }: {
        widgetWidth?: string;
        widgetHeight?: string;
        defaultUrl?: string;
    }): Promise<void>;
onLogout = () => aquaIdentitySdk.logout({ widgetHeight, widgetWidth, defaultUrl, }: {
        widgetWidth?: string;
        widgetHeight?: string;
        defaultUrl?: string;
    }): Promise<void>;
showWallet = () => aquaIdentitySdk.showWallet({ widgetHeight, widgetWidth, defaultUrl, }: {
        widgetWidth?: string;
        widgetHeight?: string;
        defaultUrl?: string;
    }): Promise<void>;
```

### Environments

#### Development

For the `DEVELOPMENT` environment, the URL is `http://localhost:3000`, but you can change it by sending `defaultUrl` property as a parameter. (It applies only for development mode.)

#### Production

For the `PRODUCTION` environment, the URL used is `https://aqua.xyz`
