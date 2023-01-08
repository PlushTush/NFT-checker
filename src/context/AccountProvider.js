import React, {useEffect, useState} from 'react';
import AccountContext from './AccountContext';

const AccountProvider = (props) => {
  const [address, setAddress] = useState(null);
  const [uns, setUNS] = useState(null);
  const [ user, setUser ] = useState()
  const [avatarUrl, setAvatarUrl] = useState("null");

  return (
    <AccountContext.Provider value={{ address, setAddress, uns, setUNS, user, setUser, avatarUrl, setAvatarUrl}}>
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
