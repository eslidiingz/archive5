// modules : react
import { useEffect } from "react";

// modules : crypto
import { MetaMaskProvider } from "metamask-react";

// css
import "tailwindcss/tailwind.css";
import "/public/css/main.css";
import "/public/css/button.css";
import "/public/css/datepicker.css";
import "/public/css/timepicker.css";
import "/public/css/layout.css";
import "/public/css/layout-2.css";
import "/public/css/map.css";

// components
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import Menu from "../components/layouts/menu";
import { useState } from "react";

//Other
import "/utils/NProgress";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getWalletAccount, web3 } from "../utils/web3/init";
import { fetchUserData } from "../utils/api/account-api";
import Config from "../utils/config.json";
import WhiteList from "../utils/whitelist.json";
import { MoralisProvider } from "react-moralis";
import { useRouter } from "next/router";
import Web3 from "web3";
import Link from "next/link";

const switchAccount = async () => {
  try {
    await window.ethereum.on("accountsChanged", (account) => {
      location.reload();
    });
  } catch (error) {
    console.log(error);
  }
};

const getNetworkId = async () => {
  const currentChainId = await web3.eth.net.getId();
  return currentChainId;
};

const switchNetwork = async (chainId) => {
  const currentChainId = await getNetworkId();

  if (currentChainId !== chainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(chainId) }],
      });
    } catch (error) {
      if (error.code === 4902) {
        alert("add this chain id");
      }
    }
  }
};

const activate = async () => {
  if (window.ethereum) {
    const enable = await window.ethereum.enable();
    if (enable[0]) {
      fetchAccountUser();
    }
    return true;
  } else {
    return false;
  }
};

const fetchAccountUser = async () => {
  try {
    const account = await getWalletAccount();
    const { total } = await fetchUserData(account);
    if (total === 0) {
      const userEndpoint = "users";
      const userUrl = `${Config.collectionApi}/${userEndpoint}`;
      const createUser = await fetch(`${userUrl}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: account,
          title: account,
          description: "",
        }),
      });
      const _r = await createUser.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const App = ({ Component, pageProps }) => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [metamask, setMetamask] = useState(false);
  const router = useRouter();

  function onOpenedMenu() {
    setOpenMenuMobile(!openMenuMobile);
    setActiveMenu(!activeMenu);
  }

  let totalHeight = 0;

  useEffect(async () => {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    totalHeight =
      parseFloat(header.offsetHeight) + parseFloat(footer.offsetHeight);
    const active = await activate();
    switchAccount();
    switchNetwork(WhiteList.chainId);
    setMetamask(active);
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", function () {
      setOpenMenuMobile(false);
      setActiveMenu(false);
    });
  }, [router]);

  return (
    <MoralisProvider
      appId={`${WhiteList.appId}`}
      serverUrl={`${WhiteList.serverURL}`}
    >
      <MetaMaskProvider>
        <Header onOpenedMenu={(e) => onOpenedMenu()} />
        <div
          className="contentLayout"
          style={{
            minHeight: "calc(100vh - " + totalHeight + "px)",
            zIndex: 1,
            marginTop: "30px",
          }}
        >
          {Config.openProcess && (
            <div
              className={`contentLayoutMenu ${
                openMenuMobile ? "show-menu-mobile" : ""
              }`}
            >
              <div className="contentLayoutMenu-top"></div>
              <div className="contentLayoutMenu-body">
                <Menu />
              </div>
              <div className="contentLayoutMenu-bottom"></div>
            </div>
          )}

          <div className="contentLayoutBox">
            <div className="container">
              <Component {...pageProps} />
            </div>
          </div>
        </div>

        {!metamask && <Modal />}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
        />
        <Footer />
      </MetaMaskProvider>
    </MoralisProvider>
  );
};

const Modal = () => {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="modal-global-size-meta transform transition-all">
          <div className="bg-modal-meta flex">
              <img className="metamask-logo" src={"/assets/image/logo-metamask.svg"} />
              <div className="text-center mb-4">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Please use metamask.
                </h3>
              </div>
            <div className="flex">
              <Link href={"https://metamask.io/download/"}>
                <a className="button btn-theme btn-primary-long mr-0" target={"_blank"}>
                  Install Metamask
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
