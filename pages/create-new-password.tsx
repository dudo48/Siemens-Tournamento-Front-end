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
        <p className='text-center'>Enter your new password.</p>
        <Form attributes={{onSubmit: handleSubmit}}>
          <Input attributes={{type:'password', name: 'password', placeholder: 'New password', value: form.password || '', onChange: handleChange}}/>
          <Input attributes={{type:'password', name: 'confirmPassword', placeholder: 'Confirm new password', value: form.confirmPassword || '', onChange: handleChange}}/>
          <GradientButton1 attributes={{type: 'submit'}}>Submit</GradientButton1>
        </Form>
      </div>
      <div></div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;