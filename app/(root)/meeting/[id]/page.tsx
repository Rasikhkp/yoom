import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        redirect("/api/auth/login?post_login_redirect_url=/meeting/" + id);
    }

    return <div>Meeting Room: #{id}</div>;
};

export default page;
