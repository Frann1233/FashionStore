import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import { Checkbox, Container, Stack, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useStore } from '../../stores/Store';
import { useNavigate } from 'react-router-dom';

const FilterAndSort = ({ onSortingChange, sizes, onSizeChange, colors }) => {
  const { productStore } = useStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortingCriteria, setSortingCriteria] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedImageColors, setSelectedImageColors] = useState([]);
  const navigate = useNavigate();


  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSortingChange = (event) => {
    const newSortingCriteria = event.target.value;
    setSortingCriteria(newSortingCriteria);
    onSortingChange(newSortingCriteria); // Notify the parent component of the sorting criteria change
  };

  const handleSizeChange = (size) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((selectedSize) => selectedSize !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updatedSizes);
    onSizeChange(updatedSizes);
  };

  const handleColorChange = (color) => {
    console.log('handleColorChange invoked'); // Add this line
    const updatedImageColors = selectedImageColors.includes(color)
      ? selectedImageColors.filter((selectedColor) => selectedColor !== color)
      : [...selectedImageColors, color];
    setSelectedImageColors(updatedImageColors);

    // Call getProductImageColors with the appropriate categoryId and subCategoryId
    productStore.getProductImageColors(6, 17); // Make sure to get categoryId and subCategoryId from your component's state or props
    console.log('selectedImageColors:', selectedImageColors);
    console.log('categoryId:', 6);
    console.log('subCategoryId:', 17)
  };





  const list = () => (

    <List sx={{
      minHeight: '100vh'
    }}>
      <Container  >
        <Box width={'550px'} padding={5} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

          <Stack direction={'column'} gap={5} flex={1}>

            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant='h4'>Filter & Sort</Typography>
              <Button onClick={closeDrawer}>
                <Typography variant='h4'>X</Typography>
              </Button>
            </Stack>

            <Stack direction={'column'} gap={1}>
              <Stack direction={'row'}>
                <Typography variant='body2' fontWeight={600}>Sort by</Typography>
              </Stack>

              <Stack direction={'row'}>
                <FormControl>
                  <RadioGroup value={sortingCriteria} onChange={handleSortingChange}>
                    <FormControlLabel value="Price(low to high)" control={<Radio />} label="Price (low to high)" />
                    <FormControlLabel value="Price(high to low)" control={<Radio />} label="Price (high to low)" />
                    <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Stack>

            <Stack direction={'column'} gap={2}>

              <Stack direction={'row'}>
                <Typography variant='body2' fontWeight={600}>Size</Typography>
              </Stack >

              <Stack direction={'row'} gap={1}>

                {sizes.map((size) => (
                  <Button
                    variant="outlined"
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    style={{ backgroundColor: selectedSizes.includes(size) ? 'lightblue' : 'white' }} // Highlight selected sizes
                  >
                    <Typography variant="subtitle2">{size}</Typography>
                  </Button>
                ))}

              </Stack>
            </Stack>

            <Stack direction={'column'} gap={2}>
              <Stack direction={'row'}>
                <Typography variant='body2' fontWeight={600}>Color</Typography>
              </Stack>
              <Stack direction={'row'} gap={1}>
                {/* {productStore.availableImageColors.map((color) => (
                  <Stack direction="column" alignItems="center" key={color}>
                    <Checkbox
                      checked={selectedImageColor === color}
                      onChange={() => handleColorChange(color)}
                      icon={<div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: color }} />}
                      checkedIcon={
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: color, position: 'relative' }}>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%' }} />
                        </div>
                      }
                      value={color}
                    />
                    <Typography variant="subtitle2">{color}</Typography>
                  </Stack>
                ))} */}

                {colors.map((color) => (
                  <Button
                    variant="outlined"
                    key={color}
                    onClick={() => handleColorChange(color)}
                    style={{ backgroundColor: selectedImageColors.includes(color) ? 'lightblue' : 'white' }}
                  >
                    <Typography variant="subtitle2">{color}</Typography>
                  </Button>
                ))}

              </Stack>
            </Stack>

          </Stack>

          <Stack direction="column" gap={2} alignItems="center" flex={0}>
            <Button variant="text">
              <Typography sx={{
                textDecoration: 'underline'
              }}>Clear filter</Typography>
            </Button>
            <Button variant='contained' sx={{
              width: '100%'
            }}>
              <Typography variant='h6'>Show article</Typography>
            </Button>
          </Stack>

        </Box>
      </Container>
    </List>

  );

  return (
    <div>
      <Button onClick={openDrawer}>Filter & Sort</Button>
      <Drawer
        anchor={'right'}
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        {list()}
      </Drawer>
    </div>
  );
}

export default FilterAndSort