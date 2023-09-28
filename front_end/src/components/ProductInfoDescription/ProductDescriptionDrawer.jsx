import { Box, Drawer, Typography } from '@mui/material'
import React from 'react'

const ProductDescriptionDrawer = ({
  isDrawerOpen,
  handleDrawerClose,
  drawerTitle,
  drawerContent
}) => {
  return (
    <Drawer Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose} >
      <Box p={4}>
        <Typography variant="h4">{drawerTitle}</Typography>
        <Typography variant="body1">{drawerContent}</Typography>
      </Box>
    </Drawer>
  )
}

export default ProductDescriptionDrawer