import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import ItemCard from '../ItemCard/ItemCard'
import Link from '@mui/material/Link';
import { useStore } from '../../stores/Store';
import { observer } from 'mobx-react';

const BrowseGeneral = observer(({ tabIndex }) => {
  const { categoryStore } = useStore();
  const sex = tabIndex === 0 ? 'male' : tabIndex === 1 ? 'female' : 'kids';
  useEffect(() => {
    categoryStore.getMany();
  }, [categoryStore.fetchedCategory])

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      {categoryStore.fetchedCategory.map((category, index) => {
        const categoryId = category.id;
        const categoryName = category.name;
        const categoryImage = category.image;
        const categoryLink = `/browse/${sex}/${categoryName}/${categoryId}`;
        return (
          <div key={index} >
            <Link
              href={categoryLink}
              underline="none"
              color="inherit"
            >
              <ItemCard categoryId={categoryId} categoryName={categoryName} categoryImage={categoryImage} />
            </Link>
          </div>
        );
      })}
    </Box>
  );
});

export default BrowseGeneral;
