import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TotalCases = (props) => {

  const [totalCases, setTotalCase] = useState([]);


  const fetchtotalcases = () => {
    axios.get('http://localhost/fgm/totalcases.php')
    .then((response)=> {
      const data = response.data
      setTotalCase(data);
      console.log(data)
    })
  }

  useEffect(() => {
    fetchtotalcases();

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
            Total Cases
          </Typography>
          {totalCases.map((res) => (
            <Typography
            color="textPrimary"
            variant="h4"
            key={res.total}
          >
            {res.total}
          </Typography>
          ))}
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          16%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
  )
};

export default TotalCases