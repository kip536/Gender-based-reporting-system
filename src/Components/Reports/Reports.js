import React, { useState } from 'react';
import Map from './Map/Map';
import Geocode from "react-geocode";
import GeneralReport from './GeneralReport/GeneralReport';
import { Box, Container, Grid } from '@mui/material';
import CasesTrend from '../Dashboard/CasesTrend';
import CasesCategories from '../Dashboard/CasesCategories';






function Reports() {

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("MYKEY");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latidude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  response => {
    const address = response.results[0].formatted_address;
    console.log(address);
  },
  error => {
    console.error(error);
  }
);

// Get latidude & longitude from address.
Geocode.fromAddress("chepterwai").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    setLat(lat);
    setLon(lng);
  },
  error => {
    console.error(error);
  }
);



const location = {
  address: 'chepterwai',
  lat: -0.281932,
  lng: 36.155892
  
}





  return (
    <div>
      <h2>Reports</h2>
      <Box
      component="main"
      sx={{
        float: 'right',
        flexGrow: 1,
        py: 8
      }}
      >
        <Container maxWidth={false}>
          <Grid
          container
          spacing={3}
          >
          <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <GeneralReport sx={{ height: '100%' }} />
            </Grid>
      <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <Map location={location} zoomLevel={17}/>
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <CasesTrend />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <CasesCategories sx={{ height: '100%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      
            
        
        
    </div>
  )
}

export default Reports