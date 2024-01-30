import { useEffect, useState } from "react";

const AvatarDetail = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(props.data);
  }, [props]);
  return (
    <div>
      <div className="relative card-item-collection">
        <div className="relative overflow-hidden">
          <img
            className="w-full h-full object-center object-cover cursor-pointer"
            src={"/assets/image/avatars/02.png"}
          />
        </div>
      </div>
      {/* <div className="mt-2">
        <h3 className="text-white">NFT Name</h3>
        <p className="text-sm text-gray-500">
          Token ID: {data ? data.tokenId : ""}
        </p>
      </div> */}
    </div>
  );
};

export default AvatarDetail;
