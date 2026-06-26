import VerifyEmail from "@/app/components/auth/verify-email";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify Email | Ammad Waseem",
};

const VerifyEmailPage = () => {
    return (
        <VerifyEmail />
    );
};

export default VerifyEmailPage;
