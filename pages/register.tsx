import GradientButton from "@/components/buttons/gradient-button";
import Form from "@/components/forms/form";
import RoundedInput from "@/components/forms/rounded-input";
import LoadingSpinner from "@/components/misc/loading-spinner";
import SecondaryLayout from "@/layouts/secondary-layout";
import { useAuthentication } from "@/services/authentication-service";
import { User } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InferType, object, ref, string } from "yup";

const schema = object({
  firstName: string().required('First name field is required.'),
  lastName: string().required('Last name field is required.'),
  email: string().email('Please enter a valid email address.').required('Please enter a valid email address.'),
  password: string().min(8, 'Password must be at least 8 characters.').max(20, 'Password must be less than 20 characters.').required('Password field is required.'),
  confirmPassword: string().oneOf([ref('password')], 'Your passwords do not match.').required('Please re-type your password.')
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const router = useRouter();
  const { signup } = useAuthentication();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const result = await signup(data);
    console.log(result);
    
    if (result.status && result.data.id != -1) {
      router.push(`/verify-account?id=${result.data.id}`);
    } else {
      toast.error('Email is already registered!');
    }
  }

  return (
    <>
      <div className='w-full max-w-md'>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <RoundedInput error={errors.firstName} attributes={{...register('firstName'), placeholder: 'First name'}}/>
          <RoundedInput error={errors.lastName} attributes={{...register('lastName'), placeholder: 'Last name'}}/>
          <RoundedInput error={errors.email} attributes={{...register('email'), placeholder: 'Email address'}}/>
          <RoundedInput error={errors.password} attributes={{...register('password'), type:'password', placeholder: 'Password'}}/>
          <RoundedInput error={errors.confirmPassword} attributes={{...register('confirmPassword'), type:'password', placeholder: 'Confirm password'}}/>
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='dark' attributes={{type: 'submit'}}>Register</GradientButton>}
          </div>
        </Form>
      </div>
      <div>
        <p>Do you have an account? <Link className='hover:underline font-semibold' href='/login'>Sign in</Link>.</p>
      </div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;