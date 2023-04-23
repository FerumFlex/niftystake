import { Stack, Paper, ScrollArea, Table, Group, Avatar, Text, Button } from "@mantine/core";
import { observer } from 'mobx-react-lite';
import { useStore } from "../store";


export const StakePage = observer(() => {
  let { wallet } = useStore();

  const rows = wallet.tokens.map((item: any) => (
    <tr key={item.extension.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.extension.description} {item.extension.name}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <>
          <Button mr="lg" gradient={{ from: 'indigo', to: 'cyan' }}>stakeNFT</Button>
          <Button mr="lg" gradient={{ from: 'indigo', to: 'cyan' }}>unStakeNFT</Button>
          <Button mr="lg" gradient={{ from: 'indigo', to: 'cyan' }}>claim</Button>
        </>
      </td>
    </tr>
  ));
  return (
    <Stack align="center" justify="center" style={{backgroundColor: "unset", height: "100%"}}>
      <Paper withBorder radius="md" shadow="lg" p="xl" m={"xl"} style={{width: "800px"}}>
        <h2>You have {wallet.tokens.length} tokens</h2>
        <ScrollArea>
          <Table verticalSpacing="sm">
            <thead>
              <tr>
                <th>Token</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Stack>
  );
});