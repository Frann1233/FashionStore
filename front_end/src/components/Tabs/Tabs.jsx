import { Box, Container, Tabs as MuiTabs, Tab } from '@mui/material'
import React from 'react'
import TabPanel from './TabPanel';

const Tabs = ({ tabs = [], tabIndex, setTabIndex }) => {

  return (
    <Box width={'100%'} >
      <Container maxWidth={false} disableGutters>
        <Box borderBottom={1} borderColor={'divider'} justifyContent={'center'} display={'flex'} >
          <MuiTabs value={tabIndex} onChange={setTabIndex} aria-label="basic tabs example" >
            {tabs.map(tab => {
              return <Tab label={tab.label} />
            })}
          </MuiTabs>
        </Box>

        {tabs.map((tab, index) => {
          return <TabPanel value={tabIndex} index={index}>
            {tab.element}
          </TabPanel>
        })}
      </Container >
    </Box >
  )
}

export default Tabs