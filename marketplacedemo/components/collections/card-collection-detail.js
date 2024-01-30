import Link from "next/link";
import { useEffect, useState } from "react";
import { getAssetById } from "../../utils/api/asset-api";
import Config from "../../utils/config.json";
import {
  avatarContract,
  getMetadata,
  mintContract,
} from "../../utils/web3/init";

const CardCollectionDetail = (props) => {
  const [data, setData] = useState(null);

  const fetchAssetsById = async (props) => {
    const asset = await getAssetById(props.data);
    const meta = await getMetadata(asset.metadata);
    var owner;

    if (asset.address.toLowerCase() === Config.MintAddress.toLowerCase()) {
      owner = await mintContract.methods.ownerOf(asset.token).call();
    } else if (
      asset.address.toLowerCase() === Config.AvatarAddress.toLowerCase()
    ) {
      owner = await avatarContract.methods.ownerOf(asset.token).call();
    }

    const data = { ...meta, ...asset, owner };

    setData(data);
  };

  useEffect(() => {
    fetchAssetsById(props);
  }, [props]);
  return (
    <div>
      <div className="relative card-item-collection">
        <div className="relative overflow-hidden item-collection-inset">
          <div className="overlay-btn transition-all duration-300">
            {Config.openProcess && [
              data &&
                typeof data.attributes !== "undefined" && [
                  <>
                    <Link
                      href={`/placements/${data.address}/${data.token}/1/${data.owner}`}
                    >
                      <a target="_blank">
                        <button className="btn-buybid bg-detail font-bold py-2 px-4 rounded-full text-white">
                          Detail
                        </button>
                      </a>
                    </Link>
                  </>,
                ],
            ]}
          </div>

          <div className="card-listing-des cursor-pointer">
            <div></div>

            {data &&
              typeof data.attributes !== "undefined" && [
                [
                  data.attributes.length > 0 && [
                    <div className="rarlity-view">
                      {[
                        ...Array(
                          parseInt(
                            data.attributes[0].value
                              ? data.attributes[0].value
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
                              data.attributes[0].value
                                ? data.attributes[0].value
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
              ]}
          </div>
          <img
            className="object-center object-cover cursor-pointer img-ratio"
            src={
              data && typeof data !== "undefined"
                ? data.image
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
          {data && typeof data !== "undefined" ? data.name : "-"}
        </h3>
        <div>
          {data &&
            typeof data.attributes !== "undefined" && [
              [
                data.attributes.length > 1 && [
                  typeof data.attributes[1] !== "undifined" && [
                    data.attributes[1].trait_type === "varient" && [
                      <div className="flex">
                        <code className="bg-tag px-2 rounded text-white mr-2">
                          {data.attributes[1].value}
                        </code>
                      </div>,
                    ],
                  ],
                ],
              ],
            ]}
        </div>
      </div>
    </div>
  );
};

export default CardCollectionDetail;
