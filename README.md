# @aqua.xyz/identity-sdk

A typescript library using aqua identity authentication.

## Installation

### Using yarn

```sh
# Using yarn
$ yarn add @aqua.xyz/identity-sdk

# Using npm
$ npm install @aqua.xyz/identity-sdk
```

### Example usage

```js
import AquaIdentitySDK from '@aquaxyz/identity-sdk';
const aquaIdentitySdk = new AquaIdentitySDK(environment: '<environment: DEVELOPMENT/PRODUCTION>') // (Required)

onLogin = () =>  await aquaIdentitySdk.login({
        widget: {
            widgetHeight: '700px',
            widgetWidth: '450px'
        },
        defaultParams: 'localhost:8080' // Optional
        });
onLogout = () => await aquaIdentitySdk.logout({
        widget: {
            widgetHeight: '0px',
            widgetWidth: '0px',
        },
        defaultParams: 'localhost:8080' // Optional
});

aquaIdentitySdk.on(EVENTS.AQUA_IDENTITY_MODAL_CLOSE, aquaIdentitySdk.close);

aquaIdentitySdk.on(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT, () => {
    console.log('AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT')
});

aquaIdentitySdk.on(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_IN, (event: any) => {
    console.log('AQUA_IDENTITY_SUCCESSFULLY_LOG_IN', event.data)
});
```

### Environments

#### Development

For the `DEVELOPMENT` environment, the URL is `http://localhost:3000`, but you can change it by sending the `defaultUrl` property as a parameter. (It applies only to development mode.)

#### Production

For the `PRODUCTION` environment, the URL used is `https://aqua.xyz`
