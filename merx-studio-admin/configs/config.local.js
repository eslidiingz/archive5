const ConfigLocal = {
  CHAIN_ID: 55556,
  RPC: "https://rei-testnet-rpc.moonrhythm.io",
  SETTER_WALLET: "6a4e6542a16058031948e10d833df28b41b0ed5ffc39c3fdac30d778f694131b",

  ASSET_CA: "0x6e50DbDB63b5c8458fEE4660701d38693c059a59", // update [2022-07-13 09:08]
  MARKETPLACE_CA: "0xBB46F05BF0CAc96263E81C0762df06b629F5b4bB",

  ASSET_ABI: require("../abis/local/Asset.json"),
  MARKETPLACE_ABI: require("../abis/local/Marketplace.json"),
  ERC20_ABI: require("../abis/local/Erc20.json"),
  MULTICALL_ABI: require("../abis/local/Multicall.json"),

  MARKETPLACE_BLOCK_START: 26669410,
  ASSET_BLOCK_START: 26724899,
  UNLIMIT_ALLOWANCE: "1000000000000000000000000000",

  GET_FILE_URI: "https://fileserver.merx.studio",
  FILE_SERVER_URI: "https://cdn.merx.studio/upload",
  REST_URI: "",
  GQL_URI: "http://146.190.193.116/v1/graphql",
};

// 0x8195fB43c73E577d66f07C55f863C8607b0976A6 MBUSD

export default ConfigLocal;
