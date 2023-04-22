import { Badge, Button } from "@mantine/core";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { observer } from 'mobx-react-lite';
import { GasPrice } from "@cosmjs/stargate";
import { ConstantineInfo } from '../chain.info.constantine';
import { notifications } from '@mantine/notifications';
import { useStore } from "../store";


const shortenAddress = (adderess: string): string => {
  return adderess.slice(0, 10) + "..." + adderess.slice(-8);
}

export const UserPanel = observer(() => {
  let { wallet } = useStore();

  let connectWallet = async () => {
    console.log('Connecting wallet...');
    try {
      if (window['keplr']) {
        if (window.keplr['experimentalSuggestChain']) {
          await window.keplr.experimentalSuggestChain(ConstantineInfo)
          await window.keplr.enable(ConstantineInfo.chainId);
          let offlineSigner = await window.getOfflineSigner(ConstantineInfo.chainId);
          let gasPrice = GasPrice.fromString('0.002'+ConstantineInfo.currencies[0].coinMinimalDenom);
          let cwClient = await SigningCosmWasmClient.connectWithSigner(
            ConstantineInfo.rpc,
            offlineSigner,
            { gasPrice:  gasPrice }
          );
          let accounts = await offlineSigner.getAccounts();
          let userAddress = accounts[0].address;
          wallet.setAddress(userAddress, cwClient);
          let res = await cwClient.queryContractSmart("archway1j2tvhkwh0m22ud4j8eu5r447xm4yuy33v90uhk4pzh3mr88qdlgq8tyhfw", {
            "balance": {
              address: "archway13lv65pvdv00t570tvgdwwe8ev6jhuvpf3myq5m"
            }
          });
          console.log(res);
        } else {
          notifications.show({
            'message': 'Error access experimental features, please update Keplr',
            'title': 'Error',
            'color': 'red'
          });
        }
      } else {
        notifications.show({
          'message': 'Error accessing Keplr',
          'title': 'Error',
          'color': 'red'
        });
      }
    } catch (e: any) {
      notifications.show({
        'message': e.toString(),
        'title': 'Error connecting to wallet',
        'color': 'red'
      });
    }
  }

  return (
    <>
      {wallet.address ? (
        <Badge title={wallet.address}>{shortenAddress(wallet.address)}</Badge>
      ) : (
        <Button radius="xl" h={30} onClick={connectWallet}>
          Connect wallet
        </Button>
      )}
    </>
  )
});
