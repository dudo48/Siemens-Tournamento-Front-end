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
          <Input attributes={{type:'email', name: 'email', placeholder: 'Email address', value: form.email || '', onChange: handleChange}}/>
          <Input attributes={{type:'password', name: 'password', placeholder: 'Password', value: form.password || '', onChange: handleChange}}/>
          <Button attributes={{type: 'submit'}}>Login</Button>
        </Form>
        <p>Forgot password? <Link className='font-semibold hover:underline' href='/reset-password'>Reset password</Link>.</p>
      </div>
      <div>
        <p>Do not have an account? <Link className='font-semibold hover:underline' href='/register'>Sign up</Link>.</p>
      </div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;