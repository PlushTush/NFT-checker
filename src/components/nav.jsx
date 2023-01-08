import {Link, Route, Routes} from 'react-router-dom';
import Explore from '../explore';
import {uauth} from '../login';
import MyProfile from '../myprofile';
import {useAccount} from 'wagmi';
import {ClipboardIcon} from '@heroicons/react/outline';
import AccountContext from '../context/AccountContext';
import {useContext, useEffect, useState} from "react";

const Nav = () => {
    const [{data: accountData}, disconnect] = useAccount();
    const {user, setUser, address, avatarUrl, setAvatarUrl} = useContext(AccountContext);

    useEffect(() => {
        uauth
            .user()
            .then(setUser)
            .catch(() => {})
    }, [setUser]) // eslint-disable-line

    useEffect(() => {
        function getAvatar() {
            if (accountData || address || user) {
                const wallet =
                    accountData
                        ? accountData.address
                        : user
                            ? user?.wallet_address : "null"

                setAvatarUrl(`https://robohash.org/${wallet.toLowerCase()}`)
            }
        }
        getAvatar()
    })


    return <AccountContext.Consumer>
        {(context) => (
            <>
                <div className="flex-grow flex justify-end mt-4 mr-12 -mb-20">
                    {(accountData || context.address?.length || user ) ? (
                        <div className="flex items-center">
                            <div className="flex mr-4 text-white gap-4">
                                <Link className="mr-2 " to="/explore">
                                    Explore
                                </Link>

                                <div className="flex items-center">
                                    <div>{accountData
                                        ? accountData?.address?.slice(0, 8) + "..." + accountData?.address?.slice(-8)
                                        : user
                                            ? user?.wallet_address?.slice(0, 8) + "..." + user?.wallet_address?.slice(-8)
                                            : ''
                                    }</div>


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

                                    {user
                                        ? <>
                                            <div style={{marginLeft: "20px"}}>
                                                <span><b>UNS domain: </b>{user?.sub}</span>
                                            </div>
                                            <ClipboardIcon
                                                onClick={() =>
                                                    navigator.clipboard.writeText(user?.sub)
                                                }
                                                className="h-4 w-4 -mt-2 text-slate-200 cursor-pointer"
                                            ></ClipboardIcon>
                                        </>
                                        : ""
                                    }
                                </div>
                            </div>
                            <button
                                className=" py-2 px-4 rounded-lg bg-white mr-4"
                                onClick={() => {
                                    disconnect();
                                    uauth.logout()
                                        .then(() => setUser(undefined))
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                    context.setAddress(null);
                                }}
                            >
                                Disconnect
                            </button>
                            <Link to="/myprofile">
                                {' '}
                                <img width={63} src={avatarUrl} alt='profile' className={"avatar"}></img>
                            </Link>
                        </div>
                    ) : (
                        <Link className=" py-2 px-4 rounded-lg bg-white" to={'/'}>
                            Connect
                        </Link>
                    )}
                </div>
                <Routes>
                    <Route path="/" element={<MyProfile/>}/>
                    <Route path="/explore" element={<Explore/>}/>
                    <Route path="/myprofile" element={<MyProfile/>}/>
                </Routes>
                <div></div>
            </>
        )}
    </AccountContext.Consumer>
};

export default Nav;
