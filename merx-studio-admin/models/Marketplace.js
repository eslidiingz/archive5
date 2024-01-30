import { BigNumber, ethers, providers } from "ethers";
import { formatUnits, id } from "ethers/lib/utils";
import { getLogsEvent } from "../utils/logs/getLogs";
import { objectForParams, objectForParamsNotKey } from "../utils/misc";
import { getWalletAddress } from "../utils/providers/connector";
import { gqlAssetReturning, updateAsset } from "./Asset";
import { getCollection, gqlCollectionReturning } from "./Collection";
import { gqlMutation, gqlQuery } from "./GraphQL";
import Config, { debug } from "/configs/config";
import {
  dAppChecked,
  smartContact,
  web3Provider,
} from "/utils/providers/connector";

export const smartContractMarketplace = (_withJsonRPC = false) => {
  return smartContact(
    Config.MARKETPLACE_CA,
    Config.MARKETPLACE_ABI,
    _withJsonRPC
  );
};

export const gqlMarketReturning = `{
  id
  acceptTime
  buyerWallet
  currentPrice
  expiration
  isActive
  nftContract
  note
  orderType
  price
  sellerWallet
  terminatePrice
  tokenAddress
  tokenId
  createdAt
  updatedAt
  assets ${gqlAssetReturning}
}`;

export const getMarketplaces = async () => {};

export const createOrderMarket = async (_data) => {
  /**
   * Example code
   * 
  let obj = {
      orderType: 1,
      nftContract: "0xCcE78C275B4B3676A9166fBC7bEda9F8C601667B",
      tokenId: "0",
      tokenAddress: "0x8195fB43c73E577d66f07C55f863C8607b0976A6",
      price: 1,
      sellerWallet: "0xE40845297c6693863Ab3E10560C97AACb32cbc6C",
      marketDetails: {},
    };

    let res = await createOrderMarket(obj);
    
   * 
   */

  try {
    let mutation = `
      insert_market_orders_one(object: ${objectForParams(_data)})
      ${gqlMarketReturning}
    `;

    let resCreated = await gqlMutation(mutation);

    if (resCreated) {
      let _set = `orderId: ${resCreated.data.id}`;
      let _where = `{tokenId: {_eq: ${resCreated.data.tokenId}}}`;

      await updateAsset(_set, _where);

      return resCreated.data;
    }
  } catch (error) {
    console.log(
      `%c========== ERROR createOrderMarket()==========`,
      "color: red",
      error
    );
  }
};

export const updateOrderMarket = async (_orderId, _data) => {
  try {
    let mutation = `
    `;
  } catch (error) {
    console.log(
      `%c========== ERROR createOrderMarket()==========`,
      "color: red",
      error
    );
  }
};

export const getTopicCreateOrderEvents = async () => {
  const sm = smartContractMarketplace();
  // topic: 0x27c2ad68b19ef3dc37f06a9e465bc9a114d97e40429a6195356da85b63113642
  const topic = id(
    "CreateOrderEvent(address,uint256,uint256,uint256,uint256,address,uint256,address,uint8,bool)"
  );

  const events = await getLogsEvent(
    sm,
    Config.MARKETPLACE_CA,
    Config.MARKETPLACE_BLOCK_START,
    topic
  );

  const args = events.map((i) => i.args);

  return await Promise.all(
    args.map(async (i) => {
      return {
        expiration: formatUnits(i.expiration, "wei"),
        isOrderActive: i.isOrderActive,
        marketType: i.marketType,
        nftContract: i.nftContract,
        orderId: formatUnits(i.orderId, "wei"),
        price: formatUnits(i.price),
        refundPrice: formatUnits(i.refundPrice),
        seller: i.seller,
        tokenAddress: i.tokenAddress,
        tokenId: formatUnits(i.tokenId, "wei"),
      };
    })
  );
};

export const getTopicBoughtEvents = async () => {
  const sm = smartContractMarketplace();
  const topic = id(
    "BoughtEvent(address,address,uint256,uint8,uint256,uint256,uint256,bool)"
  );

  // console.log("topic", topic);

  const events = await getLogsEvent(
    sm,
    Config.MARKETPLACE_CA,
    Config.MARKETPLACE_BLOCK_START,
    topic
  );

  // console.log("events", events);

  const args = events.map((i) => i.args);
  return await Promise.all(
    args.map(async (i) => {
      return {
        buyer: i.buyer,
        fee: formatUnits(i.fee),
        isOrderActive: i.isOrderActive,
        marketType: i.marketType,
        nftContract: i.nftContract,
        orderId: formatUnits(i.orderId, "wei"),
        price: formatUnits(i.price),
        tokenId: formatUnits(i.tokenId, "wei"),
      };
    })
  );
};
