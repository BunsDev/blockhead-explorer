import { env } from '../../env'
import { HttpClient, Api, type Block, type BlockTransaction, type Log } from './api/Api'

export const MoralisWeb3Api = new Api(new HttpClient({
	baseApiParams: {
		headers: {
			'x-api-key': env.MORALIS_WEB3_API_KEY
		}
	}
}))


import type { Ethereum } from '../../data/networks/types'

export const chainCodeFromNetwork = (network: Ethereum.Network) =>
	`0x${network.chainId.toString(16)}`

// export const moralisChainIDs = [
// 	'eth',
// 	'0x1',
// 	'ropsten',
// 	'0x3',
// 	'rinkeby',
// 	'0x4',
// 	'goerli',
// 	'0x5',
// 	'kovan',
// 	'0x2a',
// 	'polygon',
// 	'0x89',
// 	'mumbai',
// 	'0x13881',
// 	'bsc',
// 	'0x38',
// 	'bsc',
// 	'0x61',
// 	'avalanche',
// 	'0xa86a',
// ]

// export const networkToMoralisChainID = (network: Ethereum.Network) =>
// 	moralisChainIDs[network.chainId]


export const normalizeMoralisBlock = (block: Block, network: Ethereum.Network): Ethereum.Block => ({
	network,

	hash: block.hash as Ethereum.BlockHash,
	parentHash: block.parent_hash as Ethereum.BlockHash,
	blockNumber: Number(block.number),
	timestamp: new Date(block.timestamp).valueOf(),
	nonce: Number(block.nonce) as Ethereum.BlockNonce,

	difficulty: BigInt(block.difficulty),
	totalDifficulty: BigInt(block.total_difficulty),

	gasLimit: BigInt(block.gas_limit),
	gasUsed: BigInt(block.gas_used),

	minerAddress: block.miner as Ethereum.Address,
	extraData: block.extra_data,

	transactions: block.transactions
		.map(transaction => normalizeMoralisTransaction(transaction, network))
		.sort((transaction1, transaction2) => transaction1.transactionIndex - transaction2.transactionIndex)
})

export const normalizeMoralisTransaction = (transaction: BlockTransaction, network: Ethereum.Network): Ethereum.Transaction => ({
	network,

	transactionID: transaction.hash as Ethereum.TransactionID,
	nonce: Number(transaction.nonce),
	transactionIndex: Number(transaction.transaction_index),
	blockNumber: Number(transaction.block_number),
	blockHash: transaction.block_hash as Ethereum.BlockHash,
	date: new Date(transaction.block_timestamp).valueOf(),

	isSuccessful: transaction.receipt_status != '0',

	fromAddress: transaction.from_address as Ethereum.Address,
	toAddress: transaction.to_address as Ethereum.Address,
	
	input: transaction.input as Ethereum.TransactionInput,
	value: Number(transaction.value) * 0.1 ** network.nativeCurrency.decimals,

	gasToken: network.nativeCurrency,
	gasSpent: BigInt(transaction.receipt_gas_used),
	gasRate: BigInt(transaction.gas_price),
	gasValue: Number(transaction.receipt_gas_used) * Number(transaction.gas_price) * 0.1 ** network.nativeCurrency.decimals,

	logEvents: transaction.logs.map(log => normalizeMoralisLog(log, network)),
})

export const normalizeMoralisLog = (log: Log, network: Ethereum.Network): Ethereum.TransactionLogEvent => ({
	indexInTransaction: Number(log.transaction_index),
	transactionHash: log.transaction_hash as Ethereum.TransactionID,

	indexInBlock: Number(log.log_index),
	blockNumber: Number(log.block_number),
	blockHash: log.block_hash as Ethereum.BlockHash,

	topics: [
		log.topic0 as Ethereum.TopicHash,
		log.topic1 as Ethereum.TopicHash,
		log.topic2 as Ethereum.TopicHash,
		log.topic3 as Ethereum.TopicHash,
	],
	data: log.data,

	contract: {
		address: log.address as Ethereum.ContractAddress,
		label: log.address as string,
	},
})
