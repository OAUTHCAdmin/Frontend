import { Metadata } from "next"
import ResetPasswordPage from "./body"


export const metadata: Metadata = {
    title: "Reset Password",
    description: "Reset your passweord",
}
export default function ResetPassword() {
    return <ResetPasswordPage />
}