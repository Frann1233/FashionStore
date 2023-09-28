import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';

const SimilarProducts = ({ similarProducts }) => {

  return (
    <Container maxWidth={'xxl'} disableGutters>
      <Box marginLeft={4}>
        <Typography variant="h2" fontWeight={500} gutterBottom>
          Similar Styles
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {similarProducts && similarProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            {/* <Typography variant="subtitle1">{product.name}</Typography> */}
            <ProductCard
              id={product.id}
              imageSrc={product.images}
              labelName={product.name}
              labelBrand={product.brand}
              labelPrice={product.price} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SimilarProducts;