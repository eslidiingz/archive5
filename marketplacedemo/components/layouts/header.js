import Link from "next/link";
import ConnectWallet from "../apps/connect-wallet";
import { getBalance, getTokenSymbol, web3 } from "../../utils/web3/init";
import { useEffect, useState } from "react";
import Config from "../../utils/config.json";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const router = useRouter();
  const menuList = [
    {
      link: "/profile/mynft",
      name: "My Assets",
      show: true,
    },
    {
      link: "/profile/mycollection",
      name: "My Collections",
      show: Config.openProcess,
    },
    {
      link: "/placements",
      name: "Placements List",
      show: Config.openProcess,
    },
    {
      link: "/profile/offers",
      name: "Offer Received",
      show: Config.openProcess,
    },
  ];

  useEffect(() => {
    getAccountBalance();
  }, [props]);

  const [balance, setBalance] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  function onOpenMenu(e) {
    props.onOpenedMenu && props.onOpenedMenu(e);
    setActiveMenu(!activeMenu);
  }

  const [openDropdownMobile, setOpenDropdownMobile] = useState(false);

  function onOpenDropdown() {
    setOpenDropdownMobile(!openDropdownMobile);
  }

  useEffect(() => {
    router.events.on("routeChangeComplete", function () {
      setOpenDropdownMobile(false);
      setActiveMenu(false);
    });
  }, [router]);

  async function getAccountBalance() {
    setBalance(await getBalance());
    setTokenSymbol(await getTokenSymbol());
  }

  return (
    <>
      <header id="header" className="header-epic">
        <div className="epic-nav-bg">
          <div className="epic-nav-bg-logo" style={{ zIndex: 3 }}>
            <Link href="/market">
              <img src={"/assets/image/logo/logo-epic.png"} />
            </Link>
          </div>
          <div className="epic-nav-bg-menu">
            <button
              className={`topbar-menu topbar-menu-bar custom-menu-btn-left lg:hidden ${
                activeMenu ? "active" : ""
              } `}
              onClick={onOpenMenu}
            ></button>
          </div>
          <div className="epic-nav-bg-profile" onClick={onOpenDropdown}>
            <div className="">
              <div className="h-16 flex items-center justify-between">
                <div className="dropdown flex-1 flex items-center justify-end">
                  {balance !== null && (
                    <div className="hidden-item topbar-fill-btn mr-2">
                      {balance}
                      <span className="mx-1">{tokenSymbol}</span>
                    </div>
                  )}
                  <ConnectWallet />
                </div>

                <div
                  className={`opacity-1 invisible dropdown-menu  transition-all duration-300 transform origin-top-right translate-y--20 ${
                    openDropdownMobile ? "focusDropdown" : ""
                  } `}
                >
                  <div className="absolute bg-dropdown-bg"></div>
                  <div
                    className="absolute origin-top-right bg-dropdown"
                    aria-labelledby="headlessui-menu-button-1"
                    id="headlessui-menu-items-117"
                    role="menu"
                  >
                    {balance !== null && (
                      <div className="px-10 block lg:hidden">
                        <div className="bg-coin">
                          {balance} {tokenSymbol}{" "}
                        </div>
                      </div>
                    )}
                    {menuList.map((item, key) => {
                      return (
                        item.show && (
                          <div
                            key={key}
                            className={`dropdown-item ${
                              router.pathname === item.link ? "active" : ""
                            } `}
                          >
                            <Link href={item.link}>
                              <a className="p">{item.name}</a>
                            </Link>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <header className="epic-topbar" id="header">
        <div className="epic-topbar-bg"></div>
        <nav aria-label="Top" className="mx-auto px-2 sm:px-4 epic-nav">
          <div className="">
            <div className="h-16 flex items-center justify-between">
              <div className="flex">
                <div className="ml-2 flex items-center lg:hidden">
                  <button
                    type="button"
                    className="bg-white p-2 rounded-md text-gray-400"
                  >
                    <span className="sr-only">Open menu</span>

                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="dropdown flex-1 flex items-center justify-end">
                {balance !== null && (
                  <div className="topbar-fill-btn mr-2">
                    {balance}
                    <span className="mx-1">{tokenSymbol}</span>
                  </div>
                )}
                <ConnectWallet />
              </div>
              <div className="opacity-1 invisible dropdown-menu  transition-all duration-300 transform origin-top-right translate-y--20">
                <div
                  className="absolute origin-top-right bg-dropdown"
                  aria-labelledby="headlessui-menu-button-1"
                  id="headlessui-menu-items-117"
                  role="menu"
                >
                  {menuList.map((item, key) => {
                    return (
                      item.show && (
                        <div
                          key={key}
                          className={`dropdown-item ${
                            router.pathname === item.link ? "active" : ""
                          } `}
                        >
                          <Link href={item.link}>
                            <a className="p">{item.name}</a>
                          </Link>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header> */}
    </>
  );
};

export default Header;
