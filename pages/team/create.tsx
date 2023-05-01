import Form from "@/components/forms/form";
import GradientButton from "@/components/buttons/gradient-button";
import SquareInput from "@/components/forms/square-input";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import IconButton from "@/components/buttons/icon-button";
import { BsPlusLg } from "react-icons/bs";

const Page = () => {
  const [name, setName] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(name);
  }

  const handleChange = (event: ChangeEvent) => {
    setName((event.target as HTMLInputElement).value);
    console.log(name);
  }

  return (
    <>
      <Title>Create Team</Title>
      <section className='flex flex-col'>
        <Form attributes={{onSubmit: handleSubmit}}>
          <SquareInput label='Name' attributes={{type:'text', name: 'name', placeholder: 'Team name', value: name, onChange: handleChange}}/>
          <div className='self-start'>
            <IconButton icon={BsPlusLg}>Add player</IconButton>
          </div>
          <GradientButton type='light'>Create</GradientButton>
        </Form>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;