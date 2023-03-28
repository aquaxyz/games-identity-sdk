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

#### Production Mode
```js
const aquaIdentity = new AquaIdentitySDK({
  environment: Environment.PRODUCTION,
});
```

```js
const login = async () => {
  await aquaIdentity.login({ isLandscape: true });
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

// ------- Example usage in game logic to retrieve the list of owned NFTs -------
const nftsList = await retrieveNFTList();

// Response would contain the NFTs the user already owns:
nftsList = [
  NFTTypes.SKIP,
  NFTTypes.SLOWDOWN,
  NFTTypes.REDO
];

// ------- Example usage in game logic to award the SLOWDOWN NFT on first game win -------
if (playerWonFirstGameInLudo) {
  const hasNFTBeenAwarded = await isNFTAwarded({ nftType: NFTTypes.SLOWDOWN });

  if (!hasNFTBeenAwarded) {
    // The "slowdown" NFT is not owned by the current logged in user

    await awardNFT({ nftType: NFTTypes.SLOWDOWN }); // Awarding "slowdown" NFT to the current logged in user
 
    // Game displays awarding message - example: "Congrats, you won the "slowdown" NFT
  } else {
    // Game should not display the awarding message, if the NFT has been already awarded by winning a first match in a different game
  }
}

aquaIdentity.on(EVENTS.AQUA_IDENTITY_MODAL_CLOSE, aquaIdentity.close);

aquaIdentity.on(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_IN, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     "isLoggedIn": true,
  //     "walletAddress": "0xewgwt34..."
  //     "nftList": [
  //         "skip",
  //         "redo",
  //         "slowdown"
  //     ]
  //   }
  // }
  console.log("AQUA_IDENTITY_SUCCESSFULLY_LOG_IN", event.data);
});

aquaIdentity.on(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_OUT, () => {
  // Example of response
  // event = { 
  //   data: {
  //     isLogout: true
  //   }
  // }
  console.log("SUCCESSFULLY_LOG_OUT");
});

aquaIdentity.on(EVENTS.AQUA_IDENTITY_WALLET_ADDRESS, (event) => {
  console.log("SUCCESSFULLY_RETRIEVED_WALLET_ADDRESS", event);
});

// --------- HARDCODED response for isNFTAwarded, valid: true ---------
aquaIdentity.on(EVENTS.AQUA_IDENTITY_IS_NFT_AWARDED, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     awarded: true
  //   }
  // }
  console.log("SUCCESSFULLY_VALIDATE_NFT_OWNERSHIP", event);
});

// --------- HARDCODED response for awardNFT, valid: true ---------
aquaIdentity.on(EVENTS.AQUA_IDENTITY_AWARD_NFT, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     valid: true
  //   }
  // }
  console.log("SUCCESSFULLY_AWARD_NFT", event);
});

// --------- HARDCODED response for retrieveNFTList, nftList: [NFTTypes.SKIP] ---------
aquaIdentity.on(EVENTS.AQUA_IDENTITY_RETRIEVE_NFT_LIST, (event) => {
  console.log("SUCCESSFULLY_AQUA_IDENTITY_RETRIEVE_NFT_LIST", event);
});
```

### Environments

#### Development

For the `DEVELOPMENT` environment, the local server will run on `https://new-prod-aqua.netlify.app:8080/`.

#### Production
For the `PRODUCTION` environment, the local server will run on `https://games.aqua.xyz:8080/`.

