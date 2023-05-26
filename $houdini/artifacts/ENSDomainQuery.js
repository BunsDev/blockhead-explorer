export default {
    "name": "ENSDomainQuery",
    "kind": "HoudiniQuery",
    "hash": "ec2c1d4b422b59d9d935d3fec42e5f85324a27d664053ffc5990cc1b70bfe472",

    "raw": `query ENSDomainQuery($name: String!) {
  domains(where: {name: $name}) {
    __typename
    id
    name
    labelName
    labelhash
    parent {
      id
      name
    }
    subdomains {
      id
      name
    }
    resolvedAddress {
      __typename
      id
    }
    owner {
      __typename
      id
    }
    resolver {
      __typename
      id
      domain {
        id
      }
      address
      addr {
        id
      }
      texts
      coinTypes
      events {
        id
        blockNumber
        transactionID
        __typename
      }
    }
    ttl
    isMigrated
    events {
      __typename
      id
      blockNumber
      transactionID
      ... on Transfer {
        owner {
          id
        }
        id
      }
      ... on NewOwner {
        owner {
          id
        }
        id
      }
      ... on NewResolver {
        resolver {
          id
          address
        }
        id
      }
      ... on NewTTL {
        ttl
        id
      }
      __typename
    }
  }
}
`,

    "rootType": "Query",

    "selection": {
        "fields": {
            "domains": {
                "type": "Domain",
                "keyRaw": "domains(where: {name: $name})",

                "selection": {
                    "fields": {
                        "__typename": {
                            "type": "String",
                            "keyRaw": "__typename",
                            "visible": true
                        },

                        "id": {
                            "type": "ID",
                            "keyRaw": "id",
                            "visible": true
                        },

                        "name": {
                            "type": "String",
                            "keyRaw": "name",
                            "nullable": true,
                            "visible": true
                        },

                        "labelName": {
                            "type": "String",
                            "keyRaw": "labelName",
                            "nullable": true,
                            "visible": true
                        },

                        "labelhash": {
                            "type": "Bytes",
                            "keyRaw": "labelhash",
                            "nullable": true,
                            "visible": true
                        },

                        "parent": {
                            "type": "Domain",
                            "keyRaw": "parent",
                            "nullable": true,

                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "ID",
                                        "keyRaw": "id",
                                        "visible": true
                                    },

                                    "name": {
                                        "type": "String",
                                        "keyRaw": "name",
                                        "nullable": true,
                                        "visible": true
                                    }
                                }
                            },

                            "visible": true
                        },

                        "subdomains": {
                            "type": "Domain",
                            "keyRaw": "subdomains",

                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "ID",
                                        "keyRaw": "id",
                                        "visible": true
                                    },

                                    "name": {
                                        "type": "String",
                                        "keyRaw": "name",
                                        "nullable": true,
                                        "visible": true
                                    }
                                }
                            },

                            "visible": true
                        },

                        "resolvedAddress": {
                            "type": "Account",
                            "keyRaw": "resolvedAddress",
                            "nullable": true,

                            "selection": {
                                "fields": {
                                    "__typename": {
                                        "type": "String",
                                        "keyRaw": "__typename",
                                        "visible": true
                                    },

                                    "id": {
                                        "type": "ID",
                                        "keyRaw": "id",
                                        "visible": true
                                    }
                                }
                            },

                            "visible": true
                        },

                        "owner": {
                            "type": "Account",
                            "keyRaw": "owner",

                            "selection": {
                                "fields": {
                                    "__typename": {
                                        "type": "String",
                                        "keyRaw": "__typename",
                                        "visible": true
                                    },

                                    "id": {
                                        "type": "ID",
                                        "keyRaw": "id",
                                        "visible": true
                                    }
                                }
                            },

                            "visible": true
                        },

                        "resolver": {
                            "type": "Resolver",
                            "keyRaw": "resolver",
                            "nullable": true,

                            "selection": {
                                "fields": {
                                    "__typename": {
                                        "type": "String",
                                        "keyRaw": "__typename",
                                        "visible": true
                                    },

                                    "id": {
                                        "type": "ID",
                                        "keyRaw": "id",
                                        "visible": true
                                    },

                                    "domain": {
                                        "type": "Domain",
                                        "keyRaw": "domain",
                                        "nullable": true,

                                        "selection": {
                                            "fields": {
                                                "id": {
                                                    "type": "ID",
                                                    "keyRaw": "id",
                                                    "visible": true
                                                }
                                            }
                                        },

                                        "visible": true
                                    },

                                    "address": {
                                        "type": "Bytes",
                                        "keyRaw": "address",
                                        "visible": true
                                    },

                                    "addr": {
                                        "type": "Account",
                                        "keyRaw": "addr",
                                        "nullable": true,

                                        "selection": {
                                            "fields": {
                                                "id": {
                                                    "type": "ID",
                                                    "keyRaw": "id",
                                                    "visible": true
                                                }
                                            }
                                        },

                                        "visible": true
                                    },

                                    "texts": {
                                        "type": "String",
                                        "keyRaw": "texts",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "coinTypes": {
                                        "type": "BigInt",
                                        "keyRaw": "coinTypes",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "events": {
                                        "type": "ResolverEvent",
                                        "keyRaw": "events",

                                        "selection": {
                                            "fields": {
                                                "id": {
                                                    "type": "ID",
                                                    "keyRaw": "id",
                                                    "visible": true
                                                },

                                                "blockNumber": {
                                                    "type": "Int",
                                                    "keyRaw": "blockNumber",
                                                    "visible": true
                                                },

                                                "transactionID": {
                                                    "type": "Bytes",
                                                    "keyRaw": "transactionID",
                                                    "visible": true
                                                },

                                                "__typename": {
                                                    "type": "String",
                                                    "keyRaw": "__typename",
                                                    "visible": true
                                                }
                                            }
                                        },

                                        "abstract": true,
                                        "visible": true
                                    }
                                }
                            },

                            "visible": true
                        },

                        "ttl": {
                            "type": "BigInt",
                            "keyRaw": "ttl",
                            "nullable": true,
                            "visible": true
                        },

                        "isMigrated": {
                            "type": "Boolean",
                            "keyRaw": "isMigrated",
                            "visible": true
                        },

                        "events": {
                            "type": "DomainEvent",
                            "keyRaw": "events",

                            "selection": {
                                "abstractFields": {
                                    "fields": {
                                        "Transfer": {
                                            "owner": {
                                                "type": "Account",
                                                "keyRaw": "owner",

                                                "selection": {
                                                    "fields": {
                                                        "id": {
                                                            "type": "ID",
                                                            "keyRaw": "id",
                                                            "visible": true
                                                        }
                                                    }
                                                },

                                                "visible": true
                                            },

                                            "id": {
                                                "type": "ID",
                                                "keyRaw": "id",
                                                "visible": true
                                            },

                                            "__typename": {
                                                "type": "String",
                                                "keyRaw": "__typename",
                                                "visible": true
                                            },

                                            "blockNumber": {
                                                "type": "Int",
                                                "keyRaw": "blockNumber",
                                                "visible": true
                                            },

                                            "transactionID": {
                                                "type": "Bytes",
                                                "keyRaw": "transactionID",
                                                "visible": true
                                            }
                                        },

                                        "NewOwner": {
                                            "owner": {
                                                "type": "Account",
                                                "keyRaw": "owner",

                                                "selection": {
                                                    "fields": {
                                                        "id": {
                                                            "type": "ID",
                                                            "keyRaw": "id",
                                                            "visible": true
                                                        }
                                                    }
                                                },

                                                "visible": true
                                            },

                                            "id": {
                                                "type": "ID",
                                                "keyRaw": "id",
                                                "visible": true
                                            },

                                            "__typename": {
                                                "type": "String",
                                                "keyRaw": "__typename",
                                                "visible": true
                                            },

                                            "blockNumber": {
                                                "type": "Int",
                                                "keyRaw": "blockNumber",
                                                "visible": true
                                            },

                                            "transactionID": {
                                                "type": "Bytes",
                                                "keyRaw": "transactionID",
                                                "visible": true
                                            }
                                        },

                                        "NewResolver": {
                                            "resolver": {
                                                "type": "Resolver",
                                                "keyRaw": "resolver",

                                                "selection": {
                                                    "fields": {
                                                        "id": {
                                                            "type": "ID",
                                                            "keyRaw": "id",
                                                            "visible": true
                                                        },

                                                        "address": {
                                                            "type": "Bytes",
                                                            "keyRaw": "address",
                                                            "visible": true
                                                        }
                                                    }
                                                },

                                                "visible": true
                                            },

                                            "id": {
                                                "type": "ID",
                                                "keyRaw": "id",
                                                "visible": true
                                            },

                                            "__typename": {
                                                "type": "String",
                                                "keyRaw": "__typename",
                                                "visible": true
                                            },

                                            "blockNumber": {
                                                "type": "Int",
                                                "keyRaw": "blockNumber",
                                                "visible": true
                                            },

                                            "transactionID": {
                                                "type": "Bytes",
                                                "keyRaw": "transactionID",
                                                "visible": true
                                            }
                                        },

                                        "NewTTL": {
                                            "ttl": {
                                                "type": "BigInt",
                                                "keyRaw": "ttl",
                                                "visible": true
                                            },

                                            "id": {
                                                "type": "ID",
                                                "keyRaw": "id",
                                                "visible": true
                                            },

                                            "__typename": {
                                                "type": "String",
                                                "keyRaw": "__typename",
                                                "visible": true
                                            },

                                            "blockNumber": {
                                                "type": "Int",
                                                "keyRaw": "blockNumber",
                                                "visible": true
                                            },

                                            "transactionID": {
                                                "type": "Bytes",
                                                "keyRaw": "transactionID",
                                                "visible": true
                                            }
                                        }
                                    },

                                    "typeMap": {}
                                },

                                "fields": {
                                    "__typename": {
                                        "type": "String",
                                        "keyRaw": "__typename",
                                        "visible": true
                                    },

                                    "id": {
                                        "type": "ID",
                                        "keyRaw": "id",
                                        "visible": true
                                    },

                                    "blockNumber": {
                                        "type": "Int",
                                        "keyRaw": "blockNumber",
                                        "visible": true
                                    },

                                    "transactionID": {
                                        "type": "Bytes",
                                        "keyRaw": "transactionID",
                                        "visible": true
                                    }
                                }
                            },

                            "abstract": true,
                            "visible": true
                        }
                    }
                },

                "visible": true
            }
        }
    },

    "pluginData": {
        "houdini-svelte": {
            "isManualLoad": true
        }
    },

    "input": {
        "fields": {
            "name": "String"
        },

        "types": {}
    },

    "policy": "CacheOrNetwork",
    "partial": false
};

"HoudiniHash=ec2c1d4b422b59d9d935d3fec42e5f85324a27d664053ffc5990cc1b70bfe472";