import Whitelist from "../whitelist.json";
import _ from "lodash";

export const fetchABIWhitelist = async (address) => {
  const whitelist = Whitelist.whitelist.map(async (item, key) => {
    const _f = await fetch("/api/readjson", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Whitelist.whitelistABI[key]),
    });
    const _d = await _f.json();
    const options = {
      contractAddress: item,
      abi: _d.list,
    };

    return options;
  });

  const _whitelist = await Promise.all(whitelist);

  const _filter = _whitelist.filter((item) => {
    return item.contractAddress.toLowerCase() === address.toLowerCase();
  });

  return _filter[0];
};
