import { createContext, useContext } from "react";
import { Wallet } from "./Wallet";

let wallet = new Wallet();

const store = {
  wallet: wallet
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
