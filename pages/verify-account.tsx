import GradientButton from "@/components/buttons/gradient-button";
import Form from "@/components/forms/form";
import RoundedInput from "@/components/forms/rounded-input";
import SecondaryLayout from "@/layouts/secondary-layout";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, ReactNode, useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/user-context";
import { toast } from "react-toastify";
import { useAuthentication } from "@/services/authentication-service";
import LoadingSpinner from "@/components/misc/loading-spinner";

const Page = () => {
  const [code, setCode] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;
  const { setUser } = useContext(UserContext);
  const { verifyUser } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(code);

    const result = await verifyUser(id as string, code);
    console.log(result);
    
    if (!result || result.status) {
      toast.error('The code you entered is not the code we sent you!');
      setCode('');
    } else {
      localStorage.setItem('user', JSON.stringify(result));
      setUser(result);
      toast.success('Logged in successfully!');
    }
    setIsLoading(false);
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
          <RoundedInput attributes={{type:'text', name: 'code', placeholder: 'Code', value: code, onChange: handleChange}}/>
          {isLoading ? <LoadingSpinner /> : <GradientButton type='dark' attributes={{type: 'submit'}}>Verify</GradientButton>}
        </Form>
      </div>
      <div></div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;