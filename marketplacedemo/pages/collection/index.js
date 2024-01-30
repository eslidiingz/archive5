import { useState, useEffect } from "react";
import Link from "next/link";
import Config from "../../utils/config.json";
import { findUserById } from "../../utils/api/account-api";
import CardCollection from "../../components/collections/card-collection";

const CollectionListPage = () => {
  const [allList, setAllList] = useState([]);
  const fetchAllCollection = async () => {
    const url = "collections";
    const endpoint = `${Config.collectionApi}/${url}`;
    const item = await fetch(`${endpoint}`);
    const { rows } = await item.json();

    const _all = await rows.map(async (item) => {
      const user = await findUserById(item.owner);

      return { ...item, user };
    });

    const _allp = await Promise.all(_all);
    if (allList.length === 0) {
      setAllList(_allp);
    }
  };

  useEffect(() => {
    fetchAllCollection();
  }, []);

  return (
    <>
      <main className="content">
        <h1 className="title mb-4">Epic Gathering Collection</h1>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 mb-12">
            {allList.map((item, index) => {
              return (
                <Link href={`collection/${item._id}`}>
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
          {/* <div className="flex justify-center mt-4">
            <button className="btn-theme btn-secondary">Read More</button>
          </div> */}
        </div>

        {/* <h1 className="title mb-4">Partner Collection</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
            {allList.map((item, index) => {
              return (
                <Link href={`collection/${item._id}`}>
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
          <div className="flex justify-center mt-4">
            <button className="btn-theme btn-secondary">
              Read More
            </button>
          </div>
        </div> */}
      </main>
    </>
  );
};

export default CollectionListPage;
