import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

const states = [
  {
    value: 0,
    label: "SuperAdmin",
  },
  {
    value: 1,
    label: "Admin",
  },
  {
    value: 2,
    label: "Normal user",
  },
];

export const UpdateUserForm = (props) => {
  const urllocation = useLocation();
  const path = urllocation.pathname.split("/")[2];
  const url = `https://localhost/users/${path}`;

  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState([]);
  const [usertype, setUsertype] = useState("");
  const [user, setUser] = useState({});

  const fetchUsers = async () => {
    let id = { user_id: path };
    console.log(id);
    const res = await axios.post("http://localhost/fgm/viewoneuser.php", id);
    const data = res.data

    setUser(data);
    setName(data.map((res)=> res.name));
    setPassword(data.map((res)=> res.password));
    setLocation(data.map((res)=> res.location));
    setPhone(data.map((res)=> res.phone_no));
    setEmail(data.map((res)=> res.email));
    setUsertype(data.map((res)=> res.user_type));
  };

  useEffect(() => {
    fetchUsers();
    console.log(user);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost/updateuser.php", {
      user_id: path,
      user_name: name,
      email: email,
      phone: phone,
      Password: password,
      location: location,
      usertype: usertype,
    });
    setUserInfo(res.data.result);
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the full name"
                label="Full name"
                name="Fullname"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="User Password"
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                onChange={(e) => setUsertype(e.target.name)}
                name="usertype"
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={user.user_type}>
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
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleUpdate}
          >
            Update User
          </Button>
        </Box>
      </Card>
    </form>
  );
};