import GradientButton from "@/components/buttons/gradient-button";
import Form from "@/components/forms/form";
import SquareInput from "@/components/forms/square-input";
import UserLi from "@/components/list items/user-li";
import LoadingSpinner from "@/components/misc/loading-spinner";
import Modal from "@/components/misc/modal";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useConnections, useConnectionsModify, useIncomingRequests, useRequestsResponse } from "@/services/connections-service";
import { User } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InferType, object, string } from "yup";


const schema = object({
  email: string().email('Please enter a valid email address.').required('Please enter a valid email address.'),
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const { user } = useContext(UserContext);

  const { connections, mutate: mutateConnections, isLoading: connectionsLoading } = useConnections(user.id);
  const { incomingRequests, mutate: mutateIncoming } = useIncomingRequests(user.id);
  const { addConnection, deleteConnection } = useConnectionsModify(user.id);

  const [addConnectionsVisible, setAddConnectionsVisible] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({resolver: yupResolver(schema) });
  const { acceptRequest, declineRequest } = useRequestsResponse(user.id);

  const accept = async (connection: User) => {
    const result = await acceptRequest(connection.id);
    console.log(result);
    mutateIncoming(incomingRequests.filter(r => r.id !== connection.id));
    mutateConnections(connections.concat(connection));
  }

  const decline = async (id: number) => {
    const result = await declineRequest(id);
    console.log(result);
    mutateIncoming(incomingRequests.filter(r => r.id !== id));
  }

  const closeAddConnections = () => {
    setAddConnectionsVisible(false);
    reset();
  }

  const deleteConnectionHandler = async (connection: User) => {
    const result = await deleteConnection(connection.id);
    console.log(result);
    
    mutateConnections(connections.filter(c => c.id !== connection.id));
    toast.success(`Deleted connection: ${connection.firstName} ${connection.lastName}`)
  }
  
  const onSubmit = async (data: FormData) => {
    console.log(data);

    const result = await addConnection(data.email);
    console.log(result);

    if (result.status) {
      toast.success('Request sent successfully!');
      closeAddConnections();
    } else {
      toast.error(`Request failed: ${result.data.info}`);
    }
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Connections</Title>
        <GradientButton type='light' attributes={{onClick: () => setAddConnectionsVisible(true)}}>Add connections</GradientButton>
      </div>
      <section>
        <Subtitle>Connection Requests</Subtitle>
      {!incomingRequests.length ? <p>You don&apos;t have any requests.</p> :
        <ul className='flex flex-col gap-1'>
          {[...incomingRequests].reverse().map((connection, i) => (
            <UserLi id={connection.id} key={i} name={`${connection.firstName} ${connection.lastName}`}>
              <div className='flex gap-1'>
                <GradientButton attributes={{onClick: () => accept(connection)}} type='light'>Accept</GradientButton>
                <GradientButton attributes={{onClick: () => decline(connection.id)}} type='red'>Decline</GradientButton>
              </div>
            </UserLi>))}
        </ul>}
      </section>
      <section>
        <Subtitle>Connections List</Subtitle>
        {connectionsLoading ? <LoadingSpinner /> :
        !connections.length ? <><p>You don&apos;t have any connections. 😔</p><blockquote className='p-4'><q>Solitude is fine but you need someone to tell that solitude is fine.</q><p>― Honoré de Balzac</p></blockquote></> :
        <ul className='flex flex-col gap-1'>
          {[...connections].reverse().map((connection, i) => (
            <UserLi id={connection.id} key={i} name={`${connection.firstName} ${connection.lastName}`}>
              <GradientButton attributes={{onClick: () => deleteConnectionHandler(connection)}} type='red'>Delete</GradientButton>
            </UserLi>
          ))}
        </ul>}
      </section>
      <Modal title='Add Connections' isOpen={addConnectionsVisible} close={closeAddConnections}>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <SquareInput error={errors.email} label='Enter below the email address of the connection' attributes={{...register('email')}} />
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='light' attributes={{type: 'submit'}}>Connect</GradientButton>}
          </div>
        </Form>
      </Modal>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;