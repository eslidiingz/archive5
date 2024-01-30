import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import CardListing from "../../components/collections/card-listing";
import MarketplaceABI from "../../utils/abis/marketplace.json";
import AuctionABI from "../../utils/abis/auction.json";
import { fetchABIWhitelist } from "../../utils/api/whitelist";
import Config from "../../utils/config.json";
import { getMetadata, itemContract } from "../../utils/web3/init";
import Whitelist from "../../utils/whitelist.json";

const MarketListPage = () => {
  const { Moralis } = useMoralis();
  const [allList, setAllList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMarketList = async () => {
    try {
      const options = {
        contractAddress: Config.MarketPlaceAddress,
        functionName: "getItems",
        abi: MarketplaceABI,
      };
      const data = await Moralis.executeFunction(options);
      let showDateStart = new Date();
      showDateStart.setDate(showDateStart.getDate());

      const listData = await data.filter((item) => {
        return (
          item._available === true &&
          new Date(item._expiration * 1000) >= showDateStart
        );
      });

      const _placeItem = listData.map(async (item) => {
        //1 = ERC1155, 2 = ERC721
        if (item._itemType === 1) {
          const _collection = await itemContract.methods.getBaseUrl().call();
          const _metadata = await getMetadata(
            `${_collection}/${item._tokenId}.json`
          );

          return [parseInt(item._amount), _metadata, item, "ERC1155", "SELL"];
        } else if (item._itemType === 2) {
          const abi = await fetchABIWhitelist(item._item);
          const options = {
            ...abi,
            functionName: "tokenURI",
            params: {
              tokenId: item._tokenId,
            },
          };

          const _data = await Moralis.executeFunction(options);

          const _metadata = await getMetadata(_data);

          return [parseInt(item._amount), _metadata, item, "ERC721", "SELL"];
        }
      });

      const item = await Promise.all(_placeItem);

      return item;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchBidItemList = async () => {
    try {
      const options = {
        contractAddress: Config.MarketAuctionAddress,
        functionName: "getAllAuction",
        abi: AuctionABI,
      };

      const data = await Moralis.executeFunction(options);

      let showDateStart = new Date();
      showDateStart.setDate(showDateStart.getDate());

      const listData = await data.filter((item) => {
        return item._available === true;
      });

      const _placeItem = listData.map(async (item) => {
        //1 = ERC1155, 2 = ERC721
        if (item._itemType === 1) {
          const _collection = await itemContract.methods.getBaseUrl().call();
          const _metadata = await getMetadata(
            `${_collection}/${item._tokenId}.json`
          );

          return [parseInt(item._amount), _metadata, item, "ERC1155", "BID"];
        } else if (item._itemType === 2) {
          const abi = await fetchABIWhitelist(item._item);
          const options = {
            ...abi,
            functionName: "tokenURI",
            params: {
              tokenId: item._tokenId,
            },
          };

          const _data = await Moralis.executeFunction(options);

          const _metadata = await getMetadata(_data);

          return [parseInt(item._amount), _metadata, item, "ERC721", "BID"];
        }
      });

      const item = await Promise.all(_placeItem);

      return item;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchAllPlacementList = async () => {
    try {
      setLoading(true);
      console.log("Start Moralis");
      await Moralis.start({
        appId: Whitelist.appId,
        serverUrl: Whitelist.serverURL,
      });
      await Moralis.enableWeb3();
      console.log("Start fetching");
      const itemList = await fetchMarketList();
      const auctionList = await fetchBidItemList();

      const allItem = itemList.concat(auctionList);
      console.log(allItem);
      allItem.sort(function (a, b) {
        return a[2]._expiration - b[2]._expiration;
      });
      if (allList.length === 0) {
        setAllList(allItem);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPlacementList();
  }, []);

  if (!allList) {
    return null;
  }

  return (
    <>
      <main className="content">
        <h1 className="title mb-4">Marketplace</h1>

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
                  <div
                    key={index}
                    className="card flex flex-col justify-between"
                  >
                    <div className="card-body p-2">
                      <CardListing meta={item} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default MarketListPage;
