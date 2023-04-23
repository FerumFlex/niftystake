import { makeAutoObservable, runInAction } from "mobx";


export class Wallet {
  address?: string;
  client?: any;
  nft_contract: string;
  stake_contract: string;
  tokens: any[] = [];

  constructor() {
    makeAutoObservable(this);
    this.nft_contract = "archway1usnr9cv4x9q4c5su9nz5kmy9qfs8yxjllv0llwf6tjzzx90rpd9sf0xcf7";
    this.stake_contract = "archway1h4h08q8j7g4punc2zrvvmfuqe05mn85jss2pfy09yqcwa64rgw4q4r3a88";
  }

  setAddress(address: string, client: any) {
    this.address = address;
    this.client = client;
  }

  async loadNfts() {
    let query = {"tokens": {"owner": this.address}};
    let data = await this.client?.queryContractSmart(this.nft_contract, query);

    let tokens: any[] = [];
    for (let token_id of data.tokens) {
      let query2 = {
        nft_info: {
          token_id: token_id
        }
      };
      let data = await this.client?.queryContractSmart(this.nft_contract, query2);
      tokens.push(data);
    }
    console.log(tokens);

    runInAction(() => {
      this.tokens = tokens;
    });
  }
}
