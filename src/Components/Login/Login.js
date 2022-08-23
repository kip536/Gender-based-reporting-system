import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { LoginCall } from "./LoginCall";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


function Login() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const { dispatch, error, isFetching, user } = useContext(AuthContext);

  const LoginUser = (e) => {
    e.preventDefault();
    LoginCall({ name, password }, dispatch);
  };

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            User Sign in
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>


          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your name"
              name="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={LoginUser}
            >
              Sign In
            </Button>
            {error && (
              <span style={{ color: "red", fontSize: "12px" }}>
                *Invalid username or password
              </span>
            )}
          
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
             
            </Grid>
               
            

          </Box>
   
       
     
      </Box>
      
    </Container>
  );
}


export default Login;
