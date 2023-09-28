import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, Container, Paper, Stack, Typography, useTheme } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { red } from '@mui/material/colors';



const AdminNavigationBar = () => {
  const theme = useTheme();
  // const styles = {
  //   borderRadius: '0',
  //   backgroundColor: theme.palette.
  // }


  const options = [
    {
      label: <Typography >Product</Typography>
    },
    {
      label: <Typography >Size</Typography>
    },
    {
      label: <Typography >Category</Typography>
    },
    {
      label: <Typography >Color</Typography>
    },
    {
      label: <Typography >Season</Typography>
    },
    {
      label: <Typography >Style</Typography>
    },
    {
      label: <Typography >Material</Typography>
    },
    {
      label: <Typography >Brand</Typography>
    },
    {
      label: <Typography >Type</Typography>
    },
  ];
  return (
    <Box bgcolor={theme.palette.primary.main} sx={{
      borderRadius: '0',
    }}>
      <List component="nav" aria-label="mailbox folders">
        <Stack alignItems={'center'}>
          <AdminPanelSettingsIcon fontSize='large' color='adminOrange' />
        </Stack>
        {options.map((options) => (
          <ListItem divider  >
            <ListItemText primary={options.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default AdminNavigationBar