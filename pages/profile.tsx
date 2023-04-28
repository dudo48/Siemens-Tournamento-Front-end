import Form from "@/components/form";
import GradientButton from "@/components/gradient-button";
import ProfilePhoto from "@/components/profile-photo";
import EditInput from "@/components/square-input";
import Title from "@/components/title";
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
          <EditInput label='First name' attributes={{type:'text', name: 'firstName', placeholder: 'First name', value: form.firstName || '', onChange: handleChange}}/>
          <EditInput label='Last name' attributes={{type:'text', name: 'lastName', placeholder: 'Last name', value: form.lastName || '', onChange: handleChange}}/>
          <EditInput label='Email address' attributes={{type:'email', name: 'email', placeholder: 'Email address', value: form.email || '', onChange: handleChange}}/>
          <EditInput label='Password' attributes={{type:'password', name: 'password', placeholder: 'Password', value: form.password || '', onChange: handleChange}}/>
          <EditInput label='Phone number' attributes={{type:'text', name: 'phone', placeholder: 'Phone number', value: form.phone || '', onChange: handleChange}}/>
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