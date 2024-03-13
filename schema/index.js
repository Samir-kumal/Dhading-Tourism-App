import * as yup from "yup";

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .required("Username is Required"),
  password: yup.string().required("Password is required"),
});
export const signupSchema = yup.object().shape({
  name: yup.string().min(5).required("Required"),

  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is Required"),
  password: yup.string().min(5).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});
export const forgotSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is Required"),
});
