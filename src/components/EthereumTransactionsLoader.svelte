<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { TickerSymbol } from '../data/currencies'
	import { TransactionProvider, transactionProviderIcons } from '../data/transactionProvider'
	import { preferences } from '../state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let address: Ethereum.Address | undefined
	export let publicClient: Ethereum.PublicClient

	export let quoteCurrency: TickerSymbol
	export let transactionProvider: string // TransactionProvider

	export let includeLogs = true

	// (Computed)
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider

	$: loadingMessage = `Retrieving ${network.name} transactions from ${transactionProvider}...`
	$: errorMessage = `Couldn't retrieve ${network.name} transactions from ${transactionProvider}.`


	// Functions
	import { createQuery, createInfiniteQuery } from '@tanstack/svelte-query'

	import { getTransactionsByAddress, normalizeTransaction as normalizeTransactionCovalent } from '../api/covalent'
	import { normalizeTransaction as normalizeTransactionDecommas } from '../api/decommas/normalize'
	import { Etherscan, normalizeTransaction as normalizeTransactionEtherscan } from '../api/etherscan'
	// import { getTransactions as getTransactionsEtherspot } from '../api/etherspot'
	import { chainCodeFromNetwork, MoralisWeb3Api } from '../api/moralis/web3Api'


	// Outputs
	export let transactions: Ethereum.Transaction[] | undefined

	type SharedSlotProps = {
		transactions: typeof transactions,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Components
	import Loader from './Loader.svelte'
	import { getTransactionsByAccount as getTransactionsByAccountChainbase, normalizeTransaction as normalizeTransactionChainbase } from '../api/chainbase';
</script>


<Loader
	layout="collapsible"
	loadingIcon={transactionProviderIcons[transactionProvider]}
	{loadingMessage}
	{errorMessage}
	{...{
		[TransactionProvider.Chainbase]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
				}],
				queryFn: async ({ pageParam: page }) => (
					await getTransactionsByAccountChainbase({
						chainId: network.chainId,
						address,
						page,
					})
				),
				getNextPageParam: (lastPage) => lastPage.next_page,
				select: result => (
					(result?.pages?.flatMap(page => page.data) ?? [])
						.map(transaction => normalizeTransactionChainbase(transaction, network))
				),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Covalent]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
				}],
				queryFn: async ({ pageParam: pageNumber }) => {
					const result = await getTransactionsByAddress({
						chainId: network.chainId,
						address,
						includeLogs,
						quoteCurrency,
						pageNumber: pageNumber ?? 0,
						pageSize: 100,
					})

					return result
				},
				getPreviousPageParam: (firstPage, allPages) => firstPage.pagination?.page_number > 0 ? firstPage.pagination.page_number - 1 : undefined,
				getNextPageParam: (lastPage, allPages) => lastPage.pagination?.has_more ? lastPage.pagination.page_number + 1 : undefined,
				select: result => (
					(result?.pages?.flatMap(page => page.items) ?? [])
						.map(transaction => normalizeTransactionCovalent(transaction, network, quoteCurrency))
				),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Decommas]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
				}],
				initialPageParam: 0,
				queryFn: async ({ pageParam: offset }) => {
					const { decommas, chainNameByChainId } = await import('../api/decommas')

					const chainName = chainNameByChainId[network.chainId]

					return await decommas.address.getTransactions({
						chainName,
						address,
						limit: 100,
						offset,
					})
				},
				getNextPageParam: (lastPage, allPages) => allPages && allPages.length * 100 < lastPage.count ? allPages.length * 100 : undefined,
				select: ({ pages }) => (
					pages.flatMap(page => page.result)
						.map(transaction => normalizeTransactionDecommas(transaction, network, quoteCurrency))
				),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Etherscan]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async () => (
					await Etherscan.Accounts.getTransactions({
						chainId: network.chainId,
						address,
					})
				),
				select: transactions => transactions.map(transaction => normalizeTransactionEtherscan(network, transaction)),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Moralis]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
				}],
				queryFn: async ({ pageParam }) => (
					await MoralisWeb3Api.address.getTransactions({
						chain: chainCodeFromNetwork(network),
						from_block: 0,
						// to_block: ,
						offset: pageParam?.offset ?? 0,
						limit: pageParam?.limit ?? 100,
						address
					})
				),
				// queryFn: async ({ pageParam: offset = 0 }) => {
				// 	const {result: transactions, total, page_size, page} = await MoralisWeb3Api.address.getTransactions({
				// 		chain: chainCodeFromNetwork(network),
				// 		from_block: 0,
				// 		// to_block: ,
				// 		offset: offset ?? 0,
				// 		limit: 100,
				// 		address
				// 	})

				// 	// const logs = (await MoralisWeb3Api.address.getLogsByAddress({
				// 	// 	chain: chainCodeFromNetwork(network),
				// 	// 	from_block: 0,
				// 	// 	address: transactions[0].hash
				// 	// }))

				// 	// console.log(transactions[0], logs)

				// 	return (
				// 		includeLogs
				// 			? await Promise.all(transactions.map(transaction => (
				// 				MoralisWeb3Api.transaction.getTransaction({
				// 					chain: chainCodeFromNetwork(network),
				// 					transactionHash: transaction.hash
				// 				})
				// 			)))
				// 			: transactions
				// 	).reverse()
				// },
				getPreviousPageParam: (firstPage, allPages) => {
					const offset = (firstPage.page - 1) * firstPage.page_size
					return offset > 0 ? { offset, limit: firstPage.page_size } : undefined
				},
				getNextPageParam: (lastPage, allPages) => {
					const offset = (lastPage.page + 1) * lastPage.page_size
					return offset < lastPage.total ? { offset, limit: lastPage.page_size } : undefined
				},
				select: result => result?.pages?.flatMap(page => page.result) ?? [],
				staleTime: 10 * 1000,
			}),
		}),
	}[transactionProvider]?.()}
	{...$$restProps}
	bind:result={transactions}
	let:result={transactions}
	let:pagination
>
	<svelte:fragment slot="header"
		let:result={transactions}
		let:status
		let:pagination
	>
		<slot name="header" {transactions} {status} {pagination} />
	</svelte:fragment>
	<slot {transactions} {pagination} />
</Loader>
