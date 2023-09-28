import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, Typography, CardContent, useTheme, Stack } from '@mui/material';
import './ItemCard.css'; // Import the CSS file for your styles

const ItemCard = ({
  categoryId,
  categoryImage,
  categoryName,
  labelPrice = undefined,
  labelBrand = undefined
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imageWidth = isHovered ? '400px' : '150px';

  return (
    <Card elevation={3}>
      <CardActionArea
        sx={{ height: '100%' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          component="img"
          image={categoryImage ?? 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='}
          alt="green iguana"
          sx={{
            objectPosition: '50% 20%',
            height: theme.spacing(70),
            width: imageWidth,
            transition: 'width 0.3s ease-in-out',
          }}
        />
        <CardContent >
          {categoryName && (
            <Typography textAlign={(!labelBrand && !labelPrice) ? 'center' : 'start'} gutterBottom variant="h5">
              {categoryName}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;



