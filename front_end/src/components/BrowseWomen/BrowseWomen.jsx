import { Grid } from '@mui/material'
import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import Clothes2 from '../../assets/clothes2.jpg';
import Accessories2 from '../../assets/accessories2.jpg';
import Bags2 from '../../assets/bags2.jpg';
import FootWare2 from '../../assets/footware2.jpg';

const images = [
  {
    src: Clothes2,
    label: 'Clothes'
  },
  {
    src: Accessories2,
    label: 'Accessories'
  },
  {
    src: Bags2,
    label: 'Bags'
  },
  {
    src: FootWare2,
    label: 'Footware'
  },
]

const BrowseWoman = () => {
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

export default BrowseWoman