import {useContext, useEffect, useState} from 'react';
import ChainSelector from './components/chainSelector';
import NftCard from './components/nftcard';
import {fetchNFTs} from './utils/fetchNFTs';
import {useAccount} from "wagmi";
import AccountContext from "./context/AccountContext";
import {uauth} from "./login";

const Explore = () => {
  const [{data: accountData, loading}] = useAccount();
  const [owner, setOwner] = useState('');
  const {address, setUser, user} = useContext(AccountContext);
  const [contractAddress, setContractAddress] = useState('');
  const [NFTs, setNFTs] = useState('');
  const [nftCount, setNftCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [chain, setBlockchain] = useState('Ethereum');

  console.log(user)

  return (
    <div>
      <header className=" pt-24 pb-10  mb-12 w-full  default1">
        <div className="flex-grow flex justify-end mr-12 mb-12"></div>
        <div className="flex flex-col items-center mb-12">
          <div className="mb-16 text-white text-center">
            <h1 className="text-5xl  font-bold font-body mb-2">
              Check your NFTs
            </h1>
            <p>
              Check NFTs by owner and contract address{' '}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 ">
            <input
              className="border rounded-sm focus:outline-none py-2 px-3 w-full"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Insert your wallet address"
            ></input>
            <input
              className="focus:outline-none rounded-sm py-2 px-3 w-full"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Insert NFT address (optional)"
            ></input>
            <ChainSelector setBlockchain={setBlockchain} chain={chain} />
            <div className="mt-4">
              <p>
                {NFTs && !isLoading && <>NFT count: <span>{nftCount}</span></>}
              </p>
            </div>
          </div>
          <div className="w-2/6 flex justify-center">
            <button
              className="py-3 bg-white rounded-sm w-full hover:bg-slate-100"
              onClick={() => {
                fetchNFTs(owner, setNFTs, chain, contractAddress, setLoading, setNftCount);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {
          isLoading && <><center><div>Loading...<br/></div></center><br/></>
      }

      <section className="flex flex-wrap justify-center" style={{"marginBottom": "100px"}}>
        {!isLoading && NFTs ? (
          NFTs.map((NFT, id) => (
            <NftCard
              key={id}
              image={NFT.value.image}
              id={NFT.value.id}
              title={NFT.value.title}
              description={NFT.value.description}
              address={NFT.value.contractAddress}
              attributes={NFT.value.attributes}
              chain={chain}
            ></NftCard>
          ))
        ) : (
            !isLoading && <div>No NFTs found</div>
        )}
      </section>
    </div>
  );
};

export default Explore;
