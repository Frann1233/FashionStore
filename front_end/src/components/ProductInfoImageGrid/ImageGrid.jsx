import { Grid, Stack } from '@mui/material';
import React, { useEffect } from 'react';

const ImageGrid = ({ images }) => {

  return (
    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} width={'60vw'}>
      <Stack direction={'column'}>
        <Grid container spacing={0.5}>
          {images && images.map((imageUrl, index) => (
            <Grid
              item
              xs={6}
              key={index}
            >
              <img src={imageUrl} alt={`Product ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => console.error("Error loading image:", e.target.src)} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default ImageGrid;