import Link from "next/link";
import Config from "../../../utils/config.json";
import { useEffect, useState } from "react";
import CardCollection from "../../../components/collections/card-collection";
import { fetchUserData } from "../../../utils/api/account-api";
import { fetchWhitelistUser } from "../../../utils/api/whitelist-api";
import { getWalletAccount } from "../../../utils/web3/init";

const MyCollectionPage = () => {
  const [allList, setAllList] = useState([]);
  const [roles, setRoles] = useState("");

  const checkWalletWhitelist = async () => {
    const _account = await getWalletAccount();
    const { rows } = await fetchWhitelistUser(_account);
    if (roles === "") {
      if (rows.length > 0) {
        setRoles(rows[0].roles);
      }
    }
  };

  const fetchAllCollection = async () => {
    const data = await fetchUserData(await getWalletAccount());
    const account = data.rows[0]._id;
    const url = "collections";
    const endpoint = `${Config.collectionApi}/${url}`;
    const item = await fetch(`${endpoint}?owner=${account}`);
    const { rows } = await item.json();
    if (allList.length === 0) {
      setAllList(rows);
    }
  };
  useEffect(() => {
    checkWalletWhitelist();
    fetchAllCollection();
  }, []);
  return (
    <>
      <main className="content">
        <div className="relative z-10 flex items-baseline justify-between pb-6 border-gray-200 mb-4">
          <h1 className="title">My Collections</h1>
          {roles !== "" && roles === "admin" && (
            <Link href={"/profile/mycollection/create"}>
              <button className="btn-theme btn-primary-long">
                Create My Collection
              </button>
            </Link>
          )}
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
            {allList.map((item, index) => {
              return (
                <Link href={`/collection/${item._id}`}>
                  <div
                    key={index}
                    className="card flex flex-col justify-between"
                  >
                    <div className="card-body p-2">
                      <CardCollection meta={item} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default MyCollectionPage;
