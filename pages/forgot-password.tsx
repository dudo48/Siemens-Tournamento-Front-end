import GradientButton from "@/components/buttons/gradient-button";
import Form from "@/components/forms/form";
import RoundedInput from "@/components/forms/rounded-input";
import LoadingSpinner from "@/components/misc/loading-spinner";
import SecondaryLayout from "@/layouts/secondary-layout";
import { useAuthentication } from "@/services/authentication-service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InferType, object, string } from "yup";

const schema = object({
  email: string().email('Please enter a valid email address.').required('Please enter a valid email address.'),
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({resolver: yupResolver(schema) });
  const { forgotPassword } = useAuthentication();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const result = await forgotPassword(data.email);
    console.log(result);
    
    if (result.status) {
      router.push(`/verify-forgot-password?email=${data.email}`);
    } else {
      toast.error('Email is not registered!');
    }
  }

  return (
    <>
      <div className='w-full max-w-md'>
      <p className=''>Enter your email address.</p>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <RoundedInput error={errors.email} attributes={{...register('email'), placeholder: 'Email address'}}/>
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='dark' attributes={{type: 'submit'}}>Continue</GradientButton>}
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