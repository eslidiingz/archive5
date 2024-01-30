import Link from "next/link";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Search from "../form/search";
import { useEffect, useState } from "react";

import { useWalletContext } from "/context/wallet";
import ConnectProfile from "../connectProfile/connectProfile";
import Config, { debug } from "/configs/config";
import { web3Modal, web3Provider } from "/utils/providers/connector";
import Swal from "sweetalert2";
import { shortWallet } from "/utils/misc";
import { ethers } from "ethers";

function Topbar({ setActiveTab, activeTab = "profile" }) {
  const { wallet, walletAction } = useWalletContext();

  const [isActive, setActive] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const toggleMode = () => {
    setActive(!isActive);
  };

  const initialize = async () => {
    // await WalletHandler();
    // let wallet = await GetWalletAddress();
    // if (wallet) setWalletAddress(wallet);
  };

  // const WalletHandler = async () => {
  //   const _isSign = await isConnected();
  //   setIsSign(_isSign);
  // };

  const getNetworkId = async () => {
    try {
      const provider = web3Provider();
      const { chainId } = await provider?.getNetwork();

      return chainId;
    } catch (error) {
      console.log(error);
    }
  };

  const switchNetwork = async (chainId) => {
    const currentChainId = await getNetworkId();

    if (currentChainId !== chainId) {
      try {
        await window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethers.utils.hexValue(chainId).toString() }],
          })
          .then((res) => {
            location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        if (error.code === 4902) {
          console.log("add chain");
        }
      }
    }
  };

  const switchChainID = async () => {
    try {
      await window.ethereum.on("chainChanged", (chain) => {
        if (Number(chain) !== Config.CHAIN_ID) {
          switchNetwork(Config.CHAIN_ID);
          location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    if (debug)
      console.log(
        `%c========== Topbar Connect wallet ==========`,
        "color: orange"
      );

    if (typeof window.ethereum === "undefined") {
      Swal.fire(
        "Warning",
        "Please, Install metamark extension to connect DApp",
        "warning"
      );
      return;
    }

    const _web3Modal = web3Modal();

    try {
      const _wInstance = await _web3Modal.connect();
      const _wProvider = web3Provider(_wInstance);
      const signer = _wProvider.getSigner();

      walletAction.store(await signer.getAddress());

      // window.ethereum.on("accountsChanged", function (accounts) {
      //   console.log("Accounts : ", accounts[0]);
      //   walletAction.store(accounts[0]);
      // });

      await switchNetwork(Config.CHAIN_ID);
      await switchChainID();
    } catch (error) {
      Swal.fire("Error", error.toString().replace("Error: ", ""), "error");
    }
  };

  useEffect(() => {
    // if (wallet) {
    //   connectWallet();
    // }
  }, [wallet]);

  return (
    <>
      <Navbar className="bg-topbar topbar" expand="lg" fixed="top">
        <Container className="justify-content-between py-1 position-relative">
          <Link href="/">
            <a className=" navbar-brand">
              <img
                height={50}
                alt=""
                src="/assets/nft-image/icon-passionworld.svg"
              />
            </a>
          </Link>
          <Link href="/Profile">
            <a>ConnectProfile</a>
            {/* <ConnectProfile setActiveTab={setActiveTab} activeTab={activeTab} /> */}
          </Link>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll" className="topbar-right">
            <Nav className="nav-menucustom w-full" navbarScroll>
              <Link href="/Explore-collection/">
                <a className="nav-link text-menu text">Explore</a>
              </Link>
              <Link href="/Stats">
                <a className="nav-link text">Stats</a>
              </Link>
              <Link href="/Create">
                <a className="nav-link text-black">Create</a>
              </Link>
              <div className="d-lg-none">
                <Button className="btn-hover color-1 w-full">
                  Connect Wallet
                </Button>

                {/* Login */}
                <Nav.Link className="w-300">
                  Your Wallet
                  <div className="one-line-dot">
                    0x8AfCa4EC80B712a1691d4eE593a8B6eaa93b39570x8AfCa4EC80B712a1691d4eE593a8B6eaa93b3957
                  </div>
                </Nav.Link>
                <Nav.Link href="/Profile" className="d-lg-block d-none">
                  Profile
                </Nav.Link>
                {/* <Nav.Link href="#">Setting</Nav.Link> */}
              </div>
            </Nav>
          </Navbar.Collapse>

          {/* Desktop Version */}
          <div className="d-none d-lg-block">
            <div className="d-flex align-items-center ">
              <div className="ms-4 ms-xxl-0 w-100">
                {wallet ? (
                  <>
                    <DropdownButton
                      variant="btn btn-menu-wallet_main w-fit"
                      align="end"
                      title={shortWallet(wallet)}
                      id="dropdown-menu-align-end"
                    >
                      <Link href="/Profile">
                        <a aria-selected="false" className="dropdown-item">
                          My Profile
                        </a>
                      </Link>
                      <Dropdown.Item eventKey="4">Disconnect</Dropdown.Item>
                    </DropdownButton>
                  </>
                ) : (
                  <button
                    className="btn btn-menu-wallet_main w-fit"
                    onClick={() => connectWallet()}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* End Desktop Version */}
        </Container>
      </Navbar>
    </>
  );
}
export default Topbar;
