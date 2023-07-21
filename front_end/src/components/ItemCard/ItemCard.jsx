import React from 'react'
import { Card, CardActionArea, CardMedia, Typography, CardContent, useTheme } from '@mui/material'

const ItemCard = ({
  imageSrc,
  labelName = undefined,
  labelPrice = undefined,
  labelBrand = undefined
}) => {
  const theme = useTheme();

  return (
    <Card elevation={3}>
      <CardActionArea sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          image={imageSrc}
          alt="green iguana"
          sx={{
            objectPosition: '50% 20%',
            height: theme.spacing(40),
            [theme.breakpoints.down('md')]: {
              height: theme.spacing(28),
            },
            [theme.breakpoints.down('sm')]: {
              height: theme.spacing(16),
            },
          }}
        />
        <CardContent>
          {labelBrand &&
            <Typography textAlign={'start'} gutterBottom variant="overline" color={'GrayText'} >
              {labelBrand}
            </Typography>
          }
          {labelName && <Typography textAlign={(!labelBrand && !labelPrice) ? 'center' : 'start'} gutterBottom variant="h5" >
            {labelName}
          </Typography>
          }
          {labelPrice &&
            <Typography textAlign={'start'} gutterBottom variant="subtitle1" color={'GrayText'} >
              {labelPrice}$
            </Typography>
          }
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ItemCard