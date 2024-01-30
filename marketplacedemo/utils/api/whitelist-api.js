import Config from "../config.json";

const WhitelistEndpoint = "whitelists";
const WhitelistUrl = `${Config.collectionApi}/${WhitelistEndpoint}`;

export const fetchWhitelistUser = async (address, active = "Y") => {
  const _data = await fetch(`${WhitelistUrl}?address=${address}`);

  return await _data.json();
};
