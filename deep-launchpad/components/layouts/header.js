import { useCallback, useReducer, useEffect } from "react";

import { connectProvider, modalConnect } from "../../utils/connector/provider";
import { formatAccount } from "../../utils/lib/utilities";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Modal from "../utilities/modal-md.js";

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        account: action.account,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        account: action.account,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
};

const Header = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, account, chainId } = state;
  const [loadMetamask, setLoadMetamask] = useState(false);

  const fetchMetamask = () => {
    if (typeof window.ethereum !== "undefined") {
      setLoadMetamask(true);
    }
  };

  useEffect(() => {
    fetchMetamask();
  }, []);

  const connect = useCallback(async () => {
    try {
      const provider = await modalConnect().connect();
      const web3Provider = connectProvider();
      const signer = web3Provider.getSigner();
      const account = await signer.getAddress();
      const network = await web3Provider?.getNetwork();

      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        account,
        chainId: network.chainId,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const disconnect = useCallback(
    async function () {
      modalConnect()?.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
      window.location.reload();
    },
    [provider]
  );

  useEffect(() => {
    if (modalConnect()?.cachedProvider) {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        dispatch({
          type: "SET_ADDRESS",
          account: accounts[0],
        });
        window.location.reload();
      };

      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  const [showMe, setShowMe] = useState(false);
  const [showModal, setShowModal] = useState(false);
  function toggle() {
    setShowMe(!showMe);
    setShowMenu(false);
  }

  const [showMenu, setShowMenu] = useState(false);
  function toggleMenu() {
    setShowMenu(!showMenu);
    setShowMe(false);
  }

  function toggleHideMenu() {
    setShowMenu(false);
  }

  const downloadMetamask = () => {
    const win = window.open("https://metamask.io/download/", "_blank");
    win.focus();
  };

  return (
    <>
      <header id="navbar">
        <nav className="bg-navbar">
          <div className="container position-relative d-flex pt-2">
            <ul className="navbar-nav d-flex flex-row w-100">
              <div className="me-auto">
                <li className="nav-item">
                  <Link href={"/"}>
                    <a
                      className={`nav-link font-w-500 ${
                        router.pathname == "/" ? "active" : ""
                      }`}
                    >
                      <img
                        className=""
                        src="deeplogo-w.webp"
                        alt="busd"
                        width={132.47}
                      />
                    </a>
                  </Link>
                </li>
              </div>
              <div className="d-lg-none">
                <div className="pt-2">
                  <img
                    onClick={toggle}
                    className="icon-m"
                    alt="user.png"
                    src="icon/user.png"
                  />
                  <img
                    onClick={toggleMenu}
                    className="icon-m"
                    alt="menu.png"
                    src="icon/menu.png"
                  />
                </div>
              </div>
              <div className="d-none d-lg-block">
                <div className="d-flex pt-3">
                  <li className="nav-item">
                    <Link href={"/"}>
                      <a
                        className={`nav-link font-w-500 mg-l-30 ${
                          router.pathname == "/" ? "active" : ""
                        }`}
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/token-lock"}>
                      <a
                        className={`nav-link font-w-500 mg-l-30 ${
                          router.pathname == "/token-lock" ? "active" : ""
                        }`}
                      >
                        Token Locked
                      </a>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link href={"/stake"}>
                      <a
                        className={`nav-link font-w-500 mg-l-30  ${
                          router.pathname == "/stake" ? "active" : ""
                        }`}
                      >
                        Stake
                      </a>
                    </Link>
                  </li> */}

                  <div>
                    {loadMetamask === true ? (
                      <>
                        {web3Provider ? (
                          <div className="flex align-items-center mg-l-30">
                            <button className="btn-wallet" onClick={toggle}>
                              <span>
                                Your Wallet : {formatAccount(account)}
                              </span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex align-items-center mg-l-30">
                            <button
                              className="btn-wallet"
                              type="button"
                              onClick={() => connect()}
                            >
                              Connect
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex mx-4">
                          <button
                            className="btn-wallet"
                            onClick={() => downloadMetamask()}
                          >
                            <span>Install Metamask</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </ul>

            {/* modal profile */}
            <div>
              <div className={showMe ? "showModal" : "hideModal"}>
                <div className="modal-wallet">
                  <div className="">
                    {loadMetamask === true ? (
                      <>
                        {web3Provider ? (
                          <button className="btn-wallet" onClick={toggle}>
                            <span>Your Wallet : {formatAccount(account)}</span>
                          </button>
                        ) : (
                          <button
                            className="btn-wallet"
                            type="button"
                            onClick={() => connect()}
                          >
                            Connect
                          </button>
                        )}
                        <div
                          className="font-darkblue font-w-500 px-4 cursor-pointer"
                          onClick={() => disconnect()}
                        >
                          Disconnect
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <button
                            className="btn-wallet w-100"
                            style={{ marginLeft: "0px" }}
                            onClick={() => downloadMetamask()}
                          >
                            <span>Install Metamask</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  {/* <div
                    className="font-darkblue font-w-500 px-4 mb-2 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    Wallet
                  </div>
                  <Link href="#">
                    <div className="font-darkblue font-w-500 px-4 cursor-pointer">
                      Recent Transections
                    </div>
                  </Link> */}
                  {/* <hr className="line2" /> */}
                </div>
              </div>
            </div>

            {/* menu mobile */}
            <div className="d-lg-none">
              <div className={showMenu ? "showModal" : "hideModal"}>
                <div className="modal-wallet">
                  <Link href={"/"}>
                    <a
                      className={`nav-link font-w-500 mg-l-30 ${
                        router.pathname == "/" ? "active" : ""
                      }`}
                      onClick={toggleHideMenu}
                    >
                      Home
                    </a>
                  </Link>
                  <Link href={"/token-lock"}>
                    <a
                      className={`nav-link font-w-500 mg-l-30 ${
                        router.pathname == "/token-lock" ? "active" : ""
                      }`}
                      onClick={toggleHideMenu}
                    >
                      Token Locked
                    </a>
                  </Link>
                  {/* <Link href={"/stake"}>
                    <a
                      className={`nav-link font-w-500 mg-l-30  ${
                        router.pathname == "/stake" ? "active" : ""
                      }`}
                      onClick={toggleHideMenu}
                    >
                      Stake
                    </a>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title="Wallet"
      >
        Hello from the modal!
      </Modal>
    </>
  );
};

export default Header;
