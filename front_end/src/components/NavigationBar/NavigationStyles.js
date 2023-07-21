import { makeStyles } from '@mui/styles';

const navigationBarStyles = makeStyles((theme) => ({
  appBar: {
    height: ({ appBarHeight }) => appBarHeight,
    position: 'relative',
    zIndex: '999'
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButtonBox: {
    flexGrow: 1,
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuIcon: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },
  boxPages: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  boxTitle: {
    flexGrow: 1.1,
    [theme.breakpoints.down('xl')]: {
      flexGrow: 1.3,
    },
    [theme.breakpoints.down('lg')]: {
      flexGrow: 1.6,
    },
    [theme.breakpoints.down('md')]: {
      flexGrow: 0.85,
    },
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0.9,
    },
    display: 'flex',
  },
  titleText: {
    fontWeight: 700,
    letterSpacing: '0.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
  userMenu: {
    marginTop: '45px'
  }

}));

export default navigationBarStyles;
