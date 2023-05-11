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
import { InferType, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = object({
  code: string().required('Please enter the code we sent you.')
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setUser } = useContext(UserContext);
  const { verifyUser } = useAuthentication();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const result = await verifyUser(id as string, data.code);
    console.log(result);
    
    if (result.status && result.data) {
      localStorage.setItem('user', JSON.stringify(result.data));
      setUser(result.data);
      toast.success('Logged in successfully!');
    } else {
      toast.error('The code you entered is not the code we sent you!');
    }
    reset();
  }

  const resendCode = () => {
    console.log('resend');
  }

  return (
    <>
      <div className='w-full max-w-md'>
        <p className='text-center'>We have sent a verification code to your email. Enter the code below. Did not receive the code? <button onClick={resendCode} className='font-semibold hover:underline'>Resend code</button>.</p>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <RoundedInput error={errors.code} attributes={{...register('code'), placeholder: 'Verification code'}}/>
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='dark' attributes={{type: 'submit'}}>Verify</GradientButton>}
          </div>
        </Form>
      </div>
      <div></div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;