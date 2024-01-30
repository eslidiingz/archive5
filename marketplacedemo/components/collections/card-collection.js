import { useEffect, useState } from "react";
import Config from "../../utils/config.json";
import { getWalletAddress } from "../../utils/wallet/connector";
import { getWalletAccount } from "../../utils/web3/init";

const CardCollection = (props) => {
  const [meta, setMeta] = useState(null);

  const fetchImageBucket = (image) => {
    const url = `${Config.collectionApi}/images/${image}`;
    return url;
  };

  useEffect(() => {
    setMeta(props.meta);
  }, []);
  return (
    <>
      {meta &&
        typeof meta !== "undefined" && [
          <div>
            <div className="relative card-item-collection">
              <div className="relative overflow-hidden item-collection-inset">
                <img
                  className="object-center object-cover cursor-pointer img-ratio"
                  src={fetchImageBucket(meta.cover)}
                />
              </div>
            </div>
            <div className="mt-2">
              <h3 className="card-buybid-title">{meta.title}</h3>
              <p className="text-sm text-gray-500 collection-desc">{meta.description}</p>
              <p className="text-sm text-gray-500">
                Amounts: {meta.assets.length > 0 ? meta.assets.length : 0}
              </p>
              {typeof meta.user !== "undefined" && [
                <p className="text-sm text-gray-500">
                  Owner: {getWalletAddress(meta.user.address)}
                </p>,
              ]}
            </div>
          </div>,
        ]}
    </>
  );
};

export default CardCollection;
