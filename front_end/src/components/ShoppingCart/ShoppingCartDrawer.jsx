import React from 'react';
import { Box, Button, Drawer, Link, Paper, Stack, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useStore } from '../../stores/Store';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  drawerContent: {
    flexGrow: 1,
    overflowY: 'auto',
  },
  bottomStack: {
    marginTop: 'auto',
  },
}));

const ShoppingCartDrawer = () => {
  const classes = useStyles();
  const { cartStore } = useStore();
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const { cartItems } = useCart();

  const handleDrawerOpen = () => {
    cartStore.openCart();
  };

  const handleDrawerClose = () => {
    cartStore.closeCart();
  };

  // console.log(cartStore.items)

  return (
    <Box>
      <ShoppingCartIcon color='tertiary' onClick={handleDrawerOpen} sx={{
        height: '35px',
        width: '35px'
      }} />
      <Drawer anchor='right' open={!cartStore.isClosed} onClose={handleDrawerClose}>
        <Box width={'30vw'} className={classes.drawerContainer}>
          <Box className={classes.drawerContent}>
            <Stack direction={'column'} spacing={2} >
              <Box m={3}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant='h5' fontWeight={500}>CART</Typography>
                  <Button variant='text' onClick={() => handleDrawerClose()}>
                    <Typography variant='h6' fontWeight={400}>CLOSE</Typography>
                  </Button>
                </Stack>
                <LinearProgress sx={{ width: '100%' }} color="success" />
                <Typography variant='body2' fontWeight={500} textAlign={'center'} marginTop={0.5} marginBottom={2}>Congratulations! You have free shipping!</Typography>
                <Box
                  alignItems={'center'}
                  paddingTop={2}
                  paddingBottom={2}
                  sx={{
                    borderTop: '1.5px solid #2F3037',
                    borderBottom: '1.5px solid #2F3037',
                  }}
                >
                  {cartStore.items.map((item, index) => (
                    <Box key={index} m={2}>
                      <Stack direction={'row'} justifyContent={'space-between'}>
                        <Stack direction={'column'}>
                          <img src={item.images} alt={item.name} style={{ maxWidth: '100px' }} />
                        </Stack>
                        <Stack direction={'column'}>
                          <Typography variant='h6'>
                            {item.name}
                          </Typography>
                          <Typography variant='body2' fontWeight={400}>
                            Size: {item.size}
                          </Typography>
                          <Typography variant='body2' fontWeight={400}>
                            Color: {item.color}
                          </Typography>
                          <Typography variant='body2' fontWeight={500}>
                            {item.price}
                          </Typography>
                        </Stack>
                        <Stack>
                          <HighlightOffIcon onClick={() => {
                            cartStore.removeItem(index)
                          }} />
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>

          </Box>
          <Stack className={classes.bottomStack}>
            <Paper elevation={5}>
              <Box margin={3} sx={{ borderTop: '1.5px solid #2F3037', borderBottom: '1.5px solid #2F3037' }}>
                <Stack direction={'column'} paddingTop={2} paddingBottom={2}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='body2' fontWeight={400}>Total:</Typography>
                    <Typography variant='h6'>
                      $ {cartStore.items.reduce((total, item) => total + item.price, 0).toFixed(2)}
                    </Typography>
                  </Stack>
                  <Typography variant='body2' fontWeight={400}>Tax included</Typography>
                </Stack>
              </Box>
              <Stack margin={3} >
                <Button variant='text'>
                  <Link underline='none' href='/cart' >
                    <Typography variant='h6' sx={{
                      borderBottom: '2px solid #2F3037 ',
                      marginBottom: '1rem'
                    }}>
                      Show Cart
                    </Typography>
                  </Link>
                </Button>
                <Button variant='contained' sx={{
                  borderRadius: '1rem',
                  padding: '0.8rem'
                }}>
                  <Typography variant='h5'>
                    Check Out
                  </Typography>
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
};

export default observer(ShoppingCartDrawer);
