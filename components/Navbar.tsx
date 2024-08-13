import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CircleUser } from "lucide-react";
import {
    RegisterLink,
    LoginLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const user = await getUser();

    return (
        <nav className="flex justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    width={32}
                    height={32}
                    alt="Yoom logo"
                    className="max-sm:size-10"
                />
                <p className="text-[26px] font-extrabold text-white max-sm:hidden">
                    Yoom
                </p>
            </Link>

            <div className="flex gap-4">
                <div>
                    {isUserAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full relative overflow-hidden"
                                >
                                    {/* <CircleUser className="h-5 w-5" /> */}
                                    {user?.picture && (
                                        <Image
                                            src={user?.picture}
                                            alt={user.email || ""}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="bg-white"
                                align="end"
                            >
                                <DropdownMenuLabel>
                                    <p className="font-normal">
                                        {user?.given_name} {user?.family_name}
                                    </p>
                                    <p>{user?.email}</p>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogoutLink className="w-full">
                                        logout
                                    </LogoutLink>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button variant="default">
                                <LoginLink postLoginRedirectURL="/">
                                    Sign in
                                </LoginLink>
                            </Button>
                            <Button variant={"secondary"}>
                                <RegisterLink postLoginRedirectURL="/welcome">
                                    Sign up
                                </RegisterLink>
                            </Button>
                        </>
                    )}
                </div>
                <MobileNav />
            </div>
        </nav>
    );
};

export default Navbar;
