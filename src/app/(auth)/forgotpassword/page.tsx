import { Metadata } from "next";
import ForgotPasswordPage from "./body";


export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your passweord",
}
export default function ForgotPassword() {
  return <ForgotPasswordPage />
}
