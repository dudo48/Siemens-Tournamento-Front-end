import GradientButton from "@/components/buttons/gradient-button";
import { default as Form, default as form } from "@/components/forms/form";
import RoundedInput from "@/components/forms/rounded-input";
import LoadingSpinner from "@/components/misc/loading-spinner";
import SecondaryLayout from "@/layouts/secondary-layout";
import { useAuthentication } from "@/services/authentication-service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InferType, object, ref, string } from "yup";

const schema = object({
  password: string().min(8, 'Password must be at least 8 characters.').max(20, 'Password must be less than 20 characters.').required('Password field is required.'),
  confirmPassword: string().oneOf([ref('password')], 'Your passwords do not match.').required('Please re-type your password.')
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const router = useRouter();
  const { email } = router.query;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({resolver: yupResolver(schema) });
  const { updatePassword } = useAuthentication();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const result = await updatePassword(email as string, data.password);
    console.log(result);
    
    if (result.status) {
      toast.success('Password updated successfully, you can now log in using the new password.');
      router.push('/login');
    } else {
      toast.error('Invalid new password.');
    }
    
  }

  return (
    <>
      <div className='w-full max-w-md'>
        <p className=''>Enter your new password.</p>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <RoundedInput error={errors.password} attributes={{type:'password', placeholder: 'New password', ...register('password')}}/>
          <RoundedInput error={errors.confirmPassword} attributes={{type:'password', placeholder: 'Confirm new password', ...register('confirmPassword')}}/>
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='dark' attributes={{type: 'submit'}}>Submit</GradientButton>}
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