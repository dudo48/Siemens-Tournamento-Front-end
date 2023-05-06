import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode, useContext, useEffect, useState } from "react";
import ListItem from "@/components/list items/list-item";
import { Bs1CircleFill, Bs2Circle, Bs2CircleFill, Bs3Circle, Bs3CircleFill, BsFillStarFill, BsHandThumbsDown, BsHeartbreak, BsStar, BsTrophy } from "react-icons/bs";
import Subtitle from "@/components/misc/subtitle";
import TournamentLi from "@/components/list items/tournament-li";
import GradientButton from "@/components/buttons/gradient-button";
import { Sport, User } from "@/utils/types";
import UserLi from "@/components/list items/user-li";
import { UserContext } from "@/context/user-context";
import { useIncomingRequests, useRequestsResponse } from "@/services/connections-service";

const Page = () => {
  const { user } = useContext(UserContext);
  const { incomingRequests, mutate } = useIncomingRequests(user.id);
  const { acceptRequest, declineRequest } = useRequestsResponse(user.id);

  const accept = async (id: number) => {
    const result = await acceptRequest(id);
    console.log(result);
    mutate();
  }

  const decline = async (id: number) => {
    const result = await declineRequest(id);
    console.log(result);
    mutate();
  }

  return (
    <>
      <Title>Notifications</Title>
      <section>
        <Subtitle>Tournament Invitations</Subtitle>
        <ul>
          {/* <TournamentLi name='Egyptian PL' sport={Sport.Basketball}>
            <div className='flex gap-1'>
              <GradientButton type='light'>Accept</GradientButton>
              <GradientButton type='red'>Decline</GradientButton>
            </div>
          </TournamentLi> */}
        </ul>
      </section>
      <section>
        <Subtitle>Connection Requests</Subtitle>
        <ul>
          {incomingRequests?.map((connection, i) => (
            <UserLi key={i} name={`${connection.firstName} ${connection.lastName}`}>
              <div className='flex gap-1'>
                <GradientButton attributes={{onClick: () => accept(connection.id)}} type='light'>Accept</GradientButton>
                <GradientButton attributes={{onClick: () => decline(connection.id)}} type='red'>Decline</GradientButton>
              </div>
            </UserLi>))}
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;