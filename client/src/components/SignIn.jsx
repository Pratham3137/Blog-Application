import React, { useState } from "react";
import { useAuth } from "./Store/auth";
import axios from "axios";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  LockOutlinedIcon,
  Typography,
  createTheme,
  ThemeProvider,
} from "./Store/material";
import { useNavigate, Link as RLink } from "react-router-dom";
import { toast } from "react-toastify";

const fieldConfigs = [
  {
    id: "email",
    label: "Email Address",
    name: "email",
    type: "email",
    autoComplete: "email",
  },
  {
    id: "password",
    label: "Password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
  },
];

const defaultTheme = createTheme();

export default function SignInSide() {
  const initialData = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const { storeUserDataInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/v1/login", {
        email: data.email,
        password: data.password,
      });
      console.log("🚀 ~ handleSubmit ~ response:", response.data.message);
      const userData = await response.data;

      if (response.statusText === "OK") {
        toast.success("Login Successful...");
        console.log("Token :::::>>>>>>", userData.token);
        storeUserDataInLS(userData.token, userData.userId, userData.userName);
        navigate("/v1/dashboard");
        setData(initialData);
      }
    } catch (err) {
      toast.error(err.response.data.message);
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {fieldConfigs.map((field) => (
                <TextField
                  key={field.id}
                  margin="normal"
                  required
                  fullWidth
                  id={field.id}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  onChange={handleChange}
                />
              ))}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RLink to="/v1/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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
