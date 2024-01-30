import { useEffect, useState } from "react";
import { convertEthToWei } from "../../utils/number";
import {
  getStrTokenSymbol,
  getWalletAccount,
  marketplaceContract,
} from "../../utils/web3/init";
import Config from "../../utils/config.json";
import { fetchABIWhitelist } from "../../utils/api/whitelist";
import Whitelist from "../../utils/whitelist.json";
import ButtonState from "../button/button-state";

import CustomDatePicker from "../picker/date-picker";
import { toast } from "react-toastify";
import { ToastDisplay } from "../ToastDisplay";

import dayjs from "dayjs";
import { getAssetByAddressToken } from "../../utils/api/asset-api";
import {
  putTransactionCollection,
  fetchCollectionByAssetId,
} from "../../utils/api/collection-api";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { unlimit } from "../../utils/global";
import { useRouter } from "next/router";

const PlaceItemModal = (props) => {
  const router = useRouter();
  const [state, setState] = useState(null);
  const [price, setPrice] = useState(1);
  const [amount, setAmount] = useState(0);
  const [day, setDay] = useState(new Date().setDate(new Date().getDate() + 1));
  const [time, setTime] = useState(
    `${dayjs().format("HH")}:${dayjs().format("mm")}`
  );
  const [sellStatus, setSellStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState({});
  const [approveToken, setApproveToken] = useState(false);
  const [approveContract, setApproveContract] = useState(false);
  const { Moralis } = useMoralis();
  const web3Process = useWeb3ExecuteFunction();

  const onClose = (event) => {
    props.onClose && props.onClose(event);
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

  const checkApproveToken = async () => {
    const options = {
      chain: Whitelist.chainMoralis,
      spender_address: Config.MarketPlaceAddress,
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
          operator: Config.MarketPlaceAddress,
        },
      };

      const approve = await Moralis.executeFunction(options);
      setApproveContract(approve);
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

      setStatusLoading({
        index: type,
        loading: true,
      });

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
          setStatusLoading({
            index: type,
            loading: false,
          });
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

          setStatusLoading({
            index: type,
            loading: false,
          });
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
              _spender: Config.MarketPlaceAddress,
              _value: unlimit,
            }
          : {
              operator: Config.MarketPlaceAddress,
              approved: true,
            };

      await executeMoralisFunction(abi, name, params, type);
    } catch (error) {
      console.log(error);
    }
  };

  const sellListItem = async () => {
    try {
      const hour = time.split(":")[0];
      const minute = time.split(":")[1];
      const timeNow = dayjs(day).set("hour", hour).set("minute", minute);
      const timestamp = timeNow.unix();
      const account = await getWalletAccount();
      if (!price && price <= 0) {
        toast(
          <ToastDisplay
            type={"error"}
            title={"Incorrect Price"}
            description={"Please check price."}
          />
        );
        return;
      }
      if (!amount || amount <= 0) {
        toast(
          <ToastDisplay
            type={"error"}
            title={"Incorrect Amount"}
            description={"Please check amount."}
          />
        );
        return;
      }

      if (Math.ceil(Date.now() / 1000) > timestamp) {
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

      let data = await marketplaceContract.methods
        .placeItem(
          props.data.address,
          props.data.tokenId,
          amount,
          priceWeiValue,
          timestamp,
          Config.TokenAddress
        )
        .send({ from: account })
        .on("sending", function (result) {
          setStatusLoading({
            index: "placement",
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
        .on("transactionHash", (transaction) => {
          setStatusLoading({
            index: "placement",
            loading: true,
          });

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
          setStatusLoading({
            index: "placement",
            loading: false,
          });

          toast(
            <ToastDisplay
              type={"success"}
              title={"Transaction reciept"}
              description={"Create cell item success !!!"}
              href={`${Config.blockExplorer}/tx/${receipt.transactionHash}`}
            />
          );
        })
        .on("error", function (error) {
          setStatusLoading({
            index: "placement",
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

      if (data.status) {
        const asset = await getAssetByAddressToken(
          props.data.address,
          props.data.tokenId
        );
        if(asset.rows.length > 0){
          const collectionId = await fetchCollectionByAssetId(asset.rows[0]._id);

          const transaction = {
            item: props.data.address,
            token: props.data.tokenId,
            user: account,
            price: price,
          };
          // console.log("Collection : ", collectionId);
          const _result = await putTransactionCollection(
            collectionId[0]._id,
            transaction
          );
        }

        window.location = `/placements/${props.data.address}/${props.data.tokenId}/${amount}/${account}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setState(props);
    checkApproveToken();
    checkApproveContract();
    setAmount(props.data.amount);
  }, [day]);

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
                    <h2 className="modal-title">Create Sell Item</h2>
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
                            min={1}
                            value={amount}
                            disabled={!approveContract || !approveToken}
                            onChange={(e) => handleAmount(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="label-modal">
                            Price ({getStrTokenSymbol()}) / Amount
                          </label>
                          <input
                            type="number"
                            min={1}
                            disabled={!approveContract || !approveToken}
                            defaultValue={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="label-modal">Date Expiration</label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <CustomDatePicker
                              disabled={!approveContract || !approveToken}
                              date={day}
                              onFunction={(date) => handleDate(date)}
                            />
                          </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="label-modal">Time</label>
                          <input
                            type="time"
                            disabled={!approveContract || !approveToken}
                            value={time}
                            onChange={(e) => handleTime(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <div className="col-span-6 mt-2 justify-between">
                          {approveContract && approveToken && (
                            <ButtonState
                              onFunction={() => sellListItem()}
                              text={"Sell Item"}
                              loading={
                                statusLoading.index === "placement" &&
                                statusLoading.loading === true
                              }
                              classStyle={"btn-theme btn-primary"}
                            />
                          )}
                          {!approveToken && (
                            <ButtonState
                              onFunction={() =>
                                setApproveContractForAll(
                                  "token",
                                  props.data.address
                                )
                              }
                              text={"Approve Token"}
                              loading={
                                statusLoading.index === "token" &&
                                statusLoading.loading === true
                              }
                              classStyle={"btn-theme-long btn-primary"}
                            />
                          )}
                          {approveToken && !approveContract && (
                            <ButtonState
                              onFunction={() =>
                                setApproveContractForAll(
                                  "contract",
                                  props.data.address
                                )
                              }
                              text={"Approve Contract"}
                              loading={
                                statusLoading.index === "contract" &&
                                statusLoading.loading === true
                              }
                              classStyle={"btn-theme-long btn-primary"}
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

export default PlaceItemModal;
