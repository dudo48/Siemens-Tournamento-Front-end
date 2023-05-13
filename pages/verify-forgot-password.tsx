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
  code: string().required('Please enter the code we sent you.')
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const router = useRouter();
  const { email } = router.query;
  const { resetPassword } = useAuthentication();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const result = await resetPassword(email as string, data.code);
    console.log(result);
    
    if (result.status) {
      router.push(`/create-new-password?email=${email}`);
    } else {
      toast.error('The code you entered is not the code we sent you!');
    }
    reset();
  }

  return (
    <>
      <div className='w-full max-w-md'>
        <p className=''>Please enter the code we have sent to you below.</p>
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