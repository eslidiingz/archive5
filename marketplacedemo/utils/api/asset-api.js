import Config from "../config.json";

const assetEndpoint = "assets";
const assetUrl = `${Config.collectionApi}/${assetEndpoint}`;

export const getAssetById = async (data) => {
  const _result = await fetch(`${assetUrl}/${data}`);
  return await _result.json();
};

export const getAssetByAddressToken = async (address, token) => {
  const _result = await fetch(`${assetUrl}?address=${address}&token=${token}`);
  return await _result.json();
};

export const createAssetList = async (data) => {
  const _result = await fetch(`${assetUrl}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await _result;
};
