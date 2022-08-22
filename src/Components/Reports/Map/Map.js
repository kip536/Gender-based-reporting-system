import React from 'react';
import GoogleMapReact from 'google-map-react';
import { LocationOnSharp } from '@mui/icons-material';
import './Map.css';
import { Icon } from '@mui/material';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';


function Map({ location, zoomLevel }) {

    const LocationPin = ({text}) => {
      <div className='pin'>
        <Icon icon={LocationOnSharp} className='pin-icon'/>
        <p className='pin-text'>{text}</p>
      </div>
    }

  return (
    <Card>
      <div className='map'>

      <h1 className='map-h2'>Visual statistics</h1>
      <div className='google-map'>
        <GoogleMapReact
        bootstrapURLKeys={{key: ''}}
        defaultCenter={location}
        defaultZoom={zoomLevel}
        >
          <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
          />
        </GoogleMapReact>
      </div>
      </div>
    </Card>
    
  )
}

export default Map