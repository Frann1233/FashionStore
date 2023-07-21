import { Grid } from '@mui/material'
import React from 'react'
import ItemCard from '../ItemCard/ItemCard'
import Clothes1 from '../../assets/clothes1.png';
import Accessories1 from '../../assets/accessories1.png';
import Bags1 from '../../assets/bags1.png';
import FootWare1 from '../../assets/footware1.png';
import Link from '@mui/material/Link';


const images = [
  {
    src: Clothes1,
    label: 'Clothes'
  },
  {
    src: Accessories1,
    label: 'Accessories'
  },
  {
    src: Bags1,
    label: 'Bags'
  },
  {
    src: FootWare1,
    label: 'Footware'
  },
]

const itemLinks = [
  '/browseMenClothes',
  '/browseMenAccesories',
  '/bags',
  '/footwear',
]

const BrowseMen = () => {
  return (
    <Grid container spacing={4}>
      {images.map((image, index) => {
        // const linkTarget = itemLinks[index];
        console.log(images);

        return (
          <Grid item xs={6} sm={3} key={index} >
            {images ? (
              <Link href={itemLinks[index]} underline="none" color="inherit">
                <ItemCard imageSrc={image.src} labelName={image.label} />
              </Link>
            ) : (
              <ItemCard imageSrc={image.src} labelName={image.label} />
            )}
          </Grid>
        );
      })}
    </Grid>
  )
}

export default BrowseMen