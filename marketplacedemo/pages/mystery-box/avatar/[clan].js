import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import token from "/utils/abis/token.json";
import nft from "/utils/abis/avatar.json";
import Config from "/utils/config.json";
import { toast } from "react-toastify";
import { ToastDisplay } from "../../../components/ToastDisplay";
import { unlimit } from "../../../utils/global";
import ButtonState from "../../../components/button/button-state";

import {
  getMetadata,
  getStrTokenSymbol,
  getWalletAccount,
  avatarContract,
} from "../../../utils/web3/init";
import Whitelist from "../../../utils/whitelist.json";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

const web3 = new Web3(
  Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545"
);

const MysteryBoxAvatar = () => {
  const router = useRouter();

  const { Moralis } = useMoralis();
  const [userState, setUserState] = useState({
    state: "not-available",
    text: "Not Available",
    loading: false,
  });
  const [state, setState] = useState("");
  const [reward, setReward] = useState(null);
  const [clans, setClans] = useState(null);

  const getTokenMetadata = async (tokenID) => {
    try {
      await Moralis.start({
        appId: Whitelist.appId,
        serverUrl: Whitelist.serverURL,
      });
      await Moralis.enableWeb3();
      const options = {
        contractAddress: Config.AvatarAddress,
        functionName: "tokenURI",
        params: {
          tokenId: parseInt(tokenID),
        },
        abi: nft,
      };

      const data = await Moralis.executeFunction(options);

      const _data = await getMetadata(data);
      return _data;
    } catch (error) {
      console.log(error);
    }
  };

  const transferMysteryBox = async () => {
    try {
      const accounts = await getWalletAccount();

      const { clan } = router.query;

      avatarContract.methods
        .buy(clan, Config.TokenAddress)
        .send({ from: accounts })
        .on("sending", () => {
          setState("loading");

          setUserState({
            state: "approve",
            loading: true,
          });

          toast(
            <ToastDisplay
              type={"process"}
              title={"Waiting For Confirmation"}
              description={"Confirm this transaction in your wallet"}
            />
          );
        })
        .on("transactionHash", (res) => {
          setState("loading");
          setUserState({
            state: "approve",
            loading: true,
          });

          toast(
            <ToastDisplay
              type={"process"}
              title={"Your Transaction"}
              description={"View on etherscan.io"}
              href={`${Config.blockExplorer}/tx/${res}`}
            />
          );
        })
        .on("receipt", async (result) => {
          const tokenId = result.events.Transfer.returnValues.tokenId;
          setUserState({
            state: "approve",
            loading: false,
          });
          setState("loading");

          const _data = await getTokenMetadata(tokenId);

          setReward(_data);

          setState("complete");

          toast(
            <ToastDisplay
              type={"success"}
              title={"Transaction reciept"}
              description={"Open mystery box success !!!"}
              href={`${Config.blockExplorer}/tx/${result.transactionHash}`}
            />
          );
        })
        .on("error", (error) => {
          setUserState({
            state: "approve",
            loading: false,
          });
          setState("");

          toast(
            <ToastDisplay
              type={"error"}
              title={"Transaction rejected"}
              description={error.message}
            />
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  const checkBalanceToken = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      // ABI สำหรับ MultiToken
      const tokenContract = new web3.eth.Contract(token, Config.TokenAddress);

      //check balance of in wallet address
      const tokenBalance = await tokenContract.methods
        .balanceOf(accounts[0])
        .call();
      const balance = web3.utils.fromWei(tokenBalance, "ether");
      if (parseFloat(balance) < balance) {
        setUserState({
          text: `Not Have ${getStrTokenSymbol()}`,
          state: "not-enough",
        });
      } else {
        //check allowance from wallet
        const tokenAllowance = await tokenContract.methods
          .allowance(accounts[0], Config.AvatarAddress)
          .call();

        //if allowance not allocate then approve token
        if (tokenAllowance <= 0) {
          setUserState({
            text: "approve",
            state: "unapprove",
          });
        } else {
          setUserState({
            state: "approve",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialize = async () => {
    try {
      const { clan } = router.query;
      const _clan = await avatarContract.methods.getClan(clan).call();
      setClans(_clan);

      if (_clan.open === true && _clan.tokenId.length > 0) {
        checkBalanceToken();
      } else {
        setUserState({
          state: "not-availiable",
          text: "Not Availiable",
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveAllowanace = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      // ABI สำหรับ MultiToken
      const tokenContract = new web3.eth.Contract(token, Config.TokenAddress);

      await tokenContract.methods
        .approve(Config.AvatarAddress, unlimit)
        .send({ from: accounts[0] })
        .on("sending", () => {
          setUserState({
            text: "approve",
            state: "unapprove",
            loading: true,
          });

          toast(
            <ToastDisplay
              type={"process"}
              title={"Waiting For Confirmation"}
              description={"Confirm this transaction in your wallet"}
            />
          );
        })
        .on("receipt", () => {
          setUserState({
            state: "approve",
            loading: false,
          });

          toast(
            <ToastDisplay
              type={"success"}
              title={"Transaction reciept"}
              description={"Approve Success !!!"}
            />
          );
        })
        .on("error", (error) => {
          setUserState({
            text: "approve",
            state: "unapprove",
            loading: false,
          });

          toast(
            <ToastDisplay
              type={"error"}
              title={"Transaction rejected"}
              description={error.message}
            />
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    initialize();
  }, [router.isReady]);

  return (
    <>
      <div className="content">
        {typeof clans !== "undefined" && (
          <h1 className="title mb-4">{clans !== null && clans.name}</h1>
        )}

        <div className="flex text-center relative flex-col items-center">
          {state === "" ? (
            <div className="open-box">
              {userState.state === "not-enough" && (
                <ButtonState
                  text={userState.text}
                  classStyle={"btn-theme btn-secondary mr-0"}
                />
              )}

              {userState.state === "not-availiable" && (
                <ButtonState
                  text={userState.text}
                  classStyle={"btn-theme btn-secondary mr-0"}
                />
              )}
              {userState.state === "unapprove" && (
                <ButtonState
                  onFunction={() => approveAllowanace()}
                  text={userState.text}
                  loading={userState.loading}
                  classStyle={"btn-theme btn-primary mr-0"}
                />
              )}
              {userState.state === "approve" && (
                <ButtonState
                  onFunction={() => transferMysteryBox()}
                  text={userState.text}
                  loading={userState.loading}
                  classStyle={"btn-openbox"}
                />
              )}
            </div>
          ) : state === "loading" ? (
            <div className="open-box box-opening">
              <div className="loader-treasure-box">
                <svg
                  className="animate-spin -ml-1 mr-3 h-16 w-16 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            <div className="open-box box-opened">
              <div className="reward-box">
                <img
                  className="img-open-box"
                  src={
                    reward.image ? reward.image : "/assets/image/no-image.jpg"
                  }
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/assets/image/no-image.jpg";
                  }}
                />
                <div className="reward-box-close">
                  <button
                    className="btn-theme btn-primary mr-0"
                    onClick={() => setState("")}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MysteryBoxAvatar;
