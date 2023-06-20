import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getUser } from "../store/auth.js";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const from = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "Post",
      body: JSON.stringify(from),
      headers: {
        "content-type": "application/json",
      },
    });
    const { token, user } = await res.json();
    if (res.ok) {
      Cookies.set("token", token);
      dispatch(getUser(user));
      navigate("/");
    }
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <RouterLink to="/register">
              <Link component="span" variant="body2">
                Dont have an account? Sign Up
              </Link>
            </RouterLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
