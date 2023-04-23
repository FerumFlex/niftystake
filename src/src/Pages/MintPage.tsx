import { Stack, Paper, Button, Center, Text } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';
import { useStore } from "../store";
import { notifications } from '@mantine/notifications';
import { useState } from "react";
import { observer } from 'mobx-react-lite';


export const MintPage = observer(() => {
  let { wallet } = useStore();
  let [isLoading, setIsLoading] = useState(false);

  const mint = async () => {
    setIsLoading(true);
    try {
      if (! wallet.address) {
        notifications.show({
          'message': 'Please connect wallet first',
          'title': 'Error',
          'color': 'red'
        });
        return;
      }

      let query = {
        num_tokens: {}
      };
      let data = await wallet.client?.queryContractSmart(wallet.nft_contract, query);
      let num_tokens = data.count;

      let entrypoint = {
        mint: {
          token_id: (num_tokens + 1).toString()
        }
      };

      let tx = await wallet.client?.execute(wallet.address, wallet.stake_contract, entrypoint, "auto");
      console.log(tx);

      await wallet.loadNfts();

      notifications.show({
        'message': `Nft with number ${num_tokens} is minted`,
        'title': 'Success',
        'color': 'green'
      });

    } catch (e) {
      notifications.show({
        'message': 'Error can not run mint transaction',
        'title': 'Error',
        'color': 'red'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack align="center" justify="center" style={{backgroundColor: "unset", height: "100%"}}>
      <Paper withBorder radius="md" shadow="lg" p="xl" m={"xl"} style={{width: "500px"}}>
        {!!wallet.tokens.length && (
          <Center m={"md"}>
            You already have {wallet.tokens.length} nft tokens. You can stake them.
          </Center>
        )}
        <Center m={"md"}>
          <Text>Mint NFT and than you can stake them on stake tab.</Text>
        </Center>
        <Center>
          <Button loading={isLoading} onClick={mint} leftIcon={<IconPlus />} gradient={{ from: 'indigo', to: 'cyan' }}>mintNFT</Button>
        </Center>
      </Paper>
    </Stack>
  )
});
