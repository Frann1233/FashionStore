import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Container, Box, Stack, Grid, useTheme } from '@mui/material';
import SelectList from '../components/SelectList/SelectList';
import Pagination from '../components/Pagination/Pagination';
import ItemCard from '../components/ItemCard/ItemCard';
import Clothes1 from '../assets/clothes1.png';
import Accessories1 from '../assets/accessories1.png';
import Bags1 from '../assets/bags1.png';
import FootWare1 from '../assets/footware1.png';
import { useStore } from '../stores/Store'; // Import the useStore hook from StoreProvider

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
];

const BrowseMenAccessories = observer(() => {
  const theme = useTheme();
  const { productStore, categoryStore, brandStore, sizeStore } = useStore(); // Access the ProductStore from the store context

  useEffect(() => {
    productStore.getMany(); // Fetch the products when the component mounts
  }, []);

  return (
    <Box my={4}>
      <Container maxWidth={'xxl'}>
        <Stack direction={'row'} >
          <Stack direction={'column'} spacing={3}>
            <SelectList
              subheader={'Category'}
              fetchItems={() => categoryStore.getMany()}
              items={categoryStore.fetchedCategoryAsStringArray}
            />
            <SelectList
              subheader={'Brand'}
              fetchItems={() => brandStore.getMany()}
              items={brandStore.fetchedBrandAsStringArray}
            />
            <SelectList
              subheader={'Size'}
              fetchItems={() => sizeStore.getMany()}
              items={sizeStore.fetchedSizeAsStringArray} />
          </Stack>
          <Container maxWidth='lg'>
            <Stack direction={'column'}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Pagination />
              </Stack>
              <Grid
                container
                direction="row"
                justifyContent="start"
                spacing={3}
                my={1}
              >
                {productStore.fetchedProduct.map((product, index) => (
                  <Grid
                    item
                    key={index}
                    xs={6}
                    sm={4}
                    md={3}
                  >
                    <ItemCard
                      labelBrand={product.brand.name}
                      labelName={product.name}
                      labelPrice={product.price}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Container>
        </Stack>
      </Container>
    </Box>
  );
});

export default BrowseMenAccessories;


