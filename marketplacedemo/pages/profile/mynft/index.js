import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

import Whitelist from "../../../utils/whitelist.json";

import CardBuyBid from "../../../components/collections/card-buybid";
import {
  auctionContract,
  getWalletAccount,
  marketplaceContract,
} from "../../../utils/web3/init";

const MyAssetOwner = () => {
  const { Moralis } = useMoralis();
  const { account } = useMoralisWeb3Api();
  const [allList, setAllList] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkPlacementAmount = async (item, token, owner) => {
    const _item = item.toLowerCase();
    const _token = token.toString();
    const _owner = owner.toLowerCase();
    const marketList = await marketplaceContract.methods.getItems().call();
    const auctionList = await auctionContract.methods.getAllAuction().call();
    const allList = marketList.concat(auctionList);

    const find = allList.filter((item) => {
      return (
        item._available === true &&
        item._item.toLowerCase() === _item &&
        item._owner.toLowerCase() === _owner &&
        item._tokenId.toString() === _token
      );
    });

    const result = find.reduce(function (acc, obj) {
      return acc + parseInt(obj._amount);
    }, 0);
    return result;
  };

  const fetchOwnerAsset = async () => {
    setLoading(true);
    await Moralis.start({
      appId: Whitelist.appId,
      serverUrl: Whitelist.serverURL,
    });

    const _result = Whitelist.whitelist.map(async (item) => {
      const { result } = await account.getNFTs({
        chain: Whitelist.chainMoralis,
        token_addresses: item,
        address: await getWalletAccount(),
      });

      if (result.length > 0) {
        return { item: result };
      }
    });

    const result = await Promise.all(_result);

    const _data = await result.filter((item) => {
      return item !== undefined;
    });

    var newArr = [];
    for (var i = 0; i < _data.length; i++) {
      newArr = newArr.concat(_data[i].item);
    }

    const _r = newArr.map(async (item) => {
      // _item, _token, _owner
      const amountInList = await checkPlacementAmount(
        item.token_address,
        item.token_id,
        item.owner_of
      );

      const amountTotal = parseInt(item.amount) - amountInList;
      return { ...item, _available: amountTotal };
    });

    const _rd = await Promise.all(_r);
    if (allList.length === 0) {
      setAllList(_rd);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchOwnerAsset();
    setLoading(false);
  }, []);
  return (
    <>
      <main className="content">
        <h1 className="title">My Assets</h1>

        <div>
          {loading ? (
            <div className="loader-page">
              <svg
                className="animate-spin -ml-1 mr-3 h-16 w-16 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
              {allList.map((item, index) => {
                return (
                  <CardBuyBid
                    key={`${item[0]}${item[1]}${item[2]}${index}`}
                    meta={item}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default MyAssetOwner;
