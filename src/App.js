import {Buffer} from 'buffer';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import { mainnet, polygon, polygonMumbai, optimism, avalanche } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


import './App.css';
import Home from './pages/Home.js';
import Wizard from './components/Wizard.js';

window.Buffer = window.Buffer || Buffer;

const { chains, publicClient } = configureChains(
  [/*mainnet, polygon,*/ {...polygonMumbai, rpcUrls: {
    public: { http: ['https://rpc.ankr.com/polygon_mumbai'] },
    default: { http: ['https://rpc.ankr.com/polygon_mumbai'] },
  }}, {
    blockExplorers: {
      default: { name: 'Roll Testnet Explorer',
        url: 'https://roll.calderaexplorer.xyz' },
    },
    contracts: {
    },
    id: 1748,
    name: 'Roll Testnet',
    nativeCurrency: {
      name: 'rETH', symbol: 'rETH', decimals: 18
    },
    network: 'rolltest',
    rpcUrls: {
      default: {
        http: [
          'https://roll.calderachain.xyz/http',
        ]
      },
      public: {
        http: [
          'https://roll.calderachain.xyz/http',
        ]
      }
    },
    testnet: true,
  }, /*optimism, avalanche*/],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Coinpassport',
  projectId: 'f0b36cd878ad293c484e3db43a0912e5',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});


function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <AppInside />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;

function AppInside() {
  const { isConnected } = useAccount();
  return (<>
    { isConnected ? (<Wizard />) : (<Home />) }
    <footer>
      <menu>
        <li>&copy; 2023</li>
        <li><a href="/">Home</a></li>
        <li><a href="/docs.html">Docs</a></li>
        <li><a href="/privacy-policy.html">Privacy</a></li>
      </menu>
    </footer>
  </>);
}
