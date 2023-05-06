import IconButton from "@/components/buttons/icon-button";
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
import { useConnections, useConnectionsModify } from "@/services/connections-service";

const Page = () => {
  const { user } = useContext(UserContext);

  const { connections, mutate } = useConnections(user.id);
  const { addConnection, deleteConnection } = useConnectionsModify(user.id);

  const [addConnectionsVisible, setAddConnectionsVisible] = useState(false);
  const [email, setEmail] = useState('');

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
    } else {
      toast.error(`Request failed.`);
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
    
    mutate();
    toast.success(`Deleted connection: ${connection.firstName} ${connection.lastName}`)
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Connections</Title>
        <GradientButton type='light' attributes={{onClick: () => setAddConnectionsVisible(true)}}>Connect</GradientButton>
      </div>
      <section className={`${addConnectionsVisible ? 'block' : 'hidden'}`}>
        <Form attributes={{onSubmit: handleSubmit}}>
          <SquareInput label='Add connection using email address' attributes={{name: 'email', placeholder: 'Email address', value: email, onChange: handleChange}} />
          <div className='flex gap-2'>
            <GradientButton type='light'>Add</GradientButton>
            <GradientButton type='red' attributes={{onClick: closeAddConnections, type: 'button'}}>Cancel</GradientButton>
          </div>
        </Form>
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
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;