import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowRightAltSharpIcon from '@mui/icons-material/ArrowRightAltSharp';
import { SnackbarProvider, useSnackbar } from 'notistack';


import { useStore } from '../../stores/Store';
import { observer } from 'mobx-react';
import { useTheme } from '@mui/material';


const ProductDescription = ({ id, price, color, size, description, material, name, image, handleDrawerOpen, images, selectedColor, onColorSelect }) => {
  const { cartStore } = useStore()
  const [isFixed, setIsFixed] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme()


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleColorSelect = (colorName) => {
    onColorSelect(colorName); // Update selected color using the callback
  };

  const uniqueColors = Array.from(new Set(images.map(imageItem => imageItem.color.name)));

  useEffect(() => {
    if (uniqueColors.length > 0 && selectedColor === null) {
      onColorSelect(uniqueColors[0]); // Automatically select the first color
    }
  }, [uniqueColors]);

  const getBackgroundImageForColor = (colorName) => {
    const matchingImage = images.find(imageItem => imageItem.color.name === colorName);
    return matchingImage ? `url(${matchingImage.url})` : 'none';
  }



  const handleScroll = () => {
    const scrollThresHold = 0;
    setIsFixed(window.scrollY > scrollThresHold);
  }

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleWarrning = () => {
    enqueueSnackbar((
      <Typography variant='body2'>
        Plese select color and size!
      </Typography>
    ), {
      variant: 'error'
    })
  }

  const handleSuccess = () => {

    enqueueSnackbar((
      <Typography variant='body2'>
        Added to cart: {name}
      </Typography>
    ), {
      variant: 'success'
    })
  }

  const handleCart = () => {
    if (selectedSize && selectedColor) {
      // Find the matching image for the selected color
      const matchingImage = images.find(imageItem => imageItem.color.name === selectedColor);

      if (matchingImage) {
        cartStore.addItem({
          id,
          name,
          price,
          size: selectedSize,
          color: selectedColor,
          images: [matchingImage.url], // Include the URL of the first image
        });

        cartStore.openCart();
        handleSuccess();
      } else {
        // Handle the case where no matching image is found
        handleWarrning();
      }
    } else {
      handleWarrning();
    }
    console.log(id)
  }



  return (
    <Stack gap={'1rem'} position={'sticky'} top={'5%'} sx={{
      transform: 'translateY(-50%)',
      transform: 'translatex(-50%)',
    }}>
      <Typography variant='h4' fontWeight={600}>{name}</Typography>
      <Typography variant='h4' fontWeight={500}>{price}$</Typography>
      <Box marginTop={'1rem'}>
        <Typography variant='subtitle1'>
          <span style={{ fontWeight: 'normal' }}>Color:</span> <span style={{ fontWeight: 'bold' }}>{selectedColor || "Select a color"}</span>
          <Stack direction={'row'} gap={2}>
            {uniqueColors.map((colorName, index) => {
              const isSelected = selectedColor === colorName;
              return (
                <Paper
                  key={index}
                  elevation={isSelected ? 5 : 3}
                  onClick={() => handleColorSelect(colorName)}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1rem',
                    cursor: 'pointer',
                    border: isSelected ? '3px solid black' : 'none',
                    backgroundImage: getBackgroundImageForColor(colorName),
                    backgroundSize: 'cover'
                  }}
                />
              );
            })}
          </Stack>
        </Typography>
      </Box>
      <Box sx={{ minWidth: 120 }} marginTop={theme.spacing(2)}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Size"
            sx={{ height: '3rem', borderRadius: theme.shape.borderRadius }}
            value={selectedSize}
            onChange={handleSizeChange}
          >
            {size && size.map((size, index) => {
              return (
                <MenuItem key={index} value={size.name}>{size?.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>
      <Button
        variant='contained'
        style={{ height: '3rem', borderRadius: '1rem' }}
        onClick={() => {
          handleCart();
        }}
      >
        <Typography variant='h6'>Add to cart</Typography>
      </Button>
      <Stack spacing={1} alignItems={'flex-start'}>
        <Typography marginLeft={1} marginBottom={4} variant='subtitle1'>Delivery time: 4-11 days</Typography>
        <Button variant="text" onClick={() => handleDrawerOpen(description, 'Product Description')}>
          <Typography variant='h6' fontWeight={800} > Product Description </Typography> <ArrowRightAltSharpIcon />
        </Button>
        <Button variant="text" onClick={() => handleDrawerOpen(material?.name, 'Material Info')}>
          <Typography variant='h6' fontWeight={800}> Material Info </Typography> <ArrowRightAltSharpIcon />
        </Button>
      </Stack>
    </Stack>
  )
}

export default observer(ProductDescription)