import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        redirect("/api/auth/login?post_login_redirect_url=/previous");
    }

    return (
        <section className="flex size-full flex-col gap-10 text-white">
            <h1 className="teext-3xl font-bold">Previous</h1>
        </section>
    );
};

export default page;
