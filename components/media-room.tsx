"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { currentProfile } from "@/lib/current-profile";
import { Loader2 } from "lucide-react";
import { Profile } from "@prisma/client";

interface MediaRoomProps {
  profile: Profile;
  chatId: string;
  video: boolean;
  audio: boolean;
};

export const MediaRoom = ({
  profile,
  chatId,
  video,
  audio
}: MediaRoomProps) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!profile) return;

    const name = `${profile?.name}`;

    (async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })()
  }, [profile, profile?.name, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2
          className="h-7 w-7 text-dmlinks animate-spin my-4"
        />
      </div>
    )
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}