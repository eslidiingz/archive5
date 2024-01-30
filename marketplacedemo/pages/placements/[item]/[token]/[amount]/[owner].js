import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
  convertWeiToEther,
  numberFormat,
  untilTime,
} from "../../../../../utils/number";
import {
  auctionContract,
  avatarContract,
  getMetadata,
  getStrTokenSymbol,
  getTokenSymbol,
  getWalletAccount,
  itemContract,
  marketplaceContract,
  tokenContract,
} from "../../../../../utils/web3/init";
import Config from "../../../../../utils/config.json";
import Whitelist from "../../../../../utils/whitelist.json";
import BuyItemModal from "../../../../../components/modal/buy-item";
import BidItemModal from "../../../../../components/modal/bid-item";
import { Transition } from "@tailwindui/react";
import OfferItemModal from "../../../../../components/modal/offer-item";
import ButtonState from "../../../../../components/button/button-state";
import { toast } from "react-toastify";

import { ToastDisplay } from "../../../../../components/ToastDisplay";
import { unlimit } from "../../../../../utils/global";
import { getWalletAddress } from "../../../../../utils/wallet/connector";
import { fetchABIWhitelist } from "../../../../../utils/api/whitelist";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const PlacementPage = () => {
  const router = useRouter();
  const { item, token, amount, owner } = router.query;
  const [approve, setApprove] = useState(false);
  const [market, setMarket] = useState(null);
  const [isWinner, setIsWinner] = useState(false);
  const [detail, setDetail] = useState(null);

  const [buyItemModal, setBuyItemModal] = useState(false);
  const [bidItemModal, setBidItemModal] = useState(false);
  const [offerItemModal, setOfferItemModal] = useState(false);
  const [bidHistory, setBidHistory] = useState([]);
  const [offerHistory, setOfferHistory] = useState([]);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [buyType, setBuyType] = useState("buy");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState({});
  const [isActive, setActive] = useState(true);

  const [pageLoading, setPageLoading] = useState(true);
  const { Moralis } = useMoralis();

  const fetchOfferHistoryList = async () => {
    const { owner, amount, item, token } = router.query;

    const marketId = await marketplaceContract.methods
      .getMarketId(item, owner, token, amount, true)
      .call();

    const offerList = await marketplaceContract.methods
      .getOfferLists(owner)
      .call();

    const filterOffer = await offerList.filter((item) => {
      return (
        item._active === true &&
        item._isAccept === false &&
        item._marketId === marketId[1]
      );
    });

    const account = await getWalletAccount();

    setAccount(account);
    return filterOffer;
    // if (offerHistory.length === 0) {
    //   setOfferHistory(filterOffer);
    // }
  };

  const closeOfferList = async (offerId, markerId, index) => {
    const { owner } = router.query;
    const account = await getWalletAccount();

    const { status } = await marketplaceContract.methods
      .closeOffer(offerId, markerId)
      .send({ from: account })
      .on("sending", function (result) {
        setLoading({
          index: index,
          status: true,
        });

        toast(
          <ToastDisplay
            type={"process"}
            title={"Waiting For Confirmation"}
            description={"Confirm this transaction in your wallet"}
          />
        );
      })
      .on("receipt", function (receipt) {
        setLoading({
          index: index,
          status: false,
        });

        toast(
          <ToastDisplay
            type={"success"}
            title={"Transaction reciept"}
            description={"Close Offer Success !!!"}
          />
        );
      })
      .on("error", function (error) {
        setLoading({
          index: index,
          status: false,
        });

        toast(
          <ToastDisplay
            type={"error"}
            title={"Waiting For Confirmation"}
            description={"Confirm this transaction in your wallet"}
          />
        );
      });

    if (status) {
      fetchOfferList();
    }
  };

  const cancelBid = async (itemData, index) => {
    setLoading({
      index: index,
      status: true,
    });
    console.log(itemData);
    let marketId = parseInt(market.id);
    await auctionContract.methods
      .cancelBid(marketId, parseInt(itemData.bidId))
      .send({ from: account })
      .on("sending", function (result) {
        setLoading({
          index: index,
          status: true,
        });
        toast(
          <ToastDisplay
            type={"process"}
            title={"Waiting For Confirmation"}
            description={"Confirm this transaction in your wallet"}
          />
        );
      })
      .on("receipt", function (receipt) {
        setLoading({
          index: index,
          status: false,
        });
        toast(
          <ToastDisplay
            type={"success"}
            title={"Transaction reciept"}
            description={"Cancel Bid Success !!!"}
          />
        );
      })
      .on("error", function (error) {
        setLoading({
          index: index,
          status: false,
        });
        toast(
          <ToastDisplay
            type={"error"}
            title={"Transaction failed"}
            description={"Transaction failed please try again"}
          />
        );
      });
    location.reload();
  };
  const fetchPlacementDetail = async () => {
    const marketId = await marketplaceContract.methods
      .getMarketId(item, owner, token, amount, true)
      .call();

    const auctionId = await auctionContract.methods
      .getMarketId(item, owner, token, amount, true)
      .call();

    let object = {};

    if (market === null) {
      if (marketId[0] === true) {
        object = { state: "market", id: marketId[1] };
      } else if (auctionId[0] === true) {
        object = { state: "auction", id: auctionId[1] };
      }

      await setMarket(object);
    }

    if (market !== null) {
      let data = await fetchMarketDetail(market);

      if (typeof data !== "undefined") {
        await getBidHistory(parseInt(auctionId[1]), data);
      }
    }

    setTokenSymbol(await getTokenSymbol());
  };
  const getBidHistory = async (auctionId, data) => {
    const bidHistory = await auctionContract.methods
      .getAllBids(auctionId)
      .call();

    let newArr = [];
    for (let i = bidHistory.length - 1; i >= 0; i--) {
      let bidData = await auctionContract.methods
        .getSpecificBid(auctionId, i)
        .call();
      if (bidData._cancel == false) {
        newArr.push(bidData);
      }
    }

    if (newArr.length > 0) {
      let winner = newArr[0]["_buyer"];
      const account = await getWalletAccount();

      if (
        data[1]["_available"] === false ||
        data[1]["_owner"] !== account ||
        parseInt(data[1]["_status"]) > 0
      ) {
        setActive(false);
      }

      if (
        account === winner &&
        data[1]["_available"] === true &&
        data[1]["_acceptTime"] > 0 &&
        newArr[0]["_isAccept"] === false &&
        newArr[0]["_cancel"] === false &&
        newArr[0]["_active"] == true
      ) {
        setIsWinner(true);
      } else {
        setIsWinner(false);
      }

      setBidHistory(newArr);
    }
  };
  const fetchPlacementItem = async (address, type, tokenId, amount, item) => {
    let data;

    if (type === "1") {
      const _collection = await itemContract.methods.getBaseUrl().call();
      const metadata = await getMetadata(`${_collection}/${tokenId}.json`);
      data = {
        amount,
        metadata,
        item,
        type: "ERC1155",
      };
    } else if (type === "2") {
      try {
        await Moralis.start({
          appId: Whitelist.appId,
          serverUrl: Whitelist.serverURL,
        });
        await Moralis.enableWeb3();
        const abi = await fetchABIWhitelist(address);

        const options = {
          ...abi,
          functionName: "tokenURI",
          params: {
            tokenId: tokenId,
          },
        };

        const _data = await Moralis.executeFunction(options);
        const metadata = await getMetadata(`${_data}`);
        data = {
          amount,
          metadata,
          item,
          type: "ERC721",
        };
      } catch (error) {
        console.log(error);
      }
    }

    return data;
  };

  const checkAllowance = async () => {
    const account = await getWalletAccount();

    const { state } = detail;

    if (state === "market") {
      const allowance = await tokenContract.methods
        .allowance(account, Config.MarketPlaceAddress)
        .call();

      if (allowance <= 0) {
        setApprove(false);
      } else {
        setApprove(true);
      }
    } else if (state === "auction") {
      const allowance = await tokenContract.methods
        .allowance(account, Config.MarketAuctionAddress)
        .call();

      if (allowance <= 0) {
        setApprove(false);
      } else {
        setApprove(true);
      }
    }
  };

  const fetchItemDetail = async (item, token, amount) => {
    try {
      await Moralis.start({
        appId: Whitelist.appId,
        serverUrl: Whitelist.serverURL,
      });
      await Moralis.enableWeb3();

      const metaQuery = {
        address: item,
        token_id: token,
        chain: Whitelist.chainMoralis,
      };
      const _metadata = await Moralis.Web3API.token.getTokenIdMetadata(
        metaQuery
      );

      const metadata = await getMetadata(`${_metadata.token_uri}`);

      const data = {
        amount: _metadata.amount,
        metadata,
        item: _metadata,
        type: _metadata.contract_type,
      };
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMarketDetail = async (marketData) => {
    const { id, state } = marketData;
    let data;

    if (state === "market") {
      data = await marketplaceContract.methods
        ._getItemInfo(parseInt(id))
        .call();
    } else if (state === "auction") {
      data = await auctionContract.methods._getItemInfo(parseInt(id)).call();
    }

    if (typeof data === "undefined") {
      const placement = await fetchItemDetail(item, token, amount);
      if (detail === null) {
        await setDetail({ state: "", placement });
      }
    } else {
      const placement = await fetchPlacementItem(
        data[1]._item,
        data[1]._itemType,
        data[1]._tokenId,
        data[1]._amount,
        data[1]
      );

      if (detail === null) {
        await setDetail({ state, placement });
      }

      if (detail !== null) {
        await checkAllowance();
      }
    }
    return data;
  };

  const approveAuctionToken = async (index) => {
    const account = await getWalletAccount();
    await tokenContract.methods
      .approve(Config.MarketAuctionAddress, unlimit)
      .send({ from: account })
      .on("sending", function (result) {
        setLoading({
          index: index,
          status: true,
        });

        toast(
          <ToastDisplay
            type={"process"}
            title={"Waiting For Confirmation"}
            description={"Confirm this transaction in your wallet"}
          />
        );
      })
      .on("receipt", function (receipt) {
        setLoading({
          index: index,
          status: false,
        });
        setApprove(true);

        toast(
          <ToastDisplay
            type={"success"}
            title={"Transaction reciept"}
            description={"Approve Success !!!"}
          />
        );
      })
      .on("error", function (error) {
        setLoading({
          index: index,
          status: false,
        });

        toast(
          <ToastDisplay
            type={"error"}
            title={"Waiting For Confirmation"}
            description={"Confirm this transaction in your wallet"}
          />
        );
      });
  };

  const cancelPlaceAuction = async (index) => {
    let marketId = parseInt(market.id);

    const account = await getWalletAccount();

    await auctionContract.methods
      .cancelAuction(marketId)
      .send({ from: account })
      .on("sending", function (result) {
        setLoading({
          index: index,
          status: true,
        });
        toast(
          <ToastDisplay
            type={"process"}
            title={"Waiting For Confirmation"}
            description={"Confirm this transaction in your wallet"}
          />
        );
      })
      .on("receipt", function (receipt) {
        setLoading({
          index: index,
          status: false,
        });
        toast(
          <ToastDisplay
            type={"success"}
            title={"Transaction reciept"}
            description={"Cancel Auction Success !!!"}
          />
        );
      })
      .on("error", function (error) {
        setLoading({
          index: index,
          status: false,
        });
        toast(
          <ToastDisplay
            type={"error"}
            title={"Transaction failed"}
            description={"Transaction failed please try again"}
          />
        );
      });

    window.location = "/profile/mynft";
  };

  const closeBid = async (index) => {
    const account = await getWalletAccount();
    let marketId = parseInt(market.id);
    await auctionContract.methods
      .closeBid(marketId)
      .send({ from: account })
      .on("sending", function (result) {
        setLoading({
          index: index,
          status: true,
        });
        toast(
          <ToastDisplay
            type={"process"}
            title={"Waiting For Confirmation"}
            description={"Confirm this transaction in your wallet"}
          />
        );
      })
      .on("receipt", function (receipt) {
        setLoading({
          index: index,
          status: false,
        });
        toast(
          <ToastDisplay
            type={"success"}
            title={"Transaction reciept"}
            description={"Cancel Auction Success !!!"}
          />
        );
      })
      .on("error", function (error) {
        setLoading({
          index: index,
          status: false,
        });
        toast(
          <ToastDisplay
            type={"error"}
            title={"Transaction failed"}
            description={"Transaction failed please try again"}
          />
        );
      });
    window.location = "/profile/mynft";
  };

  const acceptAuction = async (index) => {
    const account = await getWalletAccount();
    let marketId = parseInt(market.id);
    await auctionContract.methods
      .winnerAcceptBid(marketId)
      .send({ from: account })
      .on("sending", function (result) {
        setLoading({
          index: index,
          status: true,
        });
        toast(
          <ToastDisplay
            type={"process"}
            title={"Waiting For Confirmation"}
            description={"Confirm this transaction in your wallet"}
          />
        );
      })
      .on("receipt", function (receipt) {
        setLoading({
          index: index,
          status: false,
        });
        toast(
          <ToastDisplay
            type={"success"}
            title={"Transaction reciept"}
            description={"Accept Auction Success !!!"}
          />
        );
      })
      .on("error", function (error) {
        setLoading({
          index: index,
          status: false,
        });
        toast(
          <ToastDisplay
            type={"error"}
            title={"Transaction failed"}
            description={"Transaction failed please try again"}
          />
        );
      });
    window.location = "/profile/mynft";
  };

  const showBuyItemModal = () => {
    setBuyItemModal(!buyItemModal);
  };
  const showModalBuyItem = (buyType = "buy") => {
    setBuyType(buyType);
    setBuyItemModal(true);
  };
  const showBidItemModal = () => {
    setBidItemModal(!bidItemModal);
  };
  const showModalBidItem = () => {
    setBidItemModal(true);
  };
  const showOfferItemModal = () => {
    setOfferItemModal(!offerItemModal);
    fetchOfferList();
  };
  const showModalOfferItem = () => {
    setOfferItemModal(true);
  };
  const getAccount = async () => {
    setAccount(await getWalletAccount());
  };

  const fetchOfferList = useCallback(() => {
    const fetchingData = async () => {
      const current = await fetchOfferHistoryList();
      setOfferHistory(current);
    };

    fetchingData();
  }, [router]);

  useEffect(async () => {
    setPageLoading(true);
    if (!router.isReady) return;
    await fetchPlacementDetail();
    await getAccount();
    await fetchOfferList();
    setPageLoading(false);
  }, [router.isReady, market, detail, fetchOfferList]);

  if (!detail) {
    return null;
  }

  return (
    <>
      {pageLoading ? (
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
        <div className="paper-card">
          <div className="bg-paper mx-auto p-2 md:p-8">
            <div className="grid grid-cols-1 items-start">
              <div className="cover-img-center">
                <img
                  src={
                    detail.placement &&
                    typeof detail.placement.metadata.image !== "undefined"
                      ? detail.placement.metadata.image
                      : "/assets/image/no-image.jpg"
                  }
                  className=""
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/assets/image/no-image.jpg";
                  }}
                />
              </div>

              <div className="mt-10 sm:px-0 mt-8 col-span-2">
                <h1 className="modal-title">
                  {detail.placement.metadata.name}
                </h1>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div className="text-muted mt-6 mb-4 block">
                    <p>
                      {detail.placement.metadata.description !== ""
                        ? detail.placement.metadata.description
                        : "-"}
                    </p>
                  </div>

                  {detail.state !== "" && [
                    <div className="mt-4">
                      <div className="bg-rule">
                        {detail.state !== "" && [
                          <div className="mt-4">
                            <div className="flex flex-wrap">
                              <div className="h-full w-full md:w-1/2 lg:w-1/2 lg:mb-0 md:mb-4 mb-4">
                                <dt className="text-title">Current price</dt>
                                <dd className="text-desc">
                                  <span className="tooltip">
                                    {convertWeiToEther(
                                      detail.placement.item._price
                                    )}{" "}
                                    <span className="tooltiptext">
                                      {convertWeiToEther(
                                        detail.placement.item._price
                                      )}
                                    </span>
                                  </span>{" "}
                                  {getStrTokenSymbol()}
                                </dd>
                              </div>
                              <div className="h-full w-full md:w-1/2 lg:w-1/2 md:mb-4 mb-4">
                                <dt className="text-title">Sale ends</dt>
                                <dd className="text-desc">
                                  <time dateTime="2021-01-22">
                                    {untilTime(
                                      detail.placement.item._expiration
                                    )}
                                  </time>
                                </dd>
                              </div>
                            </div>
                          </div>,
                        ]}
                      </div>
                    </div>,
                  ]}

                  {detail.state !== "" && [
                    <div className="mt-4 flex flex-wrap">
                      {Config.openProcess &&
                        detail.state === "market" && [
                          owner !== account && (
                            <>
                              <div>
                                <button
                                  onClick={() => showModalBuyItem()}
                                  className="btn-theme bg-sell-small"
                                >
                                  BUY
                                </button>
                              </div>
                              <div>
                                <button
                                  className="btn-theme btn-primary"
                                  onClick={() => showModalOfferItem()}
                                >
                                  MAKE OFFER
                                </button>
                              </div>
                            </>
                          ),
                        ]}
                      {Config.openProcess &&
                        detail.state === "auction" && [
                          detail.placement.item._owner !== account && [
                            detail.placement.item._status === "0" && (
                              <button
                                onClick={() => showModalBidItem()}
                                type="button"
                                className="btn-theme bg-bid-small"
                              >
                                BID
                              </button>
                            ),
                            parseInt(detail.placement.item._terminatePrice) >
                              0 &&
                              detail.placement.item._status === "0" && (
                                <button
                                  onClick={() => showModalBuyItem("buy-bid")}
                                  type="button"
                                  className="btn-theme bg-sell"
                                >
                                  BUY NOW{" "}
                                  <span className="text-sm text-nowarp">
                                    {` ${numberFormat(
                                      convertWeiToEther(
                                        detail.placement.item._terminatePrice
                                      )
                                    )} ${tokenSymbol}`}
                                  </span>
                                </button>
                              ),
                          ],

                          isActive && (
                            <>
                              {approve ? (
                                <>
                                  <ButtonState
                                    onFunction={() =>
                                      cancelPlaceAuction("CANCEL AUCTION")
                                    }
                                    text={"CANCEL AUCTION"}
                                    loading={
                                      loading.index === "CANCEL AUCTION" &&
                                      loading.status
                                    }
                                    classStyle={"btn-theme btn-secondary"}
                                  />
                                  {bidHistory.length > 1 ? (
                                    <ButtonState
                                      disabled={bidHistory.length > 1}
                                      onFunction={() => closeBid("CLOSE BID")}
                                      text={"CLOSE BID"}
                                      loading={
                                        loading.index === "CLOSE BID" &&
                                        loading.status
                                      }
                                      classStyle={"btn-theme btn-primary"}
                                    />
                                  ) : (
                                    <div></div>
                                  )}
                                </>
                              ) : (
                                <ButtonState
                                  onFunction={() =>
                                    approveAuctionToken("APPROVE AUCTION")
                                  }
                                  text={"APPROVE TOKEN"}
                                  loading={
                                    loading.index === "APPROVE AUCTION" &&
                                    loading.status
                                  }
                                  classStyle={"btn-theme-long btn-primary"}
                                />
                              )}
                            </>
                          ),
                        ]}
                    </div>,
                  ]}
                </div>
                {Config.openProcess && isWinner && (
                  <>
                    {approve ? (
                      <ButtonState
                        onFunction={() => acceptAuction("ACCEPT WINNER")}
                        text={"ACCEPT WINNER"}
                        loading={
                          loading.index === "ACCEPT WINNER" && loading.status
                        }
                        classStyle={"btn-theme-long btn-primary"}
                      />
                    ) : (
                      <ButtonState
                        onFunction={() => approveAuctionToken("APPROVE WINNER")}
                        text={"APPROVE WINNER"}
                        loading={
                          loading.index === "APPROVE WINNER" && loading.status
                        }
                        classStyle={"btn-theme-long btn-primary"}
                      />
                    )}
                  </>
                )}
                <section className="mt-8">
                  <div className="divider-top">
                    <div>
                      <span className="text-muted mt-6 mb-4 block">
                        Details
                      </span>
                      <div className="pb-6 prose prose-sm break-word">
                        <ul role="list">
                          <li>
                            Contract Address :{" "}
                            {detail.state === ""
                              ? detail.placement.item.token_address
                              : detail.placement.item._item}
                          </li>
                          <li>
                            Status :{" "}
                            {detail.state === ""
                              ? "NOT LISTING"
                              : detail.placement.item._available
                              ? "AVAILABLE"
                              : "NOT AVAILABLE"}
                          </li>
                          <li>
                            Owner Address :
                            {detail.state === ""
                              ? detail.placement.item.owner_of
                              : detail.placement.item._owner}
                          </li>
                          <li>
                            Token ID :{" "}
                            {detail.state === ""
                              ? detail.placement.item.token_id
                              : detail.placement.item._tokenId}
                          </li>
                          <li>
                            Token Standard :{" "}
                            {detail.state === ""
                              ? detail.placement.item.contract_type
                              : detail.placement.type}
                          </li>
                          <li>Qty : {detail.placement.amount}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {detail.state !== "" && [
                  Config.openProcess && [
                    detail.state === "auction" && [
                      bidHistory.length > 0 && (
                        <section className="mt-8">
                          <div className="divider-top">
                            <div>
                              <span className="text-muted mt-6 mb-4 block">
                                Bid History
                              </span>

                              <div>
                                <div className="py-2 align-middle ">
                                  <div className="overflow-hidden sm:rounded-lg">
                                    <table className="table-theme">
                                      <thead>
                                        <tr>
                                          <th>Price ({getStrTokenSymbol()})</th>
                                          <th>From</th>
                                          <th></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {bidHistory.map((item, index) => {
                                          return (
                                            <tr key={index}>
                                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-black">
                                                <span className="tooltip">
                                                  {numberFormat(
                                                    convertWeiToEther(
                                                      item._price
                                                    )
                                                  )}
                                                  <span className="tooltiptext">
                                                    {convertWeiToEther(
                                                      item._price
                                                    )}
                                                  </span>
                                                </span>
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm text-black text-center">
                                                {getWalletAddress(item._buyer)}
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-black">
                                                {detail.placement &&
                                                  account !=
                                                    detail.placement.item
                                                      ._owner &&
                                                  item._buyer == account &&
                                                  detail.placement.item
                                                    ._status == "0" &&
                                                  (approve ? (
                                                    <ButtonState
                                                      onFunction={() => {
                                                        cancelBid(item, index);
                                                      }}
                                                      text={"CANCEL BID"}
                                                      loading={
                                                        loading.index ===
                                                          index &&
                                                        loading.status
                                                      }
                                                      classStyle={
                                                        "btn-theme btn-sm-long mr-0"
                                                      }
                                                    />
                                                  ) : (
                                                    <ButtonState
                                                      onFunction={() =>
                                                        approveAuctionToken(
                                                          index
                                                        )
                                                      }
                                                      text={"APPROVE TOKEN"}
                                                      loading={
                                                        loading.index ===
                                                          index &&
                                                        loading.status
                                                      }
                                                      classStyle={
                                                        "btn-theme btn-sm-long mr-0"
                                                      }
                                                    />
                                                  ))}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      ),
                    ],
                  ],
                ]}

                {detail.state !== "" && [
                  Config.openProcess && [
                    offerHistory.length > 0 && (
                      <section className="mt-8">
                        <div className="divider-top">
                          <div>
                            <span className="text-muted mt-6 mb-4 block">
                              Offer History
                            </span>
                            <div>
                              <div className="py-2 align-middle ">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg table-wrapper">
                                  <table className="table-theme">
                                    <thead>
                                      <tr>
                                        <th>Price ({getStrTokenSymbol()})</th>
                                        <th>Expiration</th>
                                        <th>From</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {offerHistory.map((item, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>
                                              {numberFormat(
                                                convertWeiToEther(item._price)
                                              )}
                                            </td>
                                            <td>
                                              {untilTime(item._expiration)}
                                            </td>
                                            <td>
                                              {getWalletAddress(item._buyer)}
                                            </td>
                                            <td>
                                              {item._buyer === account && (
                                                <ButtonState
                                                  onFunction={() =>
                                                    closeOfferList(
                                                      item._offerId,
                                                      item._marketId,
                                                      index
                                                    )
                                                  }
                                                  loading={
                                                    loading.index === index &&
                                                    loading.status
                                                  }
                                                  text={"CANCEL OFFER"}
                                                  classStyle={
                                                    "btn-theme btn-sm-long mr-0"
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    ),
                  ],
                ]}
              </div>
            </div>
          </div>
        </div>
      )}

      <Transition
        show={buyItemModal}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <BuyItemModal
          show={buyItemModal}
          onClose={showBuyItemModal}
          data={detail}
          buyType={buyType}
        />
      </Transition>
      <Transition
        show={bidItemModal}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <BidItemModal
          show={bidItemModal}
          onClose={showBidItemModal}
          data={bidHistory}
          item={detail}
        />
      </Transition>
      <Transition
        show={offerItemModal}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <OfferItemModal
          show={offerItemModal}
          onClose={showOfferItemModal}
          data={detail}
        />
      </Transition>
    </>
  );
};

export default PlacementPage;
