import Button from "@/components/button";
import Form from "@/components/form";
import Input from "@/components/input";
import SecondaryLayout from "@/layouts/secondary-layout";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/router";

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(email);
    router.push('/verify-account');
  }

  const handleChange = (event: ChangeEvent) => {
    setEmail((event.target as HTMLInputElement).value);
    console.log(email);
  }

  return (
    <>
      <div className='w-1/2'>
      <p className='text-center'>Enter your email address.</p>
        <Form attributes={{onSubmit: handleSubmit}}>
          <Input attributes={{type:'email', name: 'email', placeholder: 'Email address', value: email || '', onChange: handleChange}}/>
          <Button attributes={{type: 'submit'}}>Continue</Button>
        </Form>
      </div>
      <div></div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;