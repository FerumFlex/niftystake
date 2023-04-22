import { makeAutoObservable } from "mobx";


export class Wallet {
  address?: string;
  client?: any;

  constructor() {
    makeAutoObservable(this);
  }

  setAddress(address: string, client: any) {
    this.address = address;
    this.client = client;
  }
}
