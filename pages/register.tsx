import Button from "@/components/button";
import Form from "@/components/form";
import Input from "@/components/input";
import SecondaryLayout from "@/layouts/SecondaryLayout";
import Link from "next/link";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";

const Page = () => {
  const [form, setForm] = useState<{[key: string]: string}>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(form);
    // confirm password must equal password
  }

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setForm({...form, [name]: value});
    console.log(form);
  }

  return (
    <>
      <div className='w-1/2'>
        <Form attributes={{onSubmit: handleSubmit}}>
          <Input attributes={{type:'string', name: 'firstName', placeholder: 'First name', value: form.firstName || '', onChange: handleChange}}/>
          <Input attributes={{type:'string', name: 'lastName', placeholder: 'Last name', value: form.lastName || '', onChange: handleChange}}/>
          <Input attributes={{type:'email', name: 'email', placeholder: 'Email address', value: form.email || '', onChange: handleChange}}/>
          <Input attributes={{type:'password', name: 'password', placeholder: 'Password', value: form.password || '', onChange: handleChange}}/>
          <Input attributes={{type:'password', name: 'confirmPassword', placeholder: 'Confirm password', value: form.confirmPassword || '', onChange: handleChange}}/>
          <Button attributes={{type: 'submit'}}>Register</Button>
        </Form>
      </div>
      <div>
        <p>Do you have an account? <Link className='font-semibold hover:underline' href='/login'>Sign in</Link>.</p>
      </div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;