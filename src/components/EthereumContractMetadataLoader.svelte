<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import { ContractSourceProvider, contractSourceProviderIcons } from '../data/contractSourceProvider'

	type SourcePath = $$Generic<string>


	// Context
	import { preferences } from '../state/preferences'


	// External state
	export let contractSourceProvider: ContractSourceProvider
	export let contractAddress: Ethereum.ContractAddress
	export let network: Ethereum.Network

	$: contractSourceProvider = $$props.contractSourceProvider ?? $preferences.contractSourceProvider


	// Internal state
	let result: {
		contractMetadata: Ethereum.ContractMetadata<SourcePath>,
		swarmUri?: string,
		sourcifyUrl?: string,
	}


	// Output
	export let contractMetadata: typeof result['contractMetadata']
	export let swarmUri: typeof result['swarmUri']
	export let sourcifyUrl: typeof result['sourcifyUrl']
	$: if(result) ({ contractMetadata, swarmUri, sourcifyUrl } = result)

	type SharedSlotProps = {
		contractAddress: typeof contractAddress,
		contractSourceProvider: typeof contractSourceProvider,
	} & typeof result

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import type { Etherscan } from '../api/etherscan'

	const normalizeEtherscanSource = <SourcePath extends string>(metadata: Awaited<ReturnType<typeof Etherscan.Contracts.getSource>>) => {
		const moreMetadata = (() => {
			try {
				return JSON.parse(metadata.SourceCode.match(/^\{([\s\S]+)\}$/)?.[1]!)
			} catch {}
		})() as {
			language: string;
			sources: {
				[key in SourcePath]: {
					content: string;
				}
			};
			settings: {
				remappings: string[];
				optimizer: {
					enabled: boolean;
					runs: number;
				};
				metadata: {
					useLiteralContent: boolean;
					bytecodeHash: string;
				};
				outputSelection: {
					[key: string]: {
						[key: string]: string[];
					};
				};
				evmVersion: string;
				viaIR: boolean;
				libraries: {};
			}
		} | undefined

		return {
			swarmUri: metadata.SwarmSource,
			contractMetadata: {
				...moreMetadata,
				compiler: {
					version: metadata.CompilerVersion,
				},
				language: moreMetadata?.language,
				output: {
					abi: (() => {
						try {
							return JSON.parse(metadata.ABI)
						} catch {
							return []
						}
					})(),
				},
				settings: {
					evmVersion: moreMetadata?.settings.evmVersion ?? metadata.EVMVersion,
					libraries: moreMetadata?.settings.libraries, // metadata.Library,
					metadata: moreMetadata?.settings.metadata,
					compilationTarget: {
						[metadata.ContractName]: metadata.ContractName,
					},
					optimizer: {
						enabled: moreMetadata?.settings.optimizer.enabled ?? metadata.OptimizationUsed == '1',
						runs: moreMetadata?.settings.optimizer.runs ?? Number(metadata.Runs),
					},
				},
				sources: Object.fromEntries(
					Object.entries(
						moreMetadata?.sources ?? {
							[metadata.ContractName]: { content: metadata.SourceCode }
						}
					)
						.map(([path, { content, license, urls, keccak256 }]) => [
							path,
							{
								content,
								license: license || metadata.LicenseType,
								urls: urls || [
									metadata.SwarmSource,
								],
								keccak256,
							}
						])
				)
			} as Ethereum.ContractMetadata<SourcePath>,
		}
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	fromQuery={
		createQuery({
			queryKey: ['ContractMetadata', {
				contractSourceProvider,
				chainId: network.chainId,
				contractAddress,
			}],

			queryFn: {
				[ContractSourceProvider.Etherscan]: async () => {
					const { Etherscan } = await import('../api/etherscan')

					const metadata = await Etherscan.Contracts.getSource({
						chainId: network.chainId,
						contractAddress,
					})

					return normalizeEtherscanSource(metadata)
				},

				[ContractSourceProvider.Sourcify]: async () => {
					const { getContractMetadata } = await import('../api/sourcify')

					try {
						return await getContractMetadata({
							contractAddress: contractAddress,
							chainId: network.chainId,
						})
					}catch(e){
						console.warn(e)

						return await getContractMetadata({
							contractAddress,
							chainId: network.chainId,
							partialMatch: true,
						})
					}
				},

				// [ContractSourceProvider.Tenderly]: async () => {
				// },
			}[contractSourceProvider]
		})
	}
	loadingIcon={contractSourceProviderIcons[contractSourceProvider]}
	loadingIconName={contractSourceProvider}
	loadingMessage={`Looking up contract metadata on ${contractSourceProvider}...`}
	errorMessage={`Couldn't find contract metadata on ${contractSourceProvider}.`}
	{...$$restProps}
	bind:result
	let:result
>
	<svelte:fragment slot="header"
		let:result
	>
		<slot name="header" {contractAddress} {contractSourceProvider} {...result} />
	</svelte:fragment>

	<slot {contractAddress} {contractSourceProvider} {...result} />
</Loader>
