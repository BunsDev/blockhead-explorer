import type {
	BalanceControllerGetAppBalancesParams,
} from './api/data-contracts'

import type { Ethereum } from '../../data/networks/types'


// Networks

export type ZapperSupportedNetwork = BalanceControllerGetAppBalancesParams['network']

export const networkNamesByChainID: Record<Ethereum.ChainID, ZapperSupportedNetwork> = {
	1: 'ethereum',
	137: 'polygon',
	10: 'optimism',
	100: 'gnosis',
	56: 'binance-smart-chain',
	250: 'fantom',
	43114: 'avalanche',
	42161: 'arbitrum',
	42220: 'celo',
	1666600000: 'harmony',
	1285: 'moonriver',
	25: 'cronos',
	1313161554: 'aurora',
	// : 'evmos',
}

export const chainIdByNetworkName = Object.fromEntries(Object.entries(networkNamesByChainID).map(([id, networkName]) => [networkName, id]))


// App names

const allZapperAppIds = [
	'1inch',
	'88mph-v3', // deprecated
	'88mph',
	'aave-amm',
	'aave-safety-module',
	'aave-v1',
	'aave-v2',
	'aave-v3',
	'aave', // deprecated
	'aavegotchi',
	'abracadabra',
	'across',
	'adamant',
	'adamant',
	'aelin',
	'agave',
	'airswap',
	'alchemix-v2',
	'alchemix',
	'alkemi',
	'alpha-tokenomics',
	'alpha-v1',
	'alpha-v2', // deprecated
	'amp',
	'ampleforth',
	'angle',
	'ape-tax',
	'apeswap',
	'apy',
	'arcx',
	'argo-finance',
	'armor',
	'arrakis',
	'arth',
	'atlendis-v1',
	'augur',
	'aura',
	'aurigami',
	'aurora-plus',
	'autofarm',
	'b-protocol',
	'badger',
	'balancer-v1',
	'balancer-v2',
	'banano',
	'bancor-v3',
	'bancor',
	'bao', // deprecated
	'barnbridge-smart-alpha',
	'barnbridge-smart-yield',
	'barnbridge',
	'based-money', // deprecated
	'basis-cash', // deprecated
	'basis-gold', // deprecated
	'basket-dao',
	'bastion-protocol',
	'beefy',
	'beethoven-x',
	'bella', // deprecated
	'belt',
	'benchmark',
	'benqi',
	'bent',
	'big-data', // deprecated
	'biswap',
	'bitcoin',
	'boring-dao',
	'botto',
	'bzx',
	'clearpool',
	'compound',
	'concentrator',
	'convex',
	'coslend',
	'cover', // deprecated
	'cozy-finance',
	'cream-iron-bank', // deprecated
	'cream',
	'cryptex',
	'curve',
	'defi-dollar', // deprecated
	'defi-kingdoms',
	'defi-swap',
	'defisaver',
	'derivadex',
	'deversifi', // deprecated
	'dfi-money', // deprecated
	'dforce',
	'dfx',
	'dfyn',
	'dhedge-v2',
	'dhedge',
	'diffusion',
	'dodo',
	'dopex',
	'dsd', // deprecated
	'dydx', // deprecated
	'ease',
	'eden',
	'eighty-eight-mph-v3',
	'element',
	'eleven-finance',
	'ellipsis',
	'enzyme-finance',
	'epns',
	'esd', // deprecated
	'essentia',
	'ethereum',
	'euler',
	'evmoswap',
	'fei',
	'fixed-forex',
	'float-capital',
	'float-protocol',
	'floor-dao',
	'frax-lend',
	'frax',
	'furucombo',
	'futureswap', // deprecated
	'gamma-strategies',
	'geist',
	'gmx',
	'good-ghosting',
	'governor-dao',
	'granary-finance',
	'grim',
	'gro',
	'harvest',
	'hector-network',
	'hegic',
	'homora-v2',
	'honeyswap',
	'hop',
	'hundred-finance',
	'idle',
	'illuvium',
	'impermax',
	'impossible-finance', // deprecated
	'index-coop',
	'indexed',
	'Indexed', // deprecated
	'instadapp',
	'inverse',
	'iron-bank',
	'iron',
	'jones-dao',
	'jpegd',
	'keep-network',
	'keeper-dao', // deprecated
	'kinesis-labs',
	'klima',
	'klondike-v2', // deprecated
	'klondike',
	'kogefarm',
	'kyber-dao',
	'kyber-dmm',
	'kyber-network', // deprecated
	'launchpool',
	'lido',
	'linkswap', // deprecated
	'liquiddriver',
	'liquity',
	'llama-airforce',
	'looks-rare',
	'loopring',
	'lydia',
	'lyra-avalon',
	'lyra',
	'maker',
	'manifold-finance',
	'maple',
	'market-xyz',
	'mean-finance',
	'meshswap',
	'metavault-trade',
	'mintr', // deprecated
	'mirror',
	'mith-cash', // deprecated
	'mm-finance',
	'mooniswap',
	'morpheus-swap',
	'morpho',
	'mstable',
	'mushroom',
	'naos',
	'nereus-finance',
	'nexus-mutual',
	'nft',
	'nft20',
	'nftx',
	'notional-finance',
	'nsure-network',
	'olympus',
	'ondo',
	'onx',
	'openleverage',
	'opium-network',
	'opyn',
	'origin-dollar',
	'origin-story',
	'origin',
	'orion-protocol',
	'other',
	'otterclam',
	'pancakeswap',
	'pangolin',
	'pendle',
	'penguin',
	'perpetual-protocol',
	'phuture',
	'pickle',
	'pie-dao',
	'pika-protocol-v3',
	'pika-protocol',
	'pirex',
	'platypus-finance',
	'plutus',
	'polygon',
	'polynomial',
	'polywhale',
	'pool-together-v3',
	'pool-together-v4',
	'pooltogether', // deprecated
	'popsicle',
	'powerpool',
	'premia',
	'qi-dao',
	'quickswap',
	'r-u-generous',
	'railgun',
	'rally',
	'rari-fuse',
	'rari',
	'realt',
	'reaper',
	'redacted-cartel',
	'reflexer',
	'ren',
	'revert-finance',
	'rhino-fi',
	'ribbon-v2',
	'ribbon',
	'robo-vault',
	'rocket-pool',
	'rook',
	'rubicon',
	'sablier',
	'saddle',
	'scarecrow',
	'scream-v2',
	'scream',
	'sfinance', // deprecated
	'shapeshift',
	'shared-stake',
	'shell',
	'single',
	'smoothy',
	'snowball',
	'snowbank',
	'snowdog',
	'snowswap',
	'solace',
	'solarbeam',
	'solidex',
	'solidly',
	'spartacus',
	'spiritswap',
	'spookyswap',
	'spool',
	'squid',
	'stake-dao',
	'stargate',
	'steak-hut',
	'stormswap',
	'strongblock',
	'strudel',
	'sturdy',
	'sudoswap',
	'superfluid',
	'sushiswap-bentobox',
	'sushiswap-kashi',
	'sushiswap',
	'swapr',
	'swerve',
	'symphony',
	'synapse',
	'synlev',
	'synthetix',
	'tarot',
	'tectonic',
	'teddy-cash',
	'tempus',
	'tenderize',
	'thales',
	'the-graph',
	'tokemak',
	'tokenlon',
	'tokens',
	'tokens',
	'tokensets',
	'tomb',
	'tornado-cash',
	'trader-joe-banker',
	'trader-joe',
	'traderjoe', // deprecated
	'trisolaris',
	'truefi',
	'ubeswap',
	'umami-finance',
	'unagii',
	'uniswap-v1',
	'uniswap-v2',
	'uniswap-v3',
	'uniswap', // deprecated
	'unit',
	'universe',
	'vader',
	'value', // deprecated
	'vector-finance',
	'velodrome',
	'venus',
	'vesper',
	'vesta-finance',
	'votium',
	'vvs-finance',
	'waultswap',
	'wepiggy',
	'wonderland',
	'x2y2',
	'xsigma',
	'xtoken', // deprecated
	'yam',
	'yaxis',
	'yearn',
	'yield-protocol',
	'yield-yak',
	'yieldyak', // deprecated
	'zero-x',
	'zerotwohm',
	'zlot',
] as const

