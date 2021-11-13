import * as yup from "yup";

export const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .typeError("Invalid User name")
    .required("User name is required"),
  password: yup
    .string()
    .typeError("Invalid password")
    .required("Password is required")
    .min(5, "Minimum length 5 characters"),
});
