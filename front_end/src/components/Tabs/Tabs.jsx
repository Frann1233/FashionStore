import { Box, Container, Tabs as MuiTabs, Tab } from '@mui/material'
import React, { useState } from 'react'
import TabPanel from './TabPanel';

const Tabs = ({ firstTab, secondTab, firstTabLabel, secondTabLabel, thirdTab, thirdTabLabel }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box width={'100%'} >
      <Container maxWidth={false} disableGutters>
        <Box borderBottom={1} borderColor={'divider'} justifyContent={'center'} display={'flex'} >
          <MuiTabs value={value} onChange={handleChange} aria-label="basic tabs example" >
            <Tab label={firstTabLabel} />
            <Tab label={secondTabLabel} />
            <Tab label={thirdTabLabel} />
          </MuiTabs>
        </Box>
        <TabPanel value={value} index={0}>
          {firstTab}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {secondTab}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {thirdTab}
        </TabPanel>
      </Container >
    </Box >
  )
}

export default Tabs