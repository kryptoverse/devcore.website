import ResetPassword from "@/app/components/auth/reset-password";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password | DevCore",
};

const ResetPasswordPage = () => {
    return (
        <ResetPassword />
    );
};

export default ResetPasswordPage;
