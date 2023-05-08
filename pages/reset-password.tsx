import GradientButton from "@/components/buttons/gradient-button";
import Form from "@/components/forms/form";
import RoundedInput from "@/components/forms/rounded-input";
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
  }

  const handleChange = (event: ChangeEvent) => {
    setEmail((event.target as HTMLInputElement).value);
    console.log(email);
  }

  return (
    <>
      <div className='w-full max-w-md'>
      <p className='text-center'>Enter your email address.</p>
        <Form attributes={{onSubmit: handleSubmit}}>
          <RoundedInput attributes={{type:'email', name: 'email', placeholder: 'Email address', value: email, onChange: handleChange}}/>
          <GradientButton type='dark' attributes={{type: 'submit'}}>Continue</GradientButton>
        </Form>
      </div>
      <div></div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;