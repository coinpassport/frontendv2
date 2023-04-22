import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, useAccount } from 'wagmi';
import { mainnet, polygon, polygonMumbai, optimism, avalanche } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


import './App.css';
import Home from './pages/Home.js';
import Wizard from './components/Wizard.js';

const { chains, provider } = configureChains(
  [mainnet, polygon, polygonMumbai, optimism, avalanche],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Coinpassport',
  projectId: 'f0b36cd878ad293c484e3db43a0912e5',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});


function App() {
  const { isConnected } = useAccount();
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        { isConnected ? (<Wizard />) : (<Home />) }
        <footer>
          <menu>
            <li>&copy; 2023</li>
            <li><a href="/">Home</a></li>
            <li><a href="/docs.html">Docs</a></li>
            <li><a href="/privacy-policy.html">Privacy</a></li>
          </menu>
        </footer>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
