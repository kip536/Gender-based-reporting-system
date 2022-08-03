import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

export const AddUser = (props) => {
  
  const [userdetails, setUserdetails] = useState(null)


  

  const handleChange = (event) => {
    event.preventDefault()
    const value = event.target.value
    
    setUserdetails({
      ...userdetails,
      [event.target.name]: value
    });
    
  };

  // const onSubmit = (e) => {
  //   e.preventDefault()

  //   console.log(userdetails)

  //   // if (!userdetails) {
  //   //   alert('Please fill in all fields')
  //   //   return
  //   // }

  //   adduser();

  //   setUserdetails(null);
  // }

  const handleadduser = async (e) => {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: new Headers({ "content-type": "application/json" }),
      mode: "no-cors",
      body: JSON.stringify(userdetails),
    }
    await fetch('https://localhost/fgm/register.php', options)
    // .then(
    //   response => response.json(),
  
    //   error => console.log('An error occurred.', error)
    // )
    

    // setUserdetails(null)

  
  }



  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Add User"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                // helperText="Please specify the first name"
                label="Name"
                name="name"
                onChange={handleChange}
                required
                // value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                // value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                // value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                // value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select location"
                name="location"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                // value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            onClick={handleadduser}
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};