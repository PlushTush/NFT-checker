import {useConnect} from 'wagmi';
import {Link, useNavigate} from 'react-router-dom';
import UAuth from '@uauth/js';
import AccountContext from './context/AccountContext';
import {useContext, useEffect} from "react";
import {UNS_CLIENT_ID, UNS_REDIRECT_URI} from "./settings";

export   const uauth = new UAuth({
  clientID: UNS_CLIENT_ID,
  redirectUri: UNS_REDIRECT_URI,
  scope: 'openid wallet',
});

const Login = () => {

  const [{ data, error }, connect] = useConnect();
  const { user, setUser } = useContext(AccountContext);
  const navigate = useNavigate();

  const unLogin = async (setAddress, address) => {
    try {

      const authorization = await uauth.loginWithPopup();
      if (authorization.idToken.wallet_address) {
        uauth
            .user()
            .then(setUser)
            .catch(() => {})
        setAddress(authorization.idToken.wallet_address);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AccountContext.Consumer>
      {(context) => (
        <div className="default1 h-screen flex flex-col items-center justify-center gap-2 ">
          <h1 className="text-white text-3xl -mt-24 font-bold mb-12">Login</h1>
          {data.connectors.map((x, id) => (
            <div className="w-2/6" key={id}>
              <button
                className="py-3 w-full bg-white rounded-sm hover:bg-slate-100"
                disabled={!x.ready}
                key={x.id}
                onClick={() => {
                  connect(x);
                  navigate('/myprofile', { replace: true });
                }}
              >
                {x.name}
                {!x.ready && ' (unsupported)'}
              </button>
            </div>
          ))}
          <div className="w-2/6">
            <button
              className="py-3 w-full bg-white rounded-sm hover:bg-slate-100 flex items-center justify-center"
              onClick={() => unLogin(context.setAddress, context.address)}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuxBfh5e_1zE4f3WZAmDoMD5RwzjLlktMd8A&usqp=CAU"
                alt="Unstoppable"
                width={30}
                height={30}
                className="mx-2"
              />
              Login with Unstoppable
            </button>
          </div>

          {error && <div>{error?.message ?? 'Failed to connect'}</div>}
          <div className="text-white text-center mt-8 ">
            <p>Or continue to <Link className="font-bold" to={'/explore'}>explore NFTs balances</Link> without Logging in</p>
          </div>
        </div>
      )}
    </AccountContext.Consumer>
  );
};
export default Login;