export type ZapperAppId = typeof allZapperAppIds[number]


// App config

export type ZapperAppConfig = {
	id: ZapperAppId;
	tags?: string[];
	keywords?: string[];
	name: string;
	url: string;
	links?: Links;
	description: string;
	groups?: Group[];
	supportedNetworks?: {
		network: ZapperSupportedNetwork;
		actions?: (string)[];
	}[];
	primaryColor?: string;
	token?: Token | null;
	compatibleAddressFormats: Partial<Record<ZapperSupportedNetwork, 'evm' | string>>;
	presentationConfig?: PresentationConfig;
}
type Links = Partial<Record<
	| 'github'
	| 'twitter'
	| 'discord'
	| 'telegram'
	| 'medium'
	| 'learn',
	string
>>
type Group = {
	type?: string;
	id: string;
	label: string;
	isHiddenFromExplore?: boolean;
	groupLabel?: string;
	isHiddenFromExplorer?: boolean;
	groupLabels?: string;
}
type Token = {
	address: string;
	network: string;
}
type PresentationConfig = {
	tabs?: Tabs[];
}
type Tabs = {
	label: string;
	viewType: string;
	views?: View[];
	groupIds?: (string)[];
	options?: (Option)[];
}
type View = {
	viewType: string;
	label: string;
	groupIds?: string[];
	views?: Subview[];
}
type Subview = {
	viewType: string;
	label: string;
	groupIds?: string[];
}
type Option = {
	label: string;
	viewType: string;
	views?: Subview[];
}


