import React from 'react'
import Container from '@mui/material/Container';
import theme from '../../constants/MuiTheme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FooterButton from './FooterButton';



const Footer = () => {
  return (
    <Box zIndex={theme.zIndex.drawer} bgcolor='primary.main' pt={theme.spacing(4)} position='relative'>
      <Container maxWidth='md'>
        <Stack direction='row' justifyContent='space-evenly'>
          <Box textAlign={'center'} color='tertiary.main'>
            <Stack direction='column' spacing={1}>
              <Typography marginBottom={1} variant='h5'>Help</Typography>
              <Typography variant='footer' color='secondary'>031 344 4555</Typography>
            </Stack>
          </Box>
          <Box textAlign={'center'} color='tertiary.main'>
            <Stack direction='column' spacing={1}>
              <Typography marginBottom={1} variant='h5'>Shop</Typography>
              <FooterButton>Mens</FooterButton>
              <FooterButton>Womans</FooterButton>
              <FooterButton>Kids</FooterButton>
            </Stack>
          </Box>
          <Box textAlign={'center'} color='tertiary.main'>
            <Stack direction='column' spacing={1}>
              <Typography marginBottom={1} variant='h5'>Company</Typography>
              <FooterButton>Our store</FooterButton>
              <FooterButton>Careers</FooterButton>
              <FooterButton>Careers</FooterButton>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer