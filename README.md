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

const verifyUserIdentity = async () => {
    await aquaIdentity.verifyUserIdentity({
        walletAddress: YOUR_WALLET_ADDRESS, // Replace YOUR_WALLET_ADDRESS with the wallet address that needs to be verified
        token: YOUR_TOKEN // Replace YOUR_TOKEN with the jwt token

    })
}

const getOwnedDetailedNFTs = async () => {
    await aquaIdentity.getOwnedDetailedNFTs({
        walletAddress: YOUR_WALLET_ADDRESS /
    })
}

const getAwardedDetailedNFTs = async () => {
    await aquaIdentity.getAwardedDetailedNFTs({
        walletAddress: YOUR_WALLET_ADDRESS /
    })
}

// ------- Example usage in game logic to retrieve the list of owned NFTs -------
const nftsList = await retrieveNFTList();

// Response would contain the NFTs the user already owns:
nftsList = [
  NFTTypes.SKIP,
  NFTTypes.REDO,
  NFTTypes.SLOWDOWN
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

aquaIdentity.on(EVENTS.AQUA_IDENTITY_MODAL_CLOSE, () => {
  // When this gets triggered, that means that login, getWalletAddress or 
  // logout methods finished the execution
  // It means that everything is stored on aqua.xyz and here is the 
  // place where you may want to manage your local state, update or remove state
});

aquaIdentity.on(EVENTS.AQUA_IDENTITY_SUCCESSFULLY_LOG_IN, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     "isLoggedIn": true,
  //     "token":  "sfsaxewgwdsf...",
  //     "walletAddress": "0xewgwt34...",
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

aquaIdentity.on(EVENTS.AQUA_IDENTITY_VERIFY_USER_IDENTITY, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     valid: true
  //   }
  // }
  console.log("SUCCESSFULLY_VERIFIED_USER");
});

aquaIdentity.on(EVENTS.AQUA_IDENTITY_IS_NFT_AWARDED, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     valid: true
  //   }
  // }
  console.log("SUCCESSFULLY_VALIDATE_NFT_OWNERSHIP", event);
});

aquaIdentity.on(EVENTS.AQUA_IDENTITY_AWARD_NFT, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     valid: true
  //   }
  // }
  console.log("SUCCESSFULLY_AWARD_NFT", event);
});

aquaIdentity.on(EVENTS.AQUA_IDENTITY_RETRIEVE_NFT_LIST, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     nftList: ['skip']
  //   }
  // }
  console.log("SUCCESSFULLY_AQUA_IDENTITY_RETRIEVE_NFT_LIST", event);
});

aquaIdentity.on(EVENTS.AQUA_IDENTITY_OWNED_NFTS_DETAILS, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     nfts: {
  //        0: 1,
  //        1: 0,
  //        2: 0,
  //      }
  //   }
  // }
  console.log("SUCCESSFULLY_RETRIEVE_OWNED_NFTS_DETAILS", event);
});
aquaIdentity.on(EVENTS.AQUA_IDENTITY_AWARDED_NFTS_DETAILS, (event) => {
  // Example of response
  // event = { 
  //   data: {
  //     nfts: {
  //        0: 1,
  //        1: 0,
  //        2: 0,
  //      }
  //   }
  // }
  console.log("SUCCESSFULLY_RETRIEVE_AWARDED_NFTS_DETAILS", event);
});
```

### Environments

#### Development

For the `DEVELOPMENT` environment, the local server will run on `https://new-prod-aqua.netlify.app:8080/`.

#### Production
For the `PRODUCTION` environment, the local server will run on `https://games.aqua.xyz:8080/`.