// Supported apps

export type ZapperSupportedApp = {
	appId: ZapperAppId
	meta: {
		label: string
		img: string
		supportedActions: string[] // 'view'
		tags: string[]
	}[]
}


// App balances

export type ZapperAppBalanceResponse = {
	balances: Record<Ethereum.Address, ZapperAppBalance>;
}
export type ZapperAppBalance = {
	products?: Products[];
	meta?: AppMeta[];
}
type Products = {
	label: string;
	assets?: Asset[];
	meta?: ProductMeta[];
}
type Asset = {
	address: string;
	type: string;
	appId: string;
	groupId: string;
	network: string;
	tokens?: TokenBreakdown[];
	balanceUSD: number;
	dataProps: DataProps;
	displayProps: DisplayProps;
	key?: string;
	symbol?: string;
	decimals?: number;
	supply?: number;
	price?: number;
	pricePerShare?: number | number[];
	balance?: number;
	balanceRaw?: string;
}
type TokenBreakdown = {
	metaType?: string;
	id?: string;
	networkId?: number;
	address: string;
	name?: string;
	symbol: string;
	decimals: number;
	coingeckoId?: string;
	status?: string;
	hide?: boolean;
	canExchange?: boolean;
	verified?: boolean;
	updatedAt?: string;
	createdAt?: string;
	price: number;
	dailyVolume?: number;
	totalSupply?: string;
	networkEnumValue?: string;
	type: string;
	network: string;
	balance: number;
	balanceRaw: string;
	balanceUSD: number;
	appId?: string;
	groupId?: string;
	supply?: number;
	pricePerShare?: number[] | number;
	tokens?: TokenBreakdown1[];
	dataProps?: DataProps1;
	displayProps?: DisplayProps1;
	apt_address?: null;
	apt_networkId?: null;
	key?: string;
}
type TokenBreakdown1 = {
	id?: string;
	networkId?: number;
	address: string;
	name?: string;
	symbol: string;
	decimals: number;
	coingeckoId?: string;
	status?: string;
	hide?: boolean;
	canExchange?: boolean;
	verified?: boolean;
	updatedAt?: string;
	createdAt?: string;
	price: number;
	dailyVolume?: number;
	totalSupply?: string;
	networkEnumValue?: string;
	type: string;
	network: string;
	balance: number;
	balanceRaw: string;
	balanceUSD: number;
	key?: string;
	appId?: string;
	supply?: number;
	tokens?: TokenBreakdown2[];
	groupId?: string;
	dataProps?: DataProps2;
	displayProps?: DisplayProps2;
	pricePerShare?: number[];
	apt_address?: null;
	apt_networkId?: null;
}
type TokenBreakdown2 = {
	id: string;
	address: string;
	name: string;
	symbol: string;
	decimals: number;
	coingeckoId: string;
	hide: boolean;
	canExchange: boolean;
	updatedAt: string;
	createdAt: string;
	price: number;
	networkId: number;
	status: string;
	totalSupply: string;
	dailyVolume: number;
	verified: boolean;
	apt_address?: null;
	apt_networkId?: null;
	networkEnumValue: string;
	type: string;
	network: string;
	balance: number;
	balanceRaw: string;
	balanceUSD: number;
}
type DataProps2 = {
	reserve: number;
	liquidity: number;
}
type DisplayProps2 = {
	label: string;
	secondaryLabel: SecondaryLabelOrValue;
	images?: string[];
	statsItems?: StatsItems[];
}
type SecondaryLabelOrValue = {
	type: string;
	value: number;
}
type StatsItems = {
	label: string;
	value: SecondaryLabelOrValue;
}
type DataProps1 = {
	fee?: number;
	poolId?: string;
	volume?: number;
	weights?: number[];
	reserves?: number[];
	liquidity?: number;
	volumeChangePercentage?: number;
	isBlocked?: boolean;
	reserve?: number;
	exchangeable?: boolean;
	poolType?: string;
	swapAddress?: string;
	gaugeAddresses?: string[];
	apy?: number;
}
type DisplayProps1 = {
	label: string;
	images?: string[];
	statsItems?: StatsItems1[];
	secondaryLabel?: string | SecondaryLabelOrValue;
}
type StatsItems1 = {
	label: string;
	value: SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string;
}
type DataProps = {
	poolIndex?: number;
	liquidity?: number;
	isActive?: boolean;
	dailyROI?: number;
	weeklyROI?: number;
	yearlyROI?: number;
	fee?: number;
	volume?: number;
	volumeChangePercentage?: number;
	isBlocked?: boolean;
	reserves?: number[];
	weight?: number[];
	apy?: number;
	reserve?: number;
	faucetAddresses?: string[];
	exchangeable?: boolean;
	lensAddress?: string;
	implementation?: string;
	supplyApy?: number;
	borrowApy?: number;
	comptrollerAddress?: string;
	supply?: number;
	borrow?: number;
	incentivesControllerAddress?: string;
	protocolDataProviderAddress?: string;
	poolType?: string;
	swapAddress?: string;
	gaugeAddresses?: string[];
	feeTier?: number;
	rangeStart?: number;
	rangeEnd?: number;
	poolAddress?: string;
	assetStandard?: string;
	cRatio?: number;
	liquidationThreshold?: number;
	enabledAsCollateral?: boolean;
	deposited?: number;
	remaining?: number;
}
type DisplayProps = {
	label: string;
	secondaryLabel?: SecondaryLabelOrValue1 | string | string | SecondaryLabelOrValue;
	images?: string[];
	statsItems?: StatsItems2[];
	tertiaryLabel?: string;
	labelDetailed?: string;
	balanceDisplayMode?: string;
}
type SecondaryLabelOrValue1 = {
	type: string;
	value: number;
}
type StatsItems2 = {
	label: string;
	value: SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string;
}
type ProductMeta = {
	label: string;
	value: number;
	type: string;
}
type AppMeta = {
	label: string;
	value: number;
	type: string;
}


