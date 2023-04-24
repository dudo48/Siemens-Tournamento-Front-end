import GradientButton1 from "@/components/gradient-button-1";
import Form from "@/components/form";
import Input from "@/components/input";
import SecondaryLayout from "@/layouts/secondary-layout";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/router";

const Page = () => {
  const [code, setCode] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(code);
    router.push('/create-new-password');
  }

  const handleChange = (event: ChangeEvent) => {
    setCode((event.target as HTMLInputElement).value);
    console.log(code);
  }

  const resendCode = () => {
    console.log('resend');
  }

  return (
    <>
      <div className='w-1/2'>
        <p className='text-center'>We have sent a verification code to your email. Enter the code below. Did not receive the code? <button onClick={resendCode} className='font-semibold hover:underline'>Resend code</button>.</p>
        <Form attributes={{onSubmit: handleSubmit}}>
          <Input attributes={{type:'string', name: 'code', placeholder: 'Code', value: code || '', onChange: handleChange}}/>
          <GradientButton1 attributes={{type: 'submit'}}>Verify</GradientButton1>
        </Form>
      </div>
      <div></div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;