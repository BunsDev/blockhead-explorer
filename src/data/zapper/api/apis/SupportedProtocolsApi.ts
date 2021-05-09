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


import * as runtime from '../runtime';

/**
 * 
 */
export class SupportedProtocolsApi extends runtime.BaseAPI {

    /**
     * Gets the insurance types supported for retrieving stats on each supported network
     * Supported Insurance Stats
     */
    async poolControllerGetSupportedInsuranceStatsRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/insurance-stats/supported`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Gets the insurance types supported for retrieving stats on each supported network
     * Supported Insurance Stats
     */
    async poolControllerGetSupportedInsuranceStats(): Promise<void> {
        await this.poolControllerGetSupportedInsuranceStatsRaw();
    }

    /**
     * Gets the lending types supported for retrieving stats on each supported network
     * Supported Lending Stats
     */
    async poolControllerGetSupportedLendingStatsRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/lending-stats/supported`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Gets the lending types supported for retrieving stats on each supported network
     * Supported Lending Stats
     */
    async poolControllerGetSupportedLendingStats(): Promise<void> {
        await this.poolControllerGetSupportedLendingStatsRaw();
    }

    /**
     * Gets the pool types supported for retrieving stats on each supported network
     * Supported Pool Stats
     */
    async poolControllerGetSupportedPoolStatsTypesRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/pool-stats/supported`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Gets the pool types supported for retrieving stats on each supported network
     * Supported Pool Stats
     */
    async poolControllerGetSupportedPoolStatsTypes(): Promise<void> {
        await this.poolControllerGetSupportedPoolStatsTypesRaw();
    }

    /**
     * Gets the vault types supported for retrieving stats on each supported network
     * Supported Vault Stats
     */
    async poolControllerGetSupportedVaultStatsTypesRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/vault-stats/supported`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Gets the vault types supported for retrieving stats on each supported network
     * Supported Vault Stats
     */
    async poolControllerGetSupportedVaultStatsTypes(): Promise<void> {
        await this.poolControllerGetSupportedVaultStatsTypesRaw();
    }

}