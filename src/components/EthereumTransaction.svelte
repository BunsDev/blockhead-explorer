<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency } from '../data/currencies'


	// Inputs
	export let network: Ethereum.Network
	export let transaction: Ethereum.Transaction
	export let quoteCurrency: QuoteCurrency

	export let contextualAddress: Ethereum.Address

	// (View options)
	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'

	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showFees = false
	export let showDate = true
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'

	// Internal state
	// (Computed)
	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: isStandaloneLayout = layout === 'standalone'
	$: isInlineLayout = layout === 'inline'

	$: contextIsSender = contextualAddress && transaction.fromAddress && contextualAddress.toLowerCase() === transaction.fromAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && transaction.toAddress && contextualAddress.toLowerCase() === transaction.toAddress.toLowerCase()

	$: isContractCall = transaction.logEvents?.length


	// Components
	import AddressWithLabel from './AddressWithLabel.svelte'
	import Date from './Date.svelte'
	import EthereumErc20TransferCovalent from './EthereumErc20TransferCovalent.svelte'
	import EthereumLogEvent from './EthereumLogEvent.svelte'
	import TransactionId from './TransactionId.svelte'
	import EthereumTransactionSummary from './EthereumTransactionSummary.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'


	// Transitions/animations
	import { fade } from 'svelte/transition'
</script>


