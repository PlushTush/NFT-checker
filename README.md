# NFT-checker

## About dApp

NFT explorer using the Alchemy NFT API and "Login with Unstoppable" feature.

Functionalities:
- Track and display your NFTs (ERC1155 and ERC721) on Polygon, Ethereum (and others soon) with info such the image, attributes, collection name
- Filter by NFT collection

Try the dApp: https://nftchecker.netlify.app

## Proof of "Login with Unstoppable" integration

Video link: https://www.youtube.com/watch?v=fu6jA-nPi4s

### Built with

- [React.js](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com)
- [Alchemy](https://www.alchemy.com) endpoints for fetching NFTs (Ethereum and Polygon)

## Install and run this dApp

1. Clone the repo
   ```sh
   git clone https://github.com/PlushTush/NFT-checker.git
   ```
2. Install all dependencies using npm or yarn
   ```sh
   npm install || yarn install
   ```
3. Create un account on [Alchemy.com](https://www.alchemy.com/) and get your API key
4. Enter your UnstoppableDomains Client ID & Redirect URI of your app, Alchemy Endpoints URLs to `settings.js`:
   ```js
   export const UNS_CLIENT_ID="CLIEND_ID"
   export const UNS_REDIRECT_URI="APP_URL"
   export const ALCHEMY_ETH_ENDPOINT="https://eth-mainnet.g.alchemy.com/nft/v2/YOUR_API"
   export const ALCHEMY_POLYGON_ENDPOINT="https://polygon-mainnet.g.alchemy.com/nft/v2/YOUR_API"
   ```
7. Run the application
```sh
npm run start
```


## Usage

a. "Profile" section
- See your ETH address and UNS domain
- Retrieve your Ethereum & Polygon NFTs

b. "Explore" section
- Insert a wallet address in the input field to retrieve Ethereum or Polygon NFTs associated with that address
- Insert the contract address  to retrieve NFTs from specific collection

## Roadmap

- [x] Ethereum & Polygon support
- [ ] Add others chains
- [ ] UI/UX Update
