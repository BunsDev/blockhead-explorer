export enum IpfsGatewayProvider {
	Helia = 'Helia',
	ProtocolLabsIpfsIo = 'IpfsIo',
	ProtocolLabsDweb = 'Dweb',
	Pinata = 'Pinata',
	NftStorage = 'NftStorage',
	Web3Storage = 'Web3Storage',
}

export type IpfsGatewayConfig = {
	gatewayProvider: IpfsGatewayProvider,
	name: string,
	icon?: string,
	colors?: string[],
	gatewayDomain?: string,
}

import { HeliaIcon, IpfsIcon } from '../assets/icons'

export const ipfsGateways: IpfsGatewayConfig[] = [
	{
		gatewayProvider: IpfsGatewayProvider.Helia,
		name: 'Helia',
		icon: HeliaIcon,
		colors: ['#073A53', '#F7DF1E'],
		gatewayDomain: 'local'
	},
	{
		gatewayProvider: IpfsGatewayProvider.ProtocolLabsIpfsIo,
		name: 'Protocol Labs',
		icon: IpfsIcon,
		colors: ['#469ea2', '#6acad1', '#083b54'],
		gatewayDomain: 'ipfs.io'
	},
	{
		gatewayProvider: IpfsGatewayProvider.ProtocolLabsDweb,
		name: 'Protocol Labs',
		icon: IpfsIcon,
		colors: ['#469ea2', '#6acad1', '#083b54'],
		gatewayDomain: 'dweb.link'
	},
	{
		gatewayProvider: IpfsGatewayProvider.NftStorage,
		name: 'NFT.Storage',
		gatewayDomain: 'nftstorage.link'
	},
	{
		gatewayProvider: IpfsGatewayProvider.Web3Storage,
		name: 'Web3.Storage',
		gatewayDomain: 'w3s.link'
	},
	{
		gatewayProvider: IpfsGatewayProvider.Pinata,
		name: 'Piñata',
		gatewayDomain: 'gateway.pinata.cloud'
	},
]

export const ipfsGatewaysByProvider: Record<IpfsGatewayProvider, IpfsGatewayConfig> = Object.fromEntries(
	ipfsGateways.map((ipfsGateway) => [ipfsGateway.gatewayProvider, ipfsGateway])
)