// Swagger API Client

import { V2 } from './api/V2'
import { HttpClient } from './api/http-client'
import type { FullRequestParams } from './api/http-client'
import { env } from '../../env'

const client = new HttpClient()

const request = client.request.bind(client)

client.request = async ({ query = {}, ...params }: FullRequestParams) =>
	await request({
		...params,
		query: {
			...query,
			api_key: env.ZAPPER_API_KEY
		},
		format: 'json',
	})

export const Zapper = new V2(client)


// Utils

import { ConcurrentPromiseQueue } from '../../utils/ConcurrentPromiseQueue'
import { promiseAllFulfilled } from '../../utils/promiseAllFulfilled'

const queue = new ConcurrentPromiseQueue(3)

import { readable } from 'svelte/store'
import type { Result } from 'svelte-apollo'


import { memoizedAsync } from '../../utils/memoized'
import { parallelLoaderStore } from '../../utils/parallelLoaderStore'


// Methods

export const getAllApps = memoizedAsync(async () =>
	(await Zapper.appsControllerGetApps({ format: 'json' })) as ZapperAppConfig[]
)

const getAppsForAddress = memoizedAsync(async (
	address: Ethereum.Address
) =>
	await Zapper.balanceControllerGetSupportedBalances({
		'addresses[]': [address]
	}) as {
		network: ZapperSupportedNetwork
		apps: ZapperSupportedApp[]
	}[] | undefined
)

