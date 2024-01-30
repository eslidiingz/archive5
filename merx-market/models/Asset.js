import { BigNumber, ethers, providers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { objectForParams, objectForParamsNotKey } from "../utils/misc";
import { getWalletAddress } from "../utils/providers/connector";
import { getCollection, gqlCollectionReturning } from "./Collection";
import { gqlMutation, gqlQuery } from "./GraphQL";
import Config, { debug } from "/configs/config";
import {
  dAppChecked,
  smartContact,
  web3Provider,
} from "/utils/providers/connector";

export const smartContractAsset = (_withJsonRPC = false) => {
  return smartContact(Config.ASSET_CA, Config.ASSET_ABI, _withJsonRPC);
};

/** GraphQL */
export const gqlTagReturning = `{
  id
  name
}`;

export const getTags = async (_where = null) => {
  let query = `
    tags ${_where ? `(${_where})` : ""}
    ${gqlTagReturning}
  `;

  return gqlQuery(query);
};

export const createTags = async (_tags) => {
  let arrTags = [];
  let arrStringTags = [];

  /** Make dara array tags */
  _tags.map((tag) => {
    arrTags.push(tag.text);
    arrStringTags.push('"' + tag.text + '"');
  });

  /** Check tags is exsiting on database */
  let exsitTags = (await getTags(`where: {name: {_in: [${arrStringTags}]}}`))
    .data;

  /** Make data array existing tags */
  let arrExsitTags = [];
  if (exsitTags.length > 0) {
    exsitTags.map((item) => {
      arrExsitTags.push(item.name);
    });
  }

  /** Intersection tags between existing tag and parameter tags */
  let diff = arrTags.filter((d) => !arrExsitTags.includes(d));

  let objInsertTags = diff.map((name) => {
    return { name: name };
  });

  let mutation = `
    insert_tags(objects: ${objectForParamsNotKey(objInsertTags)}) {
      returning ${gqlTagReturning}
    }
  `;

  /** Insert intersection tags  */
  const tagsCreated = await gqlMutation(mutation);

  /** Retrived existing all tags params again */
  exsitTags = (await getTags(`where: {name: {_in: [${arrStringTags}]}}`)).data;

  return exsitTags;
};

export const gqlAssetReturning = `{
  id
  metadata
  nftAddress
  tokenId
  owner
  tags
  collectionId
  creator
  view
  orderId
  createdAt
  updatedAt
}`;

export const getMetadata = async (_where = null) => {
  let query = `
    metadata ${_where ? `(where: ${_where})` : ""}
    ${gqlAssetReturning}
  `;

  return gqlQuery(query);
};

/** createMetadata() store data to database */
export const createMetadata = async (
  _metadata,
  _contractAddress = Config.ASSET_CA
) => {
  if (debug) {
    console.log(
      `%c>>>>> createMetadata(_metadata, _contractAddress) >>>>>`,
      "color: yellow"
    );
    console.log(`%c>>>>> _metadata`, "color: pink", _metadata);
    console.log(`%c>>>>> _contractAddress`, "color: pink", _contractAddress);
  }

  let _tags = [];
  /** Has data tags is call function createTags  */
  if (_metadata.tags.length > 0) {
    _tags = await createTags(_metadata.tags);

    let _metaTags = _tags.map((t) => t.name);

    _metadata.tags = _metaTags;
  }

  try {
    let mutation = `
    insert_assets_one(object: {
      metadata: ${objectForParams(_metadata)},
      nftAddress: "${_contractAddress}",
      tags: ${objectForParamsNotKey(_tags)}
    }) ${gqlAssetReturning}`;

    return await gqlMutation(mutation);
  } catch (error) {
    console.log(
      `%c========== ERROR createMetadata()==========`,
      "color: red",
      error
    );
  }
};

export const updateMetadataById = async (_id, _set) => {
  if (debug) {
    console.log(`%c>>>>> updateMetadataById(_id, _set) >>>>>`, "color: yellow");
    console.log(`%c>>>>> _id`, "color: pink", _id);
    console.log(`%c>>>>> _set`, "color: pink", _set);
  }

  try {
    let mutation = `
    update_assets_by_pk(
      pk_columns: {id: ${_id}}, _set: {${_set}}
    ) ${gqlAssetReturning}`;

    return await gqlMutation(mutation);
  } catch (error) {
    console.log(
      `%c========== ERROR updateMetadataById() ==========`,
      "color: red",
      error
    );
  }
};

export const myCollection = async (_wallet) => {
  let query = `
  collection(where:{
    creator_wallet:{_eq:"${_wallet}"}
  }) ${gqlCollectionReturning}
  `;

  return await gqlQuery(query);
};

export const createCollection = async (_name) => {
  if (debug) {
    console.log(`%c>>>>> createCollection(_name) >>>>>`, "color: yellow");
    console.log(`%c>>>>> _name`, "color: pink", _name);
  }

  const wallet = await getWalletAddress();

  try {
    let mutation = `
    insert_collections_one(object: {
      name: "${_name}", 
      creatorWallet: "${wallet}"
    })
    ${gqlCollectionReturning}
    `;

    return await gqlMutation(mutation);
  } catch (error) {
    console.log(
      `%c========== ERROR createCollection() ==========`,
      "color: red",
      error
    );
  }
};

export const mintAsset = async (_metadata) => {
  if (debug)
    console.log(
      `%c>>>>> mintAsset(_metadata) >>>>>`,
      "color: yellow",
      _metadata
    );

  /** check DApp is already */
  if (await dAppChecked()) {
    /** Get instant of smartcontract */
    const smAsset = smartContractAsset();

    const result = await smAsset.safeMint(
      `${window.location.origin}/api/metadata?id=${_metadata.id}`
    );
    const assetMinted = await result.wait();

    let data = {};

    if (assetMinted) {
      let args = assetMinted?.events[0]?.args;
      // let args = { from: "0x00", to: "0x00", tokenId: "0x01" }; // Mock data

      let { from, to, tokenId } = args;
      tokenId = parseInt(formatUnits(args.tokenId, "wei"));

      let collectionId;

      /** Storing data collection of wallet to database */
      if (_metadata.metadata.collectionOption === "newCollection") {
        collectionId = (
          await createCollection(_metadata.metadata.collectionName)
        ).data.id;
      } else {
        collectionId = (
          await getCollection(
            `{name: {_eq: "${_metadata.metadata.collectionName}"}}`
          )
        ).data[0].id;
      }

      let _id = _metadata.id;
      let _set = `
        tokenId: ${tokenId}, 
        creator: "${to}", 
        owner: "${to}", 
        collectionId: ${collectionId}
      `;

      data = (await updateMetadataById(_id, _set)).data;
    }

    if (debug)
      console.log(
        `%c<<<<< mintAsset(_metadata) <<<<<`,
        "color: yellow",
        _metadata,
        data
      );

    return data;
  } /** End check DApp */
};

export const openMonsterBox = async (_boxType, _openType) => {
  let results = {
    status: "",
    stage: "",
    message: "",
  };

  if (debug)
    console.log(
      `%c>>>>> openMonsterBox (_boxType, _openType) [${
        (_boxType, _openType)
      }] >>>>>`,
      "color: yellow"
    );

  /** Check dApp connected */
  if (await dAppChecked()) {
    /** [mysteryBox] instant smart contract */
    const mysteryBox = smartContractMysteryBox();

    try {
      const openTypeHash = id(_openType);

      if (debug)
        console.log(
          `%c========== ${_boxType} openTypeHas = ${openTypeHash} ==========`,
          "color: pink"
        );

      const openBox = await mysteryBox.gachaMonster(_boxType, openTypeHash);
      const openBoxTx = await openBox.wait();

      if (debug) {
        console.log("%c===== openBoxTx =====", "color: pink", openBoxTx);
      }

      const eventLatestIndex = openBoxTx?.events.length - 1;

      let args = openBoxTx?.events[eventLatestIndex]?.args;

      let data = {
        boxType: _boxType,
        monsterId: formatUnits(args[2], "wei"),
        tokenId: formatUnits(args[3], "wei"),
      };
      // let data = {
      //   boxType: boxType,
      //   monsterId: formatUnits(monsterId, "wei"),
      //   price: formatUnits(price, "wei"),
      //   tokenId: formatUnits(tokenId, "wei"),
      // };

      results = {
        status: "success",
        error: false,
        stage: "opened",
        message: "Mystery box has been opened.",
        data: data,
      };
    } catch (error) {
      console.log(
        `%c========== Error gachaMonster(_boxType, _openType) [${
          (_boxType, _openType)
        }] ==========`,
        "color: red"
      );
      console.log(error);

      Swal.fire("Error", "Transaction Failed, Please try again.", "error");
    }
  } /** End check dapp connected */

  if (debug)
    console.log(
      `%c<<<<< openMonsterBox (_boxType, _openType) [${
        (_boxType, _openType)
      }] <<<<<`,
      "color: yellow",
      results
    );

  return results;
};
