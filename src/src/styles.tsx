import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  logo: {
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));
