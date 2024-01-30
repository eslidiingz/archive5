import { useEffect, useState } from "react";
import { convertEthToWei } from "../../utils/number";
import {
  auctionContract,
  getStrTokenSymbol,
  getTokenSymbol,
  getWalletAccount,
} from "../../utils/web3/init";
import Config from "../../utils/config.json";
import Whitelist from "../../utils/whitelist.json";
import ButtonState from "../button/button-state";
import { toast } from "react-toastify";
import { ToastDisplay } from "../ToastDisplay";
import CustomDatePicker from "../picker/date-picker";
import { unlimit } from "../../utils/global";
import dayjs from "dayjs";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { fetchABIWhitelist } from "../../utils/api/whitelist";
const BidItemModal = (props) => {
  const [state, setState] = useState(null);
  const [price, setPrice] = useState(1);
  const [approveToken, setApproveToken] = useState(false);
  const [terminatePrice, setTerminatePrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(
    `${dayjs().format("HH")}:${dayjs().format("mm")}`
  );
  const [day, setDay] = useState(new Date().setDate(new Date().getDate() + 1));
  const [bidStatus, setBidStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const { Moralis } = useMoralis();
  const web3Process = useWeb3ExecuteFunction();
  const onClose = (event) => {
    props.onClose && props.onClose(event);
  };

  useEffect(() => {
    setState(props);
    checkApproveToken();
    checkApproveContract();
    setAmount(props.data.amount);
  }, [day]);

  const handleAmount = (value) => {
    let data = 0;
    const amount = parseInt(props.data.amount);

    if (value > amount) {
      data = amount;
    } else {
      data = value;
    }
    setAmount(data);
  };

  const handleDate = (value) => {
    setDay(value);
  };

  const handleTime = async (value) => {
    const date = new Date(day);
    const hours = new Date(date.setHours(new Date().getHours()));
    const minute = new Date(hours.setMinutes(new Date().getMinutes()));
    const valueDate = dayjs(new Date(minute))
      .set("hour", value.split(":")[0])
      .set("minute", value.split(":")[1]);

    const nowDate = dayjs(new Date());
    const diff = valueDate.diff(nowDate, "hour");

    if (diff >= 24) {
      setTime(value);
    } else {
      setTime(`${dayjs().format("HH")}:${dayjs().format("mm")}`);
    }
  };
  const checkApproveToken = async () => {
    const options = {
      chain: Whitelist.chainMoralis,
      spender_address: Config.MarketAuctionAddress,
      owner_address: await getWalletAccount(),
      address: Config.TokenAddress,
    };
    const { allowance } = await Moralis.Web3API.token.getTokenAllowance(
      options
    );
    if (BigInt(allowance) > 0) {
      setApproveToken(true);
    }
  };
  const checkApproveContract = async () => {
    const account = await getWalletAccount();

    try {
      await Moralis.start({
        appId: Whitelist.appId,
        serverUrl: Whitelist.serverURL,
      });
      await Moralis.enableWeb3();

      const abi = await fetchABIWhitelist(props.data.address);

      const options = {
        ...abi,
        functionName: "isApprovedForAll",
        params: {
          owner: account,
          operator: Config.MarketAuctionAddress,
        },
      };

      const approve = await Moralis.executeFunction(options);
      setBidStatus(approve);
    } catch (error) {
      console.log(error);
    }
  };

  const setApproveContract = async () => {
    try {
      await Moralis.start({
        appId: Whitelist.appId,
        serverUrl: Whitelist.serverURL,
      });
      await Moralis.enableWeb3();

      const abi = await fetchABIWhitelist(props.data.address);
      const options = {
        ...abi,
        functionName: "setApprovalForAll",
        params: {
          operator: Config.MarketAuctionAddress,
          approved: true,
        },
      };

      setLoading(true);
      web3Process.fetch({
        params: options,
        onSuccess: () => {
          setLoading(false);
          setBidStatus(true);
          toast(
            <ToastDisplay
              type={"success"}
              title={"Transaction reciept"}
              description={"Approve Success !!!"}
            />
          );
        },
        onError: (error) => {
          setLoading(false);
          toast(
            <ToastDisplay
              type={"error"}
              title={"Waiting For Confirmation"}
              description={"Confirm this transaction in your wallet"}
            />
          );
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const setApproveContractForAll = async (type, address) => {
    try {
      await Moralis.start({
        appId: Whitelist.appId,
        serverUrl: Whitelist.serverURL,
      });
      await Moralis.enableWeb3();
      const _address = type === "token" ? Config.TokenAddress : address;

      const abi = await fetchABIWhitelist(_address);

      const name = type === "token" ? "approve" : "setApprovalForAll";
      const params =
        type === "token"
          ? {
              _spender: Config.MarketAuctionAddress,
              _value: unlimit,
            }
          : {
              operator: Config.MarketAuctionAddress,
              approved: true,
            };

      await executeMoralisFunction(abi, name, params, type);
    } catch (error) {
      console.log(error);
    }
  };
  const executeMoralisFunction = async (abi, functionName, params, type) => {
    try {
      await Moralis.start({
        appId: Whitelist.appId,
        serverUrl: Whitelist.serverURL,
      });
      await Moralis.enableWeb3();
      const options = {
        ...abi,
        functionName,
        params,
      };
      setLoading(true);

      await web3Process.fetch({
        params: options,
        onSuccess: () => {
          if (type === "token") {
            setApproveToken(true);
          } else {
            setApproveContract(true);
          }
          toast(
            <ToastDisplay
              type={"success"}
              title={"Transaction reciept"}
              description={"Approve Success !!!"}
            />
          );
          setLoading(false);
        },
        onError: (error) => {
          if (type === "token") {
            setApproveToken(false);
          } else {
            setApproveContract(false);
          }
          toast(
            <ToastDisplay
              type={"error"}
              title={"Waiting For Confirmation"}
              description={"Confirm this transaction in your wallet"}
            />
          );
          setLoading(false);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const BidListItem = async () => {
    try {
      const account = await getWalletAccount();

      if (price <= 0) {
        toast(
          <ToastDisplay
            type={"error"}
            title={"Incorrect Price"}
            description={"Please check price."}
          />
        );
        return;
      }

      const hour = time.split(":")[0];
      const minute = time.split(":")[1];
      const timeNow = dayjs(day).set("hour", hour).set("minute", minute);
      const timestamp = timeNow.unix();

      let currentTime = timestamp;

      if (Math.ceil(Date.now() / 1000) > currentTime) {
        toast(
          <ToastDisplay
            type={"error"}
            title={"Incorrect Expiration"}
            description={"Please check expiration."}
          />
        );
        return;
      }

      const priceWeiValue = convertEthToWei(price);
      const convertTerminatePrice = convertEthToWei(terminatePrice);
      const listAuctions = await auctionContract.methods.getAllAuction().call();
      let currentAuctionId = listAuctions.length;
      const data = await auctionContract.methods
        .placeAuction(
          props.data.address,
          props.data.tokenId,
          amount,
          priceWeiValue,
          currentTime,
          convertTerminatePrice,
          Config.TokenAddress
        )
        .send({ from: account })
        .on("sending", function (result) {
          setLoading(true);

          toast(
            <ToastDisplay
              type={"process"}
              title={"Waiting For Confirmation"}
              description={"Confirm this transaction in your wallet"}
            />
          );
        })
        .on("transactionHash", (transaction) => {
          setLoading(true);

          toast(
            <ToastDisplay
              type={"process"}
              title={"Your Transaction"}
              description={"View you transaction"}
              href={`${Config.blockExplorer}/tx/${transaction}`}
            />
          );
        })
        .on("receipt", function (receipt) {
          setLoading(false);
          toast(
            <ToastDisplay
              type={"success"}
              title={"Transaction receipt"}
              description={"Approve Success !!!"}
            />
          );
        })
        .on("error", function (error) {
          setLoading(false);

          toast(
            <ToastDisplay
              type={"error"}
              title={"Transaction rejected"}
              description={error.message}
            />
          );
        });
      window.location = "/market";
    } catch (error) {
      console.log(error);
    }
  };
  if (!props.show) {
    return null;
  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className="modal-global-size transform transition-all">
          <div className="hidden close-modal">
            <button
              type="button"
              onClick={() => onClose()}
              className="close-modal-text"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="bg-modal">
            <div className="bg-modal-warpper max-w-3xl mx-auto px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 lg:col-span-1">
                  <div>
                    <img
                      src={
                        props.data.image
                          ? props.data.image
                          : "/assets/image/no-image.jpg"
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/assets/image/no-image.jpg";
                      }}
                    />
                  </div>
                </div>

                <div className="col-span-3 lg:col-span-2">
                  <div>
                    <h2 className="modal-title">Create Bid Item</h2>
                    <div className="overflow-hidden sm:rounded-md">
                      <div className="grid grid-cols-6 gap-x-6 gap-y-3">
                        <div className="col-span-6">
                          <label className="label-modal">Address</label>
                          <input
                            readOnly
                            disabled
                            type="text"
                            value={props.data.address}
                            className="form-control"
                          />
                        </div>
                        <div className="col-span-6">
                          <label className="label-modal">Token ID</label>
                          <input
                            readOnly
                            disabled
                            type="text"
                            value={props.data.tokenId}
                            className="form-control"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="label-modal">Amount</label>
                          <input
                            type="number"
                            disabled={true}
                            value={amount}
                            min={1}
                            onChange={(e) => handleAmount(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="label-modal">
                            Price ({getStrTokenSymbol()})
                          </label>
                          <input
                            type="number"
                            disabled={!bidStatus}
                            defaultValue={price}
                            min={1}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="label-modal">Date Expiration</label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <CustomDatePicker
                              disabled={!bidStatus}
                              date={day}
                              onFunction={(date) => handleDate(date)}
                            />
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="label-modal">Time</label>
                          <input
                            type="time"
                            disabled={!bidStatus}
                            value={time}
                            onChange={(e) => handleTime(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="label-modal">Terminate Price</label>
                          <input
                            type="number"
                            disabled={!bidStatus}
                            defaultValue={terminatePrice}
                            onChange={(e) => setTerminatePrice(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <div className="col-span-6 mt-2">
                          {!approveToken ? (
                            <ButtonState
                              onFunction={() =>
                                setApproveContractForAll(
                                  "token",
                                  props.data.address
                                )
                              }
                              text={"Approve Token"}
                              loading={loading}
                              classStyle={"btn-theme-long btn-primary"}
                            />
                          ) : bidStatus ? (
                            <ButtonState
                              onFunction={() => BidListItem()}
                              text={"Bid Item"}
                              loading={loading}
                              classStyle={"btn-theme btn-primary"}
                            />
                          ) : (
                            <ButtonState
                              onFunction={() => setApproveContract()}
                              text={"Approve Contract"}
                              loading={loading}
                              classStyle={"btn-theme btn-primary"}
                            />
                          )}
                          <button
                            onClick={() => onClose()}
                            type="button"
                            className="btn-theme btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidItemModal;
