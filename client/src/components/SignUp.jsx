import React, { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link as RLink } from "react-router-dom";
import config from "../config/config";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function SignUp() {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const { url } = config;
  const [data, setData] = useState(initialData);
  const [emailValid, setEmailValid] = useState(false);
  const [passValidate, setPassValidate] = useState(true);
  const navigate = useNavigate();
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
});


const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setEmailValid(emailRegex.test(email));
};

  const validatePassword = (password) => {
    const validations = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setValidation(validations);
};

useEffect(() => {
  const allValid = Object.values(validation).every(Boolean);
  setPassValidate(!(emailValid && allValid))
}, [emailValid,validation])


  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "email"){
      validateEmail(value)
    }
    else if (name === "password") {
      validatePassword(value);
    }
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${url}signup`, {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      });
      if (response.status < 300 && response.status >= 200) {
        toast.success("Signup successful");
        navigate("/v1/signin");
      }
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://picsum.photos/1600/900)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={data.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={data.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  <p style={{ color: emailValid ? 'green' : 'red' }}>
                    Email must be in a valid format (example@domain.com)
                </p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  <p>Password must have:</p>
                  <ul>
                    <li style={{ color: validation.length ? "green" : "red" }}>
                      At least 8 characters
                    </li>
                    <li
                      style={{ color: validation.uppercase ? "green" : "red" }}
                    >
                      At least one uppercase letter
                    </li>
                    <li style={{ color: validation.number ? "green" : "red" }}>
                      At least one number
                    </li>
                    <li
                      style={{
                        color: validation.specialChar ? "green" : "red",
                      }}
                    >
                      At least one special character
                    </li>
                  </ul>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={
                  passValidate
                }
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RLink to="/v1/signin" variant="body2">
                    Already have an account? Sign in
                  </RLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