{#if transaction.network && transaction}
	<div class="transaction layout-{layout} column" class:card={isStandaloneLayout} class:unsuccessful={transaction.executionStatus === 'failed'} transition:fade>
		{#if isStandaloneLayout}
			<div class="bar">
				<h2><TransactionId network={transaction.network} transactionId={transaction.transactionId} /></h2>
				<span class="card-annotation">{transaction.network.name} Transaction</span>
			</div>

			<hr>

			<div class="bar">
				<h4>Signed Transaction Data</h4>
				{#if transaction.nonce}<p class="card-annotation">Nonce #{transaction.nonce}</p>{/if}
			</div>
		{/if}

		{#if !(isSummary && transaction.erc20Transfers?.length && transaction.value === 0n)}
			<div class="container inner-layout-{innerLayout}" class:card={isStandaloneLayout}>
				{#if !(isSummary && (contextIsSender || contextIsReceiver))}
					<span class="sender" class:mark={contextIsSender}><!-- transition:fade -->
						<AddressWithLabel
							network={transaction.network}
							address={transaction.fromAddress}
							label={transaction.labels?.fromAddress}
							format="middle-truncated"
							alwaysShowAddress={isExhaustive}
						/>
					</span>
				{/if}
				{#if transaction.value}
					<span>
						<span class="action">
							{isSummary && contextIsReceiver
								? transaction.executionStatus === 'successful' ? 'received' : 'failed to receive'
								: transaction.executionStatus === 'successful' ? 'sent' : 'failed to send'}
						</span>
						<TokenBalanceWithConversion
							{tokenBalanceFormat}
							showDecimalPlaces={isExhaustive ? 9 : 6}

							network={transaction.network}
							erc20Token={transaction.network.nativeCurrency}

							balance={Number(transaction.value) * 0.1 ** transaction.network.nativeCurrency.decimals}
							conversionCurrency={transaction.conversion?.quoteCurrency} 
							convertedValue={transaction.conversion?.value}
						/>
					</span>
				{/if}
				{#if isSummary && contextIsReceiver && transaction.fromAddress}
					<span class="sender"><!-- transition:fade -->
						<span>from</span>
						<AddressWithLabel
							network={transaction.network}
							address={transaction.fromAddress}
							label={transaction.labels?.fromAddress}
							format="middle-truncated"
							alwaysShowAddress={isExhaustive}
						/>
					</span>
				{:else if transaction.toAddress}
					<span class="receiver" class:mark={contextIsReceiver}><!-- transition:fade -->
						{#if isContractCall && !isExhaustive}
							<span class="action">
								{
									transaction.value
										? transaction.executionStatus === 'successful'
											? 'and called smart contract'
											: 'and call smart contract'
										: transaction.executionStatus === 'successful'
											? 'called smart contract'
											: 'failed to call smart contract'
								}
							</span>
						{:else}
							<span>to</span>
						{/if}
						<AddressWithLabel
							network={transaction.network}
							address={transaction.toAddress}
							label={transaction.labels?.toAddress}
							format="middle-truncated"
							alwaysShowAddress={isExhaustive}
						/>
					</span>
				{/if}
				{#if (showFees || isExhaustive) && transaction.gasUnitsSpent !== undefined}
					<span class="fee"><!-- transition:fade -->
						<span>for fee</span>
						<TokenBalanceWithConversion
							{tokenBalanceFormat}
							showDecimalPlaces={isExhaustive ? 9 : 6}

							network={transaction.network}
							erc20Token={transaction.gasToken}

							balance={Number(transaction.gasUnitsSpent) * 0.1 ** transaction.gasToken.decimals}
							conversionCurrency={transaction.conversion?.quoteCurrency}
							convertedValue={transaction.conversion?.gasUnitsSpent}
						/>
					</span>
				{/if}
				{#if isSummary && transaction.blockTimestamp}
					<span class="date"><Date date={transaction.blockTimestamp} layout="vertical" format="relative" /></span>
				{/if}
			</div>
		{/if}

		<!-- {#if 'erc20Transfers' in transaction && transaction.erc20Transfers?.length}
			{#if isStandaloneLayout}
				<hr>
				<h4>ERC-20 Token Transfers</h4>
			{/if}
			<div class="transfers">
				{#each transaction.erc20Transfers as erc20Transfer}
					<EthereumErc20TransferCovalent
						network={erc20Transfer.network}
						{erc20Transfer}
						quoteCurrency={erc20Transfer.conversion?.quoteCurrency}

						{contextualAddress}
						{detailLevel}
						{tokenBalanceFormat}
						showFees={false}

						layout="inline"
						innerLayout="row"
					/>
				{/each}
			</div>
		{/if} -->

		{#if !isSummary && transaction.logEvents?.length}
			{#if isStandaloneLayout}
				<hr>

				<h4>Smart Contract Log Events</h4>

				<div class="log-events column">
					{#each transaction.logEvents as logEvent}
						<div class="card">
							<EthereumLogEvent
								network={transaction.network}
								{logEvent}
								{detailLevel}
								{contextualAddress}
							/>
						</div>
					{/each}
				</div>
			{:else}
				<div class="log-events column" class:scrollable-list={transaction.logEvents.length > 16}><!-- transition:fade -->
					{#each transaction.logEvents as logEvent}
						<EthereumLogEvent
							network={transaction.network}
							{logEvent}
							{detailLevel}
							{contextualAddress}
						/>
					{/each}
				</div>
			{/if}
		{/if}

		{#if !isSummary && (transaction.transactionId || transaction.blockNumber)}
			{#if isStandaloneLayout}
				<hr>
			{/if}
			<div class="footer bar"><!-- transition:fade -->
				<EthereumTransactionSummary
					network={transaction.network}
					transactionID={transaction.transactionId}
					transactionIndex={transaction.transactionIndex}
					blockNumber={transaction.blockNumber}
					showTransactionID={isStandaloneLayout || isExhaustive}
				/>

				{#if showDate && transaction.blockTimestamp}
					<Date date={transaction.blockTimestamp} layout="horizontal" />
				{/if}
			</div>
		{/if}
	</div>
{/if}


<style>
	.transaction {
		/* text-align: center; */
	}
	h2 :global(.transaction-id) {
		font-size: 0.8em;
	}

	.transaction.layout-inline {
		--padding-inner: 0.5em;
	}

	.transaction :global(.address) {
		font-weight: 600;
	}
	.transaction.layout-inline :global(.address) {
		display: inline;
	}
	.fee {
		font-size: 0.85em;
	}
	.transaction :global(.token-rate) {
		font-weight: 500;
	}

	.log-events {
		font-size: 0.9em;
	}
	.transaction.layout-inline .log-events {
		font-size: 0.75em;
		padding: 0.66em 1em;
	}

	.container.inner-layout-row {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--padding-inner);
	}

	.container.inner-layout-columns {
		display: grid;
		grid-auto-flow: column;
		gap: var(--padding-inner);
		align-items: center;

		font-weight: 300;

		position: relative;
	}
	.container.inner-layout-columns > * {
		display: flex;
		flex-direction: column;
	}
	.container.inner-layout-columns .value {
		font-size: 1.5em;
	}

	.container .date {
		opacity: 0.8;
		font-size: 0.66em;
		align-self: center;
		text-align: end;
	}

	.unsuccessful {
		/* box-shadow: 0 1px 3px #ff2f00a0; */
		text-shadow: 0 1px 2px #ff2f00;
		opacity: 0.6;
		/* filter: saturate(0.5) contrast(0.5); */
		/* filter: saturate(0.5) sepia(0.5) hue-rotate(-55deg); */
		transition: opacity 0.3s;
	}
	.unsuccessful:hover, .unsuccessful:focus-within {
		opacity: 0.9;
	}

	.log-events.scrollable-list {
		--resizeVertical-defaultHeight: 20rem;
	}
	.transaction.layout-standalone .log-events.scrollable-list {
		--resizeVertical-defaultHeight: 54vh;
	}
</style>
