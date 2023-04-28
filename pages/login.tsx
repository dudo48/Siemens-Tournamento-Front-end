import GradientButton from "@/components/gradient-button";
import Form from "@/components/form";
import RoundedInput from "@/components/rounded-input";
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
          <RoundedInput attributes={{type:'email', name: 'email', placeholder: 'Email address', value: form.email || '', onChange: handleChange}}/>
          <RoundedInput attributes={{type:'password', name: 'password', placeholder: 'Password', value: form.password || '', onChange: handleChange}}/>
          <GradientButton type='dark' attributes={{type: 'submit'}}>Login</GradientButton>
        </Form>
        <p>Forgot password? <Link className='hover:underline font-semibold' href='/reset-password'>Reset password</Link>.</p>
      </div>
      <div>
        <p>Do not have an account? <Link className='hover:underline font-semibold' href='/register'>Sign up</Link>.</p>
      </div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;