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
import connectionsService from "@/services/connections-service";

const Page = () => {
  const { user } = useContext(UserContext);
  const [connectionRequests, setConnectionRequests] = useState<User[]>([]);

  useEffect(() => {
    const getConnectionRequests = async () => {
      const result = await connectionsService.getAllIncoming(user.id);
      setConnectionRequests(result);
      console.log(result);
    }

    getConnectionRequests();
  }, [user]);

  const acceptRequest = async (id: number) => {
    const result = await connectionsService.acceptRequest(id, user.id);
    console.log(result);

    const newConnectionRequests = connectionRequests.filter(r => r.id !== id);
    setConnectionRequests(newConnectionRequests);
  }

  const declineRequest = async (id: number) => {
    const result = await connectionsService.declineRequest(id, user.id);
    console.log(result);

    const newConnectionRequests = connectionRequests.filter(r => r.id !== id);
    setConnectionRequests(newConnectionRequests);
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
          {connectionRequests.map((connection, i) => (
            <UserLi key={i} name={`${connection.firstName} ${connection.lastName}`}>
              <div className='flex gap-1'>
                <GradientButton attributes={{onClick: () => acceptRequest(connection.id)}} type='light'>Accept</GradientButton>
                <GradientButton attributes={{onClick: () => declineRequest(connection.id)}} type='red'>Decline</GradientButton>
              </div>
            </UserLi>))}
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;