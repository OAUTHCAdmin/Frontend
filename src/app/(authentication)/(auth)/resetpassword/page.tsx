import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Reset Password Page OAUTHCAdmin",
}
export default function ResetPassword () {
    return <ResetPasswordForm />;
}