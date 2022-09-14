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
    value: 'Nakuru',
    label: 'Nakuru'
  },
  {
    value: 'Nairobi',
    label: 'Nairobi'
  },
  {
    value: 'Kisumu',
    label: 'Kisumu'
  },
  {
    value: 'Mombasa',
    label: 'Mombasa'
  },
  {
    value: 'Eldoret',
    label: 'Eldoret'
  }
];

const usertype = [
  {
    value: 0,
    label: 'Super Admin'
  },
  {
    value: 1,
    label: 'Admin'
  },
  {
    value: 2,
    label: 'Normal User'
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
    await fetch('http://localhost/fgm/register.php', options)
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
                required
                fullWidth
                // helperText="Please specify the first name"
                label="Username"
                name="username"
                onChange={handleChange}
                
                // value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              
              <TextField
                required
                fullWidth
                onChange={handleChange}
                // helperText="Please specify the first name"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              
              <TextField
                required
                fullWidth
                // helperText="Please specify the first name"
                label="Name"
                name="name"
                onChange={handleChange}
                
                // value={values.firstName}
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
                label="Select user"
                name="usertype"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                // value={values.state}
                variant="outlined"
              >
                {usertype.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    
                    {option.label}
                  </option>
                ))}
              </TextField>
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
                inputProps={{inputMode: 'numeric', Pattern: '[0-9]*'}}
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
                label="County"
                name="county"
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