// Types/constants
import { web3AppsBySlug, type Web3AppConfig } from '../../data/web3Apps'


// External stores

import {
	web3AppSlug,
	accountId,
	audiusQuery,
	audiusPlaylistId,
	audiusTrackId,
	audiusUserId,
	ipfsContentId
} from './_appsParams'


// Derived stores

import { derived, type Readable } from 'svelte/store'

export const web3AppConfig: Readable<Web3AppConfig> = derived(web3AppSlug, ($web3AppSlug, set) =>
	set(web3AppsBySlug[$web3AppSlug] || undefined)
)

export const currentView: Readable<'Dashboard' | 'Explorer' | 'Account'> = derived([
	web3AppSlug,
	accountId,
	audiusQuery,
	audiusPlaylistId,
	audiusTrackId,
	audiusUserId,
	ipfsContentId,
], ([
	$web3AppSlug,
	$accountId,
	$audiusQuery,
	$audiusPlaylistId,
	$audiusTrackId,
	$audiusUserId,
	$ipfsContentId,
], set) => set(
	($web3AppSlug === 'ens' && $accountId) || 
	($audiusQuery || $audiusPlaylistId || $audiusTrackId || $audiusUserId || $ipfsContentId) ?
		'Explorer'
	: $accountId ?
		'Account'
	:
		'Dashboard'
))
