import React from 'react'
import {  AppBar,Typography, Toolbar, Stack,Button, Grid, Box } from '@mui/material'



let textStyle={
  color:'secondary.light',
  fontSize:{xs:13,sm:18,md:18,lg:20}
}
let emailStyle={
  color:'secondary.light',
  fontSize:{xs:14,sm:14,md:18,lg:24}
}
const Footer = () => {
  return (
    <AppBar position="sticky" sx={{background:"linear-gradient(to bottom,#333333,#006666)",
    boxShadow:1,paddingX:{xs:1},paddingTop:{xs:10,md:16},paddingBottom:{xs:2,md:4}}}>
       <Toolbar sx={{display:'flex'}}>

         <Box width={1} >

           
              <Typography align='center' variant="h6" component='h1' sx={textStyle}>
              {"Copyright © "} Shanka Tech - Created by Shanka
              </Typography>
              <Typography align='center' variant="body1" sx={textStyle}>shamarl26leonard@gmail.com</Typography>
           

          
         </Box>
       
            
            
        
       
       </Toolbar>
       
   </AppBar>
  )
}

export default Footer