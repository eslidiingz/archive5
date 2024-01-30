import { useMetaMask } from "metamask-react";
import { getWalletAddress } from "../../utils/wallet/connector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ConnectWallet = (props) => {
  const router = useRouter();

  const { status, connect, account } = useMetaMask();

  function onOpenedDropdown(e) {
    props.openDropdown && props.openDropdown(e);
    setActiveMenu(!activeMenu);
  }

  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeComplete", function () {
      setActiveMenu(false);
    });
  }, [router]);
  

  if (status === "initializing")
    return (
      <button className="topbar-fill-btn">Synchronisation with MetaMask</button>
    );

  if (status === "unavailable")
    return <button className="topbar-fill-btn">MetaMask not available</button>;

  if (status === "notConnected")
    return (
      <button onClick={connect} className="topbar-fill-btn">
        Connect Wallet
      </button>
    );

  if (status === "connecting")
    return <button className="topbar-fill-btn">Connecting...</button>;

  if (status === "connected")
    return (
      <>
      <button className="topbar-fill-btn custom-menu-btn-right hidden lg:block" onClick={onOpenedDropdown}>
        <span className="">
          {getWalletAddress(account)}
        </span>
      </button>
      
      <span className="lg:hidden">
        <button className={`topbar-menu topbar-menu-user custom-menu-btn-right ${
                    activeMenu ? "active" : ""
                  } `} onClick={onOpenedDropdown}>
        </button>
      </span>
      </>
    );

  return null;
};
export default ConnectWallet;
