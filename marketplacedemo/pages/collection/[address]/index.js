import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Config from "../../../utils/config.json";
import { fetchImageBucket } from "../../../utils/api/collection-api";
import { findUserById } from "../../../utils/api/account-api";
import CardCollectionDetail from "../../../components/collections/card-collection-detail";
import { getWalletAccount } from "../../../utils/web3/init";
import { getWalletAddress } from "../../../utils/wallet/connector";
const CollectionDetailPage = () => {
  const router = useRouter();
  const [detail, setDetail] = useState(null);

  const sortArrayASC = async (data, key) => {
    const _sort = await data.sort((a, b) =>
      a[key].$numberDecimal > b[key].$numberDecimal ? 1 : -1
    );

    return _sort;
  };

  const sortArrayDESC = async (data, key) => {
    const _sort = await data.sort((a, b) =>
      a[key].$numberDecimal < b[key].$numberDecimal ? 1 : -1
    );

    return _sort;
  };

  const fetchCollectionDetail = async () => {
    const { address } = router.query;
    const result = await fetch(
      `${Config.collectionApi}/collections/${address}`
    );

    var data = await result.json();
    console.log(data);

    const _cover = await fetchImageBucket(data.cover);
    const _owner = await findUserById(data.owner);

    data.cover = _cover;
    const account = await getWalletAccount();
    data.userOwner =
      account.toLowerCase() === _owner.address.toLowerCase()
        ? "You"
        : await getWalletAddress(_owner.title);

    const _transaction = data.transaction;

    if (_transaction.length > 0) {
      const _floor = await sortArrayASC(_transaction, "price");
      data.floor_price = parseFloat(
        _floor[0].price.$numberDecimal ? _floor[0].price.$numberDecimal : 0
      );
      const _highest = await sortArrayDESC(_transaction, "price");
      data.highest_price = parseFloat(_highest[0].price.$numberDecimal);
    }

    if (detail === null) {
      setDetail(data);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchCollectionDetail();
  }, [router.isReady]);
  return (
    <>
      {detail && typeof detail !== "undifined" && (
        <main className="content">
          <div className="grid grid-cols-1 xl:grid-cols-2 mb-8">
            <div className="col-span-1 header-left">
              <div className="header-left-img">
                <img
                  className="img-collection-cover"
                  src={
                    detail.cover ? detail.cover : "/assets/image/avatars/02.png"
                  }
                />
              </div>
              <div className="header-left-desc">
                <h1 className="text-4xl font-bold tracking-tight text-primary break-word">
                  {detail.title}
                </h1>
                <p className="font-medium text-gray-400">
                  Create by {detail.userOwner}
                </p>

                {detail.userOwner === "You" && (
                  <Link href={"/profile/mynft/create"}>
                    <button className="btn-theme btn-sm btn-primary mt-2">
                      Add Assets
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <div className="col-span-1 mt-6 xl:mt-0 flex-end">
              <div className="collection-status">
                <div className="collection-status-item">
                  <h3>{detail.assets.length}</h3>
                  <p className="text-gray-400 uppercase">items</p>
                </div>
                <div className="collection-status-item">
                  <h3>{detail.holder.length}</h3>
                  <p className="text-gray-400 uppercase">owners</p>
                </div>
                <div className="collection-status-item">
                  <h3>{detail.floor_price ? detail.floor_price : 0}</h3>
                  <p className="text-gray-400 uppercase">floor price</p>
                </div>
                <div className="collection-status-item">
                  <h3>{detail.highest_price ? detail.highest_price : 0}</h3>
                  <p className="text-gray-400 uppercase">highest price</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
            {detail.assets.map((item, itemKey) => {
              return <CardCollectionDetail data={item} key={itemKey} />;
            })}
          </div>
        </main>
      )}
    </>
  );
};

export default CollectionDetailPage;
