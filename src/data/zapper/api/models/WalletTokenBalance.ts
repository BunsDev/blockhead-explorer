/* tslint:disable */
/* eslint-disable */
/**
 * Zapper API
 * The Zapper API provides some of the most robust Defi related data, everything from liquidity and prices on different AMMs to complex Defi protocol balances all in one convenient place. In addition, the API also supports bridging between different networks as well as formatted Zap transaction endpoints. <br/><br/><br/> *Enter in our public API key in the Authorize section below to test the endpoints directly in swagger: **96e0cc51-a62e-42ca-acee-910ea7d2a241**
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface WalletTokenBalance
 */
export interface WalletTokenBalance {
    /**
     * Token contract address
     * @type {string}
     * @memberof WalletTokenBalance
     */
    address: string;
    /**
     * Token symbol
     * @type {string}
     * @memberof WalletTokenBalance
     */
    symbol: string;
    /**
     * Token decimals
     * @type {number}
     * @memberof WalletTokenBalance
     */
    decimals: number;
    /**
     * Token price in USD
     * @type {number}
     * @memberof WalletTokenBalance
     */
    price: number;
    /**
     * Token address
     * @type {string}
     * @memberof WalletTokenBalance
     */
    tokenAddress: string;
    /**
     * Token label
     * @type {string}
     * @memberof WalletTokenBalance
     */
    label?: string;
    /**
     * Image name
     * @type {string}
     * @memberof WalletTokenBalance
     */
    img?: string;
    /**
     * Reserve amount for certain token types
     * @type {number}
     * @memberof WalletTokenBalance
     */
    reserve?: number;
    /**
     * Human readable balance
     * @type {number}
     * @memberof WalletTokenBalance
     */
    balance: number;
    /**
     * Total value in USD
     * @type {number}
     * @memberof WalletTokenBalance
     */
    balanceUSD: number;
    /**
     * Raw balance read from the contract
     * @type {string}
     * @memberof WalletTokenBalance
     */
    balanceRaw?: string;
    /**
     * The balance type of the response
     * @type {string}
     * @memberof WalletTokenBalance
     */
    type: string;
    /**
     * Can be exchanged on Zapper
     * @type {boolean}
     * @memberof WalletTokenBalance
     */
    canExchange?: boolean;
    /**
     * Is hidden on Zapper
     * @type {boolean}
     * @memberof WalletTokenBalance
     */
    hide?: boolean;
}

export function WalletTokenBalanceFromJSON(json: any): WalletTokenBalance {
    return WalletTokenBalanceFromJSONTyped(json, false);
}

export function WalletTokenBalanceFromJSONTyped(json: any, ignoreDiscriminator: boolean): WalletTokenBalance {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'address': json['address'],
        'symbol': json['symbol'],
        'decimals': json['decimals'],
        'price': json['price'],
        'tokenAddress': json['tokenAddress'],
        'label': !exists(json, 'label') ? undefined : json['label'],
        'img': !exists(json, 'img') ? undefined : json['img'],
        'reserve': !exists(json, 'reserve') ? undefined : json['reserve'],
        'balance': json['balance'],
        'balanceUSD': json['balanceUSD'],
        'balanceRaw': !exists(json, 'balanceRaw') ? undefined : json['balanceRaw'],
        'type': json['type'],
        'canExchange': !exists(json, 'canExchange') ? undefined : json['canExchange'],
        'hide': !exists(json, 'hide') ? undefined : json['hide'],
    };
}

export function WalletTokenBalanceToJSON(value?: WalletTokenBalance | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'address': value.address,
        'symbol': value.symbol,
        'decimals': value.decimals,
        'price': value.price,
        'tokenAddress': value.tokenAddress,
        'label': value.label,
        'img': value.img,
        'reserve': value.reserve,
        'balance': value.balance,
        'balanceUSD': value.balanceUSD,
        'balanceRaw': value.balanceRaw,
        'type': value.type,
        'canExchange': value.canExchange,
        'hide': value.hide,
    };
}


