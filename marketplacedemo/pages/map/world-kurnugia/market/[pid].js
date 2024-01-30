import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";


const MapMarket = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <div className="flex justify-center">
        <div className="world">
        <p>ID: {pid}</p>
        </div>
      </div>
    </>
  );
};

export default MapMarket;