import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Container, Box, Stack, Grid } from '@mui/material';
import SelectList from '../components/SelectList/SelectList';
import Pagination from '../components/Pagination/Pagination';
import { useStore } from '../stores/Store';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import SelectSubCategory from '../components/SelectSubCategory/SelectSubCategory';
import FilterAndSort from '../components/FilterAndSort/FilterAndSort';



const BrowseWithFilter = observer((props) => {
  const { productStore, categoryStore } = useStore();
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [sortingCriteria, setSortingCriteria] = useState('');
  const params = useParams()
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    productStore.setSex(params.sex);
    params.category && productStore.setCategory(params.category.charAt(0).toUpperCase() + params.category.slice(1));
    categoryStore.get({ id: parseInt(params.categoryId) })
    productStore.getProductSizes(parseInt(params.categoryId), parseInt(params.subCategoryId))
  }, [params, productStore, categoryStore]);

  const handleSelectSubcategory = (subCategoryId) => {
    productStore.getProductsBySubcategory(subCategoryId);
    setActiveSubCategory(subCategoryId);
    navigate(`/browse/${params.sex}/${params.category}/${params.categoryId}/${subCategoryId}`);
  };

  const handleSizeChange = (selectedSizes) => {
    // Update the selected sizes in the productStore
    productStore.setSelectedSizes(selectedSizes);
    // Trigger the update of fetched products by calling productStore.getMany()
    productStore.getMany();
  };

  const handleColorChange = (selectedImageColors) => {
    // Update the selected sizes in the productStore
    productStore.setSelectedImageColors(selectedImageColors);
    // Trigger the update of fetched products by calling productStore.getMany()
    productStore.getMany();
  };

  const handleSortingChange = (newSortingCriteria) => {

    if (newSortingCriteria === 'Price(low to high)') {
      // Sort products from low to high
      productStore.fetchedProduct.sort((a, b) => a.price - b.price);
    } else if (newSortingCriteria === 'Price(high to low)') {
      // Sort products from high to low
      productStore.fetchedProduct.sort((a, b) => b.price - a.price);
    }
    setSortingCriteria(newSortingCriteria);
  };

  return (
    <Box my={4}>
      <Stack direction={'column'} >
        {/* <Container maxWidth={'xxl'}> */}
        <Stack direction={'row'} spacing={3}>
          <SelectSubCategory onSelectSubCategory={handleSelectSubcategory} activeSubCategory={activeSubCategory} />
        </Stack>
        <Stack direction={'column'}>
          <Stack direction={'row'} justifyContent={'flex-end'}>
            {/* <Pagination /> */}
            <FilterAndSort
              onSortingChange={handleSortingChange}
              sizes={productStore.fetchedSizes}
              onSizeChange={handleSizeChange}
              colors={productStore.fetchedImageColors}
            />
          </Stack>
          <Grid
            container
            direction="row"
            justifyContent="start"
            spacing={1}
            my={1}
          >
            {productStore.fetchedProduct.map((product, index) => {
              // console.log(productStore.fetchedProduct)
              return (
                <Grid
                  item
                  key={index}
                  xs={6}
                  sm={4}
                  md={3}
                >
                  <ProductCard
                    id={product.id}
                    imageSrc={product.images} // Pass the images array
                    labelBrand={product.brand.name}
                    labelName={product.name}
                    labelPrice={product.price}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Stack>
      {/* </Container> */}
    </Box >
  );
});

export default BrowseWithFilter;