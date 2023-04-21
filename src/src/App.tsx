import { MantineProvider, ColorScheme, AppShell, ColorSchemeProvider, Container, Center } from '@mantine/core';
import './App.css';
import { HeaderAction } from './Components/Header';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { Routes, Route } from 'react-router-dom';
import { StakePage } from './Pages/StakePage';
import { MintPage } from './Pages/MintPage';


const links = [
  {
    "link": "/",
    "label": "mintNFT",
    "links": []
  },
  {
    "link": "/stake",
    "label": "stakeNFT",
    "links": []
  }
];


function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme}}>
        <AppShell
            padding="md"
            header={<HeaderAction links={links} />}
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
          >
            <Container>
              <Center>
                <Routes>
                  <Route index element={<MintPage />} />
                  <Route path="/stake" element={<StakePage />} />
                </Routes>
              </Center>
            </Container>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
