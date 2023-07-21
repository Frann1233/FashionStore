import React from 'react'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import Footer from '../components/Footer/Footer'
import { Stack } from '@mui/material'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Stack
        direction='column'
        justifyContent='space-between'
        flexWrap='unset'
        minHeight={'100vh'}
      >
        <NavigationBar />
        <Stack direction='column' width='100%' height='100%' >
          {children}
        </Stack>
        <Footer />
      </Stack >
    </>
  )
}

export default DefaultLayout