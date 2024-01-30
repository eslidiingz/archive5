import Link from "next/link";
import { useEffect, useState } from "react";
import { convertWeiToEther, numberFormat, untilTime } from "../../utils/number";
import Config from "../../utils/config.json";
import { getStrTokenSymbol, getTokenSymbol } from "../../utils/web3/init";

const CardListing = (props) => {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    setMeta(props.meta);
  }, []);
  return (
    <div>
      <div className="relative card-item-collection">
        <div className="relative overflow-hidden item-collection-inset">
          <div className="overlay-btn transition-all duration-300">
            {Config.openProcess &&
              meta &&
              typeof meta[2] !== "undefined" &&
              parseInt(meta[2]._amount) > 0 && (
                <Link
                  href={
                    meta
                      ? `/placements/${meta[2]._item}/${meta[2]._tokenId}/${meta[2]._amount}/${meta[2]._owner}`
                      : `/market`
                  }
                >
                  <button
                    className={`font-bold py-2 px-4 rounded-full text-white ${
                      parseInt(meta[2]._amount) > 0
                        ? "btn-buybid bg-detail"
                        : "bg-gray-300"
                    }`}
                  >
                    Detail
                  </button>
                </Link>
              )}
          </div>

          <div className="card-listing-des cursor-pointer">
            <div>
              {meta &&
                meta[4] !== "undefined" && [
                  meta[4] === "SELL" ? (
                    <img
                      className="card-listing-tag"
                      src={"/assets/image/sell_tag.png"}
                    />
                  ) : (
                    <img
                      className="card-listing-tag"
                      src={"/assets/image/bid_tag.png"}
                    />
                  ),
                ]}
            </div>
            {meta &&
              typeof meta[1].attributes !== "undefined" && [
                meta[1].attributes.length > 0 && [
                  <div className="rarlity-view">
                    {[...Array(parseInt(meta[1].attributes[0].value))].map(
                      (x, i) => {
                        return (
                          <img
                            key={i}
                            className="card-listing-rarity"
                            src={"/assets/image/rare_show.png"}
                          />
                        );
                      }
                    )}
                    {[...Array(5 - parseInt(meta[1].attributes[0].value))].map(
                      (x, i) => {
                        return (
                          <img
                            key={i}
                            className="card-listing-rarity"
                            src={"/assets/image/rare_hide.png"}
                          />
                        );
                      }
                    )}
                  </div>,
                ],
              ]}
          </div>
          <img
            className="object-center object-cover cursor-pointer img-ratio"
            src={
              meta && typeof meta[1].image !== "undefined"
                ? meta[1].image
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
          {meta && typeof meta[1] !== "undefined" ? meta[1].name : "-"}
        </h3>
        <div>
          {meta &&
            typeof meta[1].attributes !== "undefined" && [
              meta[1].attributes.length > 1 && [
                meta[1].attributes[1].trait_type === "varient" && (
                  <div className="flex">
                    <code className="bg-tag px-2 rounded text-white mr-2">
                      {meta[1].attributes[1].value}
                    </code>
                  </div>
                ),
              ],
            ]}
        </div>
      </div>
      <div className="pt-2">
        {/* <h3 className="font-medium text-gray-400 text-left">
          Sell Type : {meta && typeof meta[3] !== "undefined" ? meta[3] : "-"}
        </h3> */}
        <h3 className="font-medium text-gray-400 text-left">
          Until :{" "}
          {meta && typeof meta[2] !== "undefined"
            ? untilTime(meta[2]._expiration)
            : "-"}
        </h3>
      </div>

      <div className="pt-2 flex justify-between items-end">
        <div>
          {meta &&
            meta[4] !== "undefined" && [
              meta[4] === "SELL" ? (
                <p className="text-sell text-left text-bold">
                  {meta && typeof meta[2] !== "undefined" ? (
                    <span className="tooltip">
                      {numberFormat(convertWeiToEther(meta[2]._price))}
                      <span className="tooltiptext">
                        {convertWeiToEther(meta[2]._price)}
                      </span>
                    </span>
                  ) : (
                    "0"
                  )}{" "}
                  {getStrTokenSymbol()}
                </p>
              ) : (
                <p className="text-bid text-left text-bold">
                  {meta && typeof meta[2] !== "undefined" ? (
                    <span className="tooltip">
                      {numberFormat(convertWeiToEther(meta[2]._price))}
                      <span className="tooltiptext">
                        {convertWeiToEther(meta[2]._price)}
                      </span>
                    </span>
                  ) : (
                    "0"
                  )}{" "}
                  {getStrTokenSymbol()}
                </p>
              ),
            ]}
        </div>

        <div>
          <p className="font-medium text-gray-400 text-right">
            Qty : {meta && typeof meta[0] !== "undefined" ? meta[0] : 0} EA.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardListing;
