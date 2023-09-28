import React, { useEffect } from 'react'
import { Container, Box, Stack, Grid, Typography } from '@mui/material';
import { useStore } from '../../stores/Store';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import WestIcon from '@mui/icons-material/West';


const SelectCategory = observer(({ onSelectSubCategory, activeSubCategory }) => {
  const { categoryStore } = useStore();

  return (
    <Container maxWidth='sm'>
      <Stack direction={'column'} gap={2}>

        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={2}>
          <WestIcon sx={{
            fontSize: 40
          }} />
          <Typography variant='h3' >
            {categoryStore.name}
          </Typography>
        </Stack>
        <Stack direction={'row'} spacing={2} justifyContent={'center'}>

          {categoryStore.subCategories.map((subCategory, index) => (
            < Typography variant='body1'
              key={index}
              onClick={() => {
                onSelectSubCategory(subCategory.id)
              }}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline'
                },
                textDecoration: activeSubCategory === subCategory.id ? 'underline' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {subCategory.name}
            </ Typography>
          ))}

        </Stack>
      </Stack>
    </Container >
  )
})
export default SelectCategory