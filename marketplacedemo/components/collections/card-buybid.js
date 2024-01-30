import { Transition } from "@tailwindui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import PlaceItemModal from "./place-item";
import BidItemModal from "./bid-item";
import Config from "../../utils/config.json";
import { fetchABIWhitelist } from "../../utils/api/whitelist";
import Whitelist from "../../utils/whitelist.json";
import { useMoralis } from "react-moralis";
import { avatarContract } from "../../utils/web3/init";

const CardAssetOwner = (props) => {
  const { Moralis } = useMoralis();
  const [meta, setMeta] = useState(null);
  const [state, setState] = useState(false);
  const [token, setToken] = useState(null);
  const [bidState, setBidState] = useState(false);
  const [bidItem, setBidItem] = useState(null);

  const showCreateList = (e) => {
    setState(!state);
  };

  const showBidList = (e) => {
    setBidState(!bidState);
  };

  const listSellItem = (address, tokenId, image, type, amount) => {
    setState(true);
    setToken({
      address: address,
      tokenId: tokenId,
      image: image,
      type: type,
      amount: amount,
    });
  };

  const listBidItem = (address, tokenId, image, type, amount) => {
    setBidState(true);
    setBidItem({
      address: address,
      tokenId: tokenId,
      image: image,
      type: type,
      amount: amount,
    });
  };

  const fetchTokenURI = async (address, token) => {
    if (address.toLowerCase() === Config.AvatarAddress.toLowerCase()) {
      const _uri = await avatarContract.methods.tokenURI(token).call();
      return _uri;
    }
  };

  const fetchJson = async (props) => {
    try {
      const metaProps = props;

      // fetchTokenURI(metaProps)
      if (
        metaProps.meta.token_address !== null &&
        metaProps.meta.token_id !== null
      ) {
        const _uri = await fetchTokenURI(
          metaProps.meta.token_address,
          metaProps.meta.token_id
        );

        const _json = await fetch(_uri);
        metaProps.meta._metadata = await _json.json();
      }

      if (meta === null) {
        setMeta(metaProps.meta);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJson(props);
  }, []);

  if (!meta) {
    return null;
  }
  return (
    // <></>
    <div>
      <div className="relative card-item-collection">
        <div className="relative overflow-hidden item-collection-inset">
          <div className="overlay-btn transition-all duration-300">
            {Config.openProcess && meta._available > 0 && (
              <>
                <Link href="https://www.binance.com/en/nft/deposit">
                  <a target="_blank">
                    <button className="font-bold py-2 px-4 rounded-full text-white text-center btn-buybid-nft bg-nft">
                      List NFT on Binance
                    </button>
                  </a>
                </Link>
                <button
                  onClick={() =>
                    listSellItem(
                      meta.token_address,
                      meta.token_id,
                      meta._metadata.image,
                      meta.contract_type,
                      meta._available
                    )
                  }
                  disabled={meta._available > 0 ? false : true}
                  className={`font-bold py-2 px-4 rounded-full text-white ${
                    meta._available > 0 ? "btn-buybid bg-sell" : "bg-gray-300"
                  }`}
                >
                  Sell
                </button>
                <button
                  onClick={() =>
                    listBidItem(
                      meta.token_address,
                      meta.token_id,
                      meta._metadata.image,
                      meta.contract_type,
                      meta._available
                    )
                  }
                  disabled={meta._available > 0 ? false : true}
                  className={`font-bold py-2 px-4 rounded-full text-white ${
                    meta._available > 0 ? "btn-buybid bg-bid" : "bg-gray-300"
                  }`}
                >
                  Bid
                </button>
              </>
            )}
          </div>

          <div className="card-listing-des cursor-pointer">
            <div></div>
            {meta &&
              meta._metadata && [
                typeof meta._metadata.attributes !== "undefined" && [
                  meta._metadata.attributes.length > 0 && [
                    meta._metadata.attributes[0].trait_type === "rarity" && [
                      <div className="rarlity-view">
                        {[
                          ...Array(
                            parseInt(
                              meta._metadata.attributes[0].value
                                ? meta._metadata.attributes[0].value
                                : 0
                            )
                          ),
                        ].map((x, i) => {
                          return (
                            <img
                              key={i}
                              className="card-listing-rarity"
                              src={"/assets/image/rare_show.png"}
                            />
                          );
                        })}
                        {[
                          ...Array(
                            5 -
                              parseInt(
                                meta._metadata.attributes[0].value
                                  ? meta._metadata.attributes[0].value
                                  : 0
                              )
                          ),
                        ].map((x, i) => {
                          return (
                            <img
                              key={i}
                              className="card-listing-rarity"
                              src={"/assets/image/rare_hide.png"}
                            />
                          );
                        })}
                      </div>,
                    ],
                  ],
                ],
              ]}
          </div>
          <img
            className="object-center object-cover cursor-pointer img-ratio"
            src={
              meta && meta._metadata !== null
                ? meta._metadata.image
                : "/assets/image/no-image.jpg"
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/assets/image/no-image.jpg";
            }}
          />
        </div>
      </div>

      <div className="mt-2">
        <h3 className="card-buybid-title">
          {meta && meta._metadata !== null ? meta._metadata.name : "-"}
        </h3>
        <div>
          {meta &&
            meta._metadata !== null && [
              typeof meta._metadata.attributes !== "undefined" && [
                meta._metadata.attributes.length > 1 && [
                  meta._metadata.attributes[1].trait_type === "varient" && [
                    <div className="flex">
                      <code className="bg-tag px-2 rounded text-white mr-2">
                        {[meta._metadata.attributes[1].value]}
                      </code>

                      {/* {[
                        meta._metadata.attributes[1].value.map(
                          (item, index) => {
                            return (
                              <code
                                key={index}
                                className="bg-tag px-2 rounded text-white mr-2"
                              >
                                {item}
                              </code>
                            );
                          }
                        ),
                      ]} */}
                    </div>,
                  ],
                ],
              ],
            ]}
        </div>
      </div>

      <div className="pt-2 flex justify-between items-end">
        {/* <div>
          <h3 className="font-medium text-gray-400 text-left">Sell Type :</h3>
          <p className="font-medium text-primary text-left text-bold">
            {meta ? meta.contract_type : "-"}
          </p>
        </div> */}

        <div>
          <h3 className="font-medium text-gray-400 text-left">
            Total :{" "}
            <span className="text-primary text-bold">
              {meta ? meta.amount : "0"}
            </span>
          </h3>
          <p className="font-medium text-gray-400 text-left">
            Available :{" "}
            <span className="text-primary text-bold">
              {meta ? meta._available : "0"}
            </span>
          </p>
        </div>
      </div>

      <Transition
        className="absolute"
        style={{ zIndex: "100" }}
        show={state}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <PlaceItemModal show={state} onClose={showCreateList} data={token} />
      </Transition>

      <Transition
        className="absolute"
        style={{ zIndex: "100" }}
        show={bidState}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <BidItemModal show={bidState} onClose={showBidList} data={bidItem} />
      </Transition>
    </div>
  );
};

export default CardAssetOwner;
