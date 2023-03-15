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
import {
  AquaIdentitySDK,
  Environment,
  EVENTS,
  NFTTypes,
} from "@aqua.xyz/identity-sdk";

```
#### Development Mode
```js
const aquaIdentity = new AquaIdentitySDK({
  environment: Environment.DEVELOPMENT,
  defaultUrl: "https://deploy-preview-3435--new-prod-aqua.netlify.app/", // Optional, but required for alpha build
});
```

#### Production Mode
```js
const aquaIdentity = new AquaIdentitySDK({
  environment: Environment.PRODUCTION,
});
```

```js
const login = async () => {
  await aquaIdentity.login({
    widgetHeight: "670px",
    widgetWidth: "373px",
  });
};

const logout = async () => {
  await aquaIdentity.logout();
};

const getWalletAddress = async () => {
  await aquaIdentity.getWalletAddress();
};

const isNFTAwarded = async () => {
  await aquaIdentity.isNFTAwarded({
    nftType: NFTTypes.SKIP, // NFTTypes.SLOWDOWN  ||  NFTTypes.SKIP  || NFTType.REDO
  });
};

const awardNFT = async () => {
  await aquaIdentity.awardNFT({
    nftType: NFTTypes.SLOWDOWN, // NFTTypes.SLOWDOWN  ||  NFTTypes.SKIP  || NFTType.REDO
  });
};

aquaIdentity.on(EVENTS.AQUA_IDENTITY_MODAL_CLOSE, aquaIdentity.close);

aquaIdentity.on(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_IN, (event) => {
  console.log("AQUA_IDENTITY_SUCCESSFULLY_LOG_IN", event.data);
});

aquaIdentity.on(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT, () => {
  console.log("SUCCESSFULLY_LOG_OUT");
});

aquaIdentity.on(EVENTS.AQUA_IDENTITY_WALLET_ADDRESS, (event) => {
  console.log("SUCCESSFULLY_RETRIEVED_WALLET_ADDRESS", event);
});

// --------- HARDCODED response for isNFTAwarded, valid: true ---------
aquaIdentity.on(EVENTS.AQUA_IDENTITY_VALIDATE_NFT_OWNERSHIP, (event) => {
  console.log("SUCCESSFULLY_VALIDATE_NFT_OWNERSHIP", event);
});

// --------- HARDCODED response for awardNFT, valid: true ---------
aquaIdentity.on(EVENTS.AQUA_IDENTITY_AWARD_NFT, (event) => {
  console.log("SUCCESSFULLY_AWARD_NFT", event);
});
```

### Environments

#### Development

For the `DEVELOPMENT` environment, the local server will run on `https://new-prod-aqua.netlify.app:8080/`.

#### Production
For the `PRODUCTION` environment, the local server will run on `https://games.aqua.xyz:8080/`.

