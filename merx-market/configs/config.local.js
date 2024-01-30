const ConfigLocal = {
  CHAIN_ID: 80001,
  RPC: "https://nd-299-036-938.p2pify.com/c71df2def425f67d749b283c5bba1dfa",

  ASSET_CA: "0xFC5515BfCee735260C492e084A5B2105340B62D7", // update [2022-07-13 09:08]
  MARKETPLACE_CA: "0x4bA24e8cA50E9839B320761F72FBdcBe03282Ad0",

  ASSET_ABI: require("../abis/local/Asset.json"),
  MARKETPLACE_ABI: require("../abis/local/Marketplace.json"),
  ERC20_ABI: require("../abis/local/Erc20.json"),
  MULTICALL_ABI: require("../abis/local/Multicall.json"),

  MARKETPLACE_BLOCK_START: 26669410,
  ASSET_BLOCK_START: 26669506,
  UNLIMIT_ALLOWANCE: "1000000000000000000000000000",
  
  GET_FILE_URI: "https://fileserver.merx.studio/",
  FILE_SERVER_URI: "https://cdn.merx.studio/upload",
  REST_URI: "",
  GQL_URI: "https://graphql.merx.studio/v1/graphql",
};

// 0x8195fB43c73E577d66f07C55f863C8607b0976A6 MBUSD

export default ConfigLocal;
