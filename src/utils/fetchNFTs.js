import {ALCHEMY_ETH_ENDPOINT, ALCHEMY_POLYGON_ENDPOINT} from "../settings";

const getAddressNFTs = async (
  endpoint,
  owner,
  contractAddress,
  retries = 5
) => {
  if (owner) {
    let data;
    try {
      if (contractAddress) {
        data = await fetch(
          `${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`
        ).then((data) => data.json());
      } else {
        data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then((data) =>
          data.json()
        );
      }
    } catch (e) {

    }
    return data;
  }
};

const getEndpoint = (chain) => {
  switch (chain) {
    case 'Ethereum':
      return ALCHEMY_ETH_ENDPOINT;
    case 'Polygon':
      return ALCHEMY_POLYGON_ENDPOINT;
    default:
      return ALCHEMY_ETH_ENDPOINT;
  }
};

const fetchNFTs = async (owner, setNFTs, chain, contractAddress, setLoading, setNftCount) => {
  let endpoint = getEndpoint(chain);
  setLoading(true)
  const data = await getAddressNFTs(endpoint, owner, contractAddress);
  if (setNftCount) setNftCount(data?.totalCount)
  if (data?.ownedNfts.length) {
    const NFTs = await getNFTsMetadata(data.ownedNfts, endpoint);
    let fullfilledNFTs = NFTs.filter((NFT) => NFT.status === 'fulfilled');
    setNFTs(fullfilledNFTs);
  } else {
    setNFTs(null);
  }
  setLoading(false)
};

const getNFTsMetadata = async (NFTS, endpoint) => {
  const NFTsMetadata = await Promise.allSettled(
    NFTS.map(async (NFT) => {
      const metadata = await fetch(
        `${endpoint}/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`
      ).then((data) => data.json());
      let image;
      if (metadata.media[0].gateway.length) {
        image = metadata.media[0].gateway;
      } else {
        image = 'https://via.placeholder.com/500';
      }

      return {
        id: NFT.id.tokenId,
        contractAddress: NFT.contract.address,
        image,
        title: metadata.metadata.name,
        description: metadata.metadata.description,
        attributes: metadata.metadata.attributes,
      };
    })
  );

  return NFTsMetadata;
};

export { fetchNFTs, getAddressNFTs };
