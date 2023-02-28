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

onLogin = () => aquaIdentitySdk.login({ widgetHeight, widgetWidth, }: {
        widgetWidth?: string;
        widgetHeight?: string;
    }): Promise<void>;
onLogout = () => aquaIdentitySdk.logout({ widgetHeight, widgetWidth, }: {
        widgetWidth?: string;
        widgetHeight?: string;
    }): Promise<void>;
showWallet = () => aquaIdentitySdk.showWallet({ widgetHeight, widgetWidth, }: {
        widgetWidth?: string;
        widgetHeight?: string;
    }): Promise<void>;
```

### Environments

#### Development

For the `DEVELOPMENT` environment, the default URL is `http://localhost:3000`, but you can add the `DEVELOPMENT_URL` variable to your .env file and the default value will be overwritten.

#### Production

For the `PRODUCTION` environment, the URL used is `https://aqua.xyz`
