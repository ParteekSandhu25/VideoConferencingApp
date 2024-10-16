"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";
import Loader from "./Loader";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const router = useRouter();

  const { toast } = useToast();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetail, setCallDetail] = useState<Call>();
  const [isLoading, setIsLoading] = useState(false);

  // const createMeeting = async () => {
  //   if (!client || !user) {
  //     return;
  //   }

  //   try {
  //     const id = crypto.randomUUID();
  //     const call = client.call("default", id);

  //     if (!call) throw new Error("Failed to Create Call");

  //     const startsAT =
  //       values.dateTime.toISOString() || new Date(Date.now()).toISOString();

  //     const description = values.description || "Instant Meeting";

  //     await call.getOrCreate({
  //       data: {
  //         starts_at: startsAt,
  //         custom: {
  //           description,
  //         },
  //       },
  //     });

  //     setCallDetails(call);
  //     if (!values.description) {
  //       router.push(`/meeting/${call.id}`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      setIsLoading(true);
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }

      console.log("Hello");

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      console.log("Hello2");
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      console.log("Hello3");
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </div>
  );
};

export default MeetingTypeList;
