import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import AuthenticationService from "../../services/authenticationService";

interface Props {
  setIsAuthenticated: Function;
}

const Login = ({ setIsAuthenticated }: Props) => {
  const [error, setError] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    login: yup
      .string()
      .required("obligatoire")
      .test("3len", "au moins 3 caractères", (val: string) => val.length >= 3),
    password: yup
      .string()
      .required("obligatoire")
      .test("3len", "au moins 3 caractères", (val: string) => val.length >= 3),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AuthenticationService.login(values.login, values.password).then((ok) => {
        setIsAuthenticated(ok);
        setError(!ok);
      });
    },
  });

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
      m="20px"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="login"
            name="login"
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box display={"flex"} justifyContent="center" m="20px">
          <Button type="submit" variant="contained" sx={{ pl: "20px" }}>
            Connexion
          </Button>
        </Box>
        <Box display={"flex"} justifyContent="center" color={red}>
          {error ? "connexion impossible" : ""}
        </Box>
      </form>
    </Box>
  );
};

export default Login;
