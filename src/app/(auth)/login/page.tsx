import { Metadata } from "next";
import LoginPage from "./body";

export const metadata: Metadata = {
  title: "Login",
  description: "Welcome to OAUTHC Admin",
}
export default function Login() {
  return <LoginPage />
} 