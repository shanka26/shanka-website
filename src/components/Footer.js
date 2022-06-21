import React from 'react'
import {  AppBar,Typography, Toolbar, Stack,Button, Grid } from '@mui/material'

const Footer = () => {
  return (
    <AppBar position="sticky" sx={{backgroundColor:'primary.dark',boxShadow:0,padding:0}}>
       <Toolbar sx={{display:'flex'}}>

         <Grid container>

           <Grid item xs={4}>
              <Typography variant="h5" fontSize={{xs:48,md:60}}>Footer</Typography>
           </Grid>

          
         </Grid>
       
            
            
        
       
       </Toolbar>
       
   </AppBar>
  )
}

export default Footer