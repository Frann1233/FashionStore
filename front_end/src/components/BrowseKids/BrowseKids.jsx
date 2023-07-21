import { Box, Grid, Stack } from '@mui/material'
import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import Clothes3 from '../../assets/clothes3.jpg';
import Accessories3 from '../../assets/accessories3.jpg';
import Bags3 from '../../assets/bags3.jpg';
import FootWare3 from '../../assets/footware3.jpg';

const images = [
  {
    src: Clothes3,
    label: 'Clothes'
  },
  {
    src: Accessories3,
    label: 'Accessories'
  },
  {
    src: Bags3,
    label: 'Bags'
  },
  {
    src: FootWare3,
    label: 'Footware'
  },
]

const BrowseKids = () => {
  return (
    <Grid container spacing={4} >
      {images.map((image, index) => {
        return (
          <Grid item xs={6} sm={3} key={index}>
            <ItemCard imageSrc={image.src} label={image.label} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default BrowseKids