const getAppsForAddressAndNetwork = memoizedAsync(async ({
	address,
	networkName
}: {
	address: Ethereum.Address,
	networkName: ZapperSupportedNetwork
}) => {
	const apps = (await getAppsForAddress(address))
		?.find(({ network }) => network === networkName)
		?.apps

	// if(!apps)
	// 	throw new Error(`Zapper didn't find any ${networkName} DeFi balances for the address ${address}.`)

	return apps
})

const getAppsForNetwork = memoizedAsync(async (
	networkName: ZapperSupportedNetwork
) =>
	(await getAllApps())
		.filter(({ supportedNetworks }) => supportedNetworks.some(({ network }) => network === networkName)),
)

const filterAndSortApps = (
	appIds: ZapperAppId[]
): ZapperAppId[] => [
		...appIds.filter(protocol => !['tokens', 'nft', 'other'].includes(protocol)),
		...appIds.filter(protocol => ['other'].includes(protocol))
	]

export const getDefiBalancesForApp = memoizedAsync(async ({
	appId,
	networkName,
	address,
}: {
	appId: ZapperAppId,
	networkName: ZapperSupportedNetwork,
	address: Ethereum.Address,
}): Promise<{ appId: ZapperAppId } & ZapperAppBalance> => {
	const response = await Zapper.balanceControllerGetAppBalances({
		appId,
		'addresses[]': [address],
		network: networkName
	}) as ZapperAppBalanceResponse

	return {
		appId,
		...(response.balances[address.toLowerCase()])
	}
})


export const getDefiBalancesForApps = memoizedAsync(async ({
	appIds,
	network,
	address,
	asStore = false
}: {
	appIds?: ZapperAppId[],
	network: Ethereum.Network,
	address: Ethereum.Address,
	asStore?: boolean
}) => {
	const networkName = networkNamesByChainID[network.chainId]

	if (!networkName)
		throw new Error(`Zapper doesn't yet support ${network.name}.`)

	const apps = await getAppsForAddressAndNetwork({
		address,
		networkName
	})

	const _appIds = filterAndSortApps(
		appIds
		?? apps?.map(({ appId }) => appId)
		?? (await getAppsForNetwork(networkName)).map(({ id }) => id)
	)

	const get = (appId: typeof _appIds[number]) => (
		queue.enqueue(async () =>
			getDefiBalancesForApp({
				appId,
				networkName,
				address
			})
		)
	)

	return asStore
		? parallelLoaderStore(_appIds, get)
		: await promiseAllFulfilled(_appIds.map(get))

	const promises = _appIds.map(appId =>
		queue.enqueue(async () =>
			getDefiBalancesForApp({
				appId,
				networkName,
				address
			})
		)
	)

	return asStore
		? readable<Result<{ appId: ZapperAppId } & ZapperAppBalance>[]>({ loading: true }, set => {
			let results = []

			for (const promise of promises)
				promise.then(result => set({
					loading: true,
					data:
						results = [...results, result]
				}))

			promiseAllFulfilled(promises).then(() => set({
				loading: false,
				data: results
			}))
		})
		: await promiseAllFulfilled(promises)
})

export const getTokenBalances = async({
	network,
	address
}: {
	network: Ethereum.Network,
	address: Ethereum.Address
}) => {
	const networkName = networkNamesByChainID[network.chainId]

	if (!networkName)
		throw new Error(`Zapper doesn't yet support ${network.name}.`)
	
	return await getDefiBalancesForApp({
		appId: 'tokens',
		networkName: networkNamesByChainID[network.chainId],
		address,
	})
}
