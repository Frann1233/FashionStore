import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import heroStyles from './HeroStyles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import male from '../../assets/male.jpg';
import female from '../../assets/woman.jpg';


function Hero({ appBarHeight }) {
  const classes = heroStyles();
  const [hovered, setHovered] = useState(null);

  return (
    <Stack
      className={classes.imageContainer}
      justifyContent='center'
      alignItems='center'
      width='100vw'
      direction='row'
      position='relative'
      height={`calc(100vh - ${appBarHeight}px)`}
      overflow='hidden'
      bgcolor='secondary.main'
    >
      <Link href='/browse/male' height={'100%'} width={'100%'}>
        <img
          alt='male'
          onMouseOver={() => setHovered('male')}
          onMouseLeave={() => setHovered(null)}
          src={male}
          className={`${classes.male} ${hovered === 'female' && classes.grayscale}`}
        />
      </Link>
      {hovered === 'male' && (
        <Button className={classes.hoverButton} >
          <Typography variant='h2' fontWeight={700}>Shop Male</Typography>
        </Button>
      )}
      <Link href='/browse/female' height={'100%'} width={'100%'}>
        <img
          alt='female'
          onMouseOver={() => setHovered('female')}
          onMouseLeave={() => setHovered(null)}
          src={female}
          className={`${classes.female} ${hovered === 'male' && classes.grayscale}`}
        />
        {hovered === 'female' && (
          <Button className={classes.hoverButton}><Typography variant='h2' fontWeight={700}>Shop Female</Typography></Button>
        )}
      </Link>
    </Stack>
  );
}

export default Hero;