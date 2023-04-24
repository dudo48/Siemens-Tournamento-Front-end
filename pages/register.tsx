import GradientButton1 from "@/components/gradient-button-1";
import Form from "@/components/form";
import Input from "@/components/input";
import SecondaryLayout from "@/layouts/secondary-layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";

const Page = () => {
  const [form, setForm] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(form);
    // confirm password must equal password
    router.push('/home');
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
          <GradientButton1 attributes={{type: 'submit'}}>Register</GradientButton1>
        </Form>
      </div>
      <div>
        <p>Do you have an account? <Link className='hover:underline font-semibold' href='/login'>Sign in</Link>.</p>
      </div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;