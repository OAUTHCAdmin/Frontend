import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Forgot Password",
    description: "Forgot Password Page OAUTHCAdmin",
}
export default function ForgotPassword () {
    return <ForgotPasswordForm />;
}