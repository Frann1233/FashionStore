import React from 'react'
import { Card, CardActionArea, CardMedia, Typography, CardContent, useTheme, Link, Box } from '@mui/material'

const ProductCard = ({
  id,
  imageSrc,
  labelName = undefined,
  labelPrice = undefined,
  labelBrand = undefined
}) => {
  const theme = useTheme();
  const firstImageUrl = imageSrc && imageSrc.length > 0 ? imageSrc[0].url : '';
  const customWidth = 'calc(25vw - 10px)';

  return (
    <Link href={`/productInfo/${id}`}>
      <Box sx={{
        maxWidth: '100vw'
      }}>
        <img src={firstImageUrl} alt="" style={{
          objectPosition: '50% 20%',
          height: '20%',
          width: customWidth,
          [theme.breakpoints.down('md')]: {
            height: theme.spacing(28),
          },
          [theme.breakpoints.down('sm')]: {
            height: theme.spacing(16),
          },
        }} />
        {/* <CardContent> */}
        {labelBrand &&
          <Typography textAlign={'start'} gutterBottom variant="overline" color={'GrayText'} >
            {labelBrand.name}
          </Typography>
        }
        {labelName && <Typography textAlign={(!labelBrand && !labelPrice) ? 'center' : 'start'} gutterBottom variant="body1" >
          {labelName}
        </Typography>
        }
        {labelPrice &&
          <Typography textAlign={'start'} gutterBottom variant="subtitle1" color={'GrayText'} >
            {labelPrice}$
          </Typography>
        }
      </Box>
    </Link >
  )
}

export default ProductCard