import React from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material';

const BrowseHero = () => {
  const isSmallerThanMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box bgcolor={'secondary.main'}>
      <Container maxWidth={false} disableGutters height={'100%'}>
        <Stack direction={'row'} height={'100%'} justifyContent={'center'} >
          {!isSmallerThanMd && (
            <>
              <Box
                width={'30%'}
                sx={{
                  backgroundPosition: '50% 50%',
                  backgroundImage: 'url(/lik1.png)',
                  backgroundSize: 'cover',
                }}
              />
              <Box
                width={'30%'}
                sx={{
                  backgroundPosition: '50% 50%',
                  backgroundImage: 'url(/lik2.png)',
                  backgroundSize: 'cover',
                }}
              />
            </>
          )}
          <Stack alignItems="center" direction="column" textAlign="center" spacing={2} padding="6rem">
            <Container maxWidth='xs'>
              <Typography variant={'h3'} fontWeight={700} component={'h2'}>Modern Male Collection</Typography>
            </Container>
            <Container maxWidth='sm'>
              <Typography variant='h6' fontWeight={400} component='body1'>This modern male fashion collection features clean lines, neutral colors, and versatile pieces perfect for any occasion.</Typography>
            </Container>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default BrowseHero