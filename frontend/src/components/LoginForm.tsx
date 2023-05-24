import React, { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useSignIn } from "react-auth-kit";

const LoginForm: React.FC = () => {
  const [error, setError] = useState("");
  const signIn = useSignIn();

  const onSubmit = async (values: { username: string; password: string }) => {
    setError("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        values
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { login: values.username },
      });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err instanceof Error) setError(err.message);

      console.error("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Box
      component="form"
      autoComplete="off"
      className="mt-5 mx-5"
      onSubmit={formik.handleSubmit}
    >
      {error && (
        <Alert className="mb-2" severity="error">
          {error}
        </Alert>
      )}
      <TextField
        id="username"
        label="Login"
        variant="standard"
        value={formik.values.username}
        onChange={formik.handleChange}
        fullWidth
        required
      />
      <TextField
        id="password"
        label="Hasło"
        variant="standard"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        fullWidth
        required
      />
      <Button
        variant="contained"
        className="mt-3 bg-lime-700 w-full"
        type="submit"
      >
        Zaloguj
      </Button>
    </Box>
  );
};

export default LoginForm;
