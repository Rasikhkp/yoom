"use client";

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const { user, isLoading } = useKindeBrowserClient();

    useEffect(() => {
        if (!user) return;
        if (!apiKey) throw new Error("Stream API key is missing");

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user.id,
                name: `${user.given_name} ${user.family_name}` || undefined,
                image: user.picture || undefined,
            },
            tokenProvider,
        });

        setVideoClient(client);
    }, [user, isLoading]);

    if (!videoClient) return <Loader />;

    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;
