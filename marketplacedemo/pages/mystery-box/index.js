import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { avatarContract } from "../../utils/web3/init";

const MysteryBox = () => {
  const [clan, setClan] = useState([]);
  const fetchClanOpen = async () => {
    const _clan = await avatarContract.methods.getAllClan().call();

    const clans = await _clan.map(async (item) => {
      const _result = await avatarContract.methods.getClan(item).call();
      return { item, _result };
    });

    const _clans = await Promise.all(clans);

    return _clans;
  };

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const currentData = await fetchClanOpen();
      setClan(currentData);
    };

    fetchingData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="content">
        <h1 className="title mb-4">Mystery Box</h1>
      </div>

      {clan.map((_c, _i) => {
        return (
          <div className="avatar-cover" key={_i}>
            {_c._result.open === true && _c._result.tokenId.length > 0 ? (
              <Link
                href={`/mystery-box/avatar/${_c.item}`}
                className="cursor-pointer"
              >
                <div className="gasha-avatar "></div>
              </Link>
            ) : (
              <div className="gasha-avatar disable"></div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default MysteryBox;
