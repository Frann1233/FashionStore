import { Button } from '@mui/material'
import React from 'react'

/**
 * 
 * @param {import('@mui/material').ButtonProps} props 
 * @returns 
 */
const FooterButton = ({ children, ...props }) => {
  return (
    <Button variant='text' size='small' color='secondary' {...props}>{children}</Button>
  )
}

export default FooterButton