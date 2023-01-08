import {useAccount} from 'wagmi';
import {useContext, useEffect, useState} from 'react';
import {fetchNFTs} from './utils/fetchNFTs';
import NftCard from './components/nftcard';
import Login from './login';
import ChainSelector from './components/chainSelector';
import {ClipboardIcon} from '@heroicons/react/outline';
import AccountContext from './context/AccountContext';

const MyProfile = () => {
    const [{data: accountData, loading}] = useAccount();
    const [chain, setBlockchain] = useState('Ethereum');
    const {address, user, avatarUrl, setAvatarUrl} = useContext(AccountContext);
    const [isLoading, setLoading] = useState(false);
    const [NFTs, setNFTs] = useState();

    async function fetchData() {
        if (accountData || address || user) {
            await fetchNFTs(accountData
                ? accountData.address
                : user
                    ? user?.wallet_address : "", setNFTs, chain, '', setLoading, null);
        }
    }

    return (
        <div>
            {loading ? (
                <div>
                    <h1>Loading...</h1>
                </div>
            ) : (accountData || address || user) ? (
                <div>
                    <header
                        className=" pt-40 pb-10  mb-12 w-full flex flex-col items-center justify-center default1 text-white ">
                        <img width={250} src={avatarUrl} alt='profile' className={"avatar"}></img>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center">
                                <h3 className="mt-4 text-l">
                                    <center>
                                        <p><b>ETH wallet: </b>
                                            {
                                                accountData
                                                    ? accountData.address
                                                    : user
                                                        ? user?.wallet_address
                                                        : ''
                                            }
                                        </p>
                                        {user
                                            ? <p><b>UNS domain:</b> {user?.sub} </p>
                                            : ""}
                                    </center>
                                </h3>
                                <ClipboardIcon
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            accountData ? accountData?.address
                                                : user
                                                    ? user?.wallet_address : ""
                                        )
                                    }
                                    className="h-4 w-4 -mt-2 text-slate-200 cursor-pointer"
                                ></ClipboardIcon>
                            </div>

                            <div className="mt-4">
                                <p>
                                    NFT count: <span>{NFTs ? NFTs.length : 0}</span>
                                </p>
                            </div>
                            <ChainSelector setBlockchain={setBlockchain} chain={chain}/>
                        </div>
                        <div className="w-2/6 flex justify-center">
                            <button style={{color: "black"}}
                                    className="py-3 bg-white rounded-sm w-full hover:bg-slate-100"
                                    onClick={() => {
                                        fetchData();
                                    }}
                            >
                                Search
                            </button>
                        </div>
                    </header>
                    {
                        isLoading && <>
                            <center>
                                <div>Loading...<br/></div>
                            </center>
                            <br/></>
                    }
                    <div className="flex flex-wrap justify-center" style={{"marginBottom": "100px"}}>
                        {NFTs ? (
                            NFTs.map((NFT) => {
                                return (
                                    <NftCard
                                        key={NFT.value.id + NFT.value.contractAddress}
                                        image={NFT.value.image}
                                        id={NFT.value.id}
                                        title={NFT.value.title}
                                        description={NFT.value.description}
                                        address={NFT.value.contractAddress}
                                        attributes={NFT.value.attributes}
                                        chain={chain}
                                    ></NftCard>
                                );
                            })
                        ) : (
                            !isLoading && <div>No NFTs found</div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <Login/>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
