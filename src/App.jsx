import {defaultChains, Provider} from 'wagmi';
import {InjectedConnector} from 'wagmi/connectors/injected';
import Nav from './components/nav';
import AccountProvider from './context/AccountProvider';

function App() {
  const connectors = () => {
    return [new InjectedConnector({ defaultChains })];
  };

  return (
    <Provider autoConnect connectors={connectors}>
      <AccountProvider>
        <Nav></Nav>
      </AccountProvider>
    </Provider>
  );
}

export default App;
