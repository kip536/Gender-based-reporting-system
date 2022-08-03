import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {useState, useEffect} from 'react';
import axios from 'axios';

const MostAffectedArea = (props) => {

  const [affectedarea, setAffectedarea] = useState([])

  // useEffect(() => {
  //   const getaffectedarea = async () => {
  //     const usersFromServer = await fetchaffectedarea()
  //     setAffectedarea(usersFromServer)
      
  //   }

  //   getaffectedarea()
  // }, []);


  //   const fetchaffectedarea = async () => {
  //     const result = await fetch('http://localhost/fgm/affectedArea.php');
  //     const data = await result.json()
  //     console.log('data recieved is:', data)

  //     return data
      
  //   }

  function getarea () {
    
    axios.get('http://localhost/fgm/affectedArea.php', {
      headers: {
        'Content-Type': 'application/json',
    }
    })
    .then ((response) => {
      const area = response.data;
      setAffectedarea(area)
      // console.log(area)
    })
    
    
  }

  useEffect(() => {
    getarea();
    
  }, []);



  return (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Most Affected Area
          </Typography>
          {affectedarea.map((res) => (
            <Typography
            color="textPrimary"
            variant="h4"
            key={res.num}
          >
            {res.case_area}
          </Typography>
          ))}
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {/* {affectedarea} */}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  )
};

export default MostAffectedArea