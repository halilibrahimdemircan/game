import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/7536068ee9a346e2ab1f4b6c35be3aee`,
  appName: 'nftinit.com',
})

export const connectors = {
  injected: injected,
  coinbaseWallet: walletlink,
}