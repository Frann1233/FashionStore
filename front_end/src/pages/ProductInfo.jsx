import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useStore } from '../stores/Store';
import { Box, Container, Stack } from '@mui/material';

import ImageGrid from '../components/ProductInfoImageGrid/ImageGrid';
import ProductDescription from '../components/ProductInfoDescription/ProductDescription';
import ProductDescriptionDrawer from '../components/ProductInfoDescription/ProductDescriptionDrawer';
import SimilarProducts from '../components/SimilarProducts/SimilarProducts';

const ProductInfo = observer(() => {
  const { productStore } = useStore();
  const params = useParams();

  const { name, description, price, brand, category, size, color, sex, type, images, material, id } = productStore;

  const [selectedColor, setSelectedColor] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');
  const [drawerTitle, setDrawerTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await productStore.get({ productId: params.productId });
      await productStore.getSimilarProducts(params.productId);
    };
    fetchData();
  }, [params.productId, productStore]);

  // console.log(productStore.images)

  const handleDrawerOpen = (content, title) => {
    setDrawerContent(content);
    setDrawerTitle(title);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Box my={4}>
        <Container maxWidth={'xxl'}>
          <Stack direction={'row'} justifyContent={'space-between'}  >
            <Stack>
              <ImageGrid
                images={productStore.images.filter(item => selectedColor ? item.color.name === selectedColor : true).map(item => item.url)} />
            </Stack>
            <Stack  >
              <ProductDescription
                id={params.productId}
                color={color}
                description={description}
                material={material}
                name={name} price={price}
                size={size} imageSrc={images}
                handleDrawerOpen={handleDrawerOpen}
                images={images}
                selectedColor={selectedColor} // Pass selected color to ProductDescription
                onColorSelect={setSelectedColor} //
              />
            </Stack>
          </Stack>
          <Stack marginTop={10}>
            <SimilarProducts similarProducts={productStore.similarProducts} />
          </Stack>
        </Container>
      </Box >

      <ProductDescriptionDrawer
        drawerContent={drawerContent}
        drawerTitle={drawerTitle}
        handleDrawerClose={handleDrawerClose}
        isDrawerOpen={isDrawerOpen} />
    </>
  );
});

export default ProductInfo;

