import OutlinedButton from "@/components/buttons/outlined-button";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ChangeEvent, FormEvent, ReactNode, useContext, useEffect, useState } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import TournamentHistoryLi from "@/components/list items/tournament-history-li";
import GradientButton from "@/components/buttons/gradient-button";
import Link from "next/link";
import UserLi from "@/components/list items/user-li";
import { UserContext } from "@/context/user-context";
import { User } from "@/utils/types";
import { toast } from "react-toastify";
import Form from "@/components/forms/form";
import LabelInput from "@/components/forms/label-input";
import SquareInput from "@/components/forms/square-input";
import { useConnections, useConnectionsModify, useIncomingRequests, useRequestsResponse } from "@/services/connections-service";
import Modal from "@/components/misc/modal";

const Page = () => {
  const { user } = useContext(UserContext);

  const { connections, mutate: mutateConnections } = useConnections(user.id);
  const { incomingRequests, mutate: mutateIncoming } = useIncomingRequests(user.id);
  const { addConnection, deleteConnection } = useConnectionsModify(user.id);

  const [addConnectionsVisible, setAddConnectionsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const { acceptRequest, declineRequest } = useRequestsResponse(user.id);

  const accept = async (connection: User) => {
    const result = await acceptRequest(connection.id);
    console.log(result);
    mutateIncoming(incomingRequests?.filter(r => r.id !== connection.id));
    mutateConnections(connections?.concat(connection));
  }

  const decline = async (id: number) => {
    const result = await declineRequest(id);
    console.log(result);
    mutateIncoming(incomingRequests?.filter(r => r.id !== id));
  }

  const closeAddConnections = () => {
    setAddConnectionsVisible(false);
    setEmail('');
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(email);

    const result = await addConnection(email);
    console.log(result);

    if (result.status === true) {
      toast.success('Request sent successfully!');
      closeAddConnections();
    } else if (result.status === false) {
      toast.error(`Request failed: ${result.info}`);
    }
  }

  const handleChange = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    setEmail(value);
    console.log(email);
  }

  const deleteConnectionHandler = async (connection: User) => {
    const result = await deleteConnection(connection.id);
    console.log(result);
    
    mutateConnections(connections?.filter(c => c.id !== connection.id));
    toast.success(`Deleted connection: ${connection.firstName} ${connection.lastName}`)
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Connections</Title>
        <GradientButton type='light' attributes={{onClick: () => setAddConnectionsVisible(true)}}>Add connections</GradientButton>
      </div>
      <section>
        <Subtitle>Connection Requests</Subtitle>
        <ul className='flex flex-col gap-1'>
          {incomingRequests?.map((connection, i) => (
            <UserLi key={i} name={`${connection.firstName} ${connection.lastName}`}>
              <div className='flex gap-1'>
                <GradientButton attributes={{onClick: () => accept(connection)}} type='light'>Accept</GradientButton>
                <GradientButton attributes={{onClick: () => decline(connection.id)}} type='red'>Decline</GradientButton>
              </div>
            </UserLi>))}
        </ul>
      </section>
      <section>
        <Subtitle>Connections List</Subtitle>
        <ul className='flex flex-col gap-1'>
          {connections?.map((connection, i) => (
            <UserLi key={i} name={`${connection.firstName} ${connection.lastName}`}>
              <GradientButton attributes={{onClick: () => deleteConnectionHandler(connection)}} type='red'>Delete</GradientButton>
            </UserLi>
          ))}
        </ul>
      </section>
      <Modal title='Add Connections' isOpen={addConnectionsVisible} close={closeAddConnections}>
        <Form attributes={{onSubmit: handleSubmit}}>
          <SquareInput label='Enter below the email address of the connection' attributes={{name: 'email', placeholder: 'Email address', value: email, onChange: handleChange}} />
          <div className='flex gap-1'>
            <GradientButton type='light'>Connect</GradientButton>
          </div>
        </Form>
      </Modal>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;