import { InjectedConnector } from "@web3-react/injected-connector";
import Config from "../../configs/config";

export const Injected = new InjectedConnector({
  supportedNetworks: [Config.CHAIN_ID],
});
