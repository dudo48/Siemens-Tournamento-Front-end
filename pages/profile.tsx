import Form from "@/components/forms/form";
import GradientButton from "@/components/buttons/gradient-button";
import ProfilePhoto from "@/components/images/profile-photo";
import SquareInput from "@/components/forms/square-input";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";

const Page = () => {
  const [form, setForm] = useState<{[key: string]: string}>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(form);
  }

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setForm({...form, [name]: value});
    console.log(form);
  }

  const resetValue = (name: string, value: string) => setForm({...form, [name]: value});

  return (
    <>
      <Title>Profile</Title>
      <section className='flex flex-col'>
        <div>
          <div className='w-1/4 mx-auto'>
            <ProfilePhoto />
          </div>
        </div>
        <Form attributes={{onSubmit: handleSubmit}}>
          <SquareInput label='First name' attributes={{type:'text', name: 'firstName', placeholder: 'First name', value: form.firstName, onChange: handleChange}}/>
          <SquareInput label='Last name' attributes={{type:'text', name: 'lastName', placeholder: 'Last name', value: form.lastName, onChange: handleChange}}/>
          <SquareInput label='Email address' attributes={{type:'email', name: 'email', placeholder: 'Email address', value: form.email, onChange: handleChange}}/>
          <SquareInput label='Password' attributes={{type:'password', name: 'password', placeholder: 'Password', value: form.password, onChange: handleChange}}/>
          <SquareInput label='Phone number' attributes={{type:'text', name: 'phone', placeholder: 'Phone number', value: form.phone, onChange: handleChange}}/>
          <div>
            <GradientButton type='light'>Save</GradientButton>
          </div>
        </Form>
        <div>
          <GradientButton type='danger'>DELETE ACCOUNT</GradientButton>
        </div>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;