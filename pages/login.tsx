import GradientButton from "@/components/buttons/gradient-button";
import Form from "@/components/forms/form";
import RoundedInput from "@/components/forms/rounded-input";
import LoadingSpinner from "@/components/misc/loading-spinner";
import { UserContext } from "@/context/user-context";
import SecondaryLayout from "@/layouts/secondary-layout";
import { useAuthentication } from "@/services/authentication-service";
import { User } from "@/utils/types";
import Link from "next/link";
import { ChangeEvent, FormEvent, ReactNode, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InferType, object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = object({
  email: string().email('Please enter a valid email address.').required('Please enter a valid email address.'),
  password: string().min(8, 'Password must be at least 8 characters.').max(20, 'Password must be less than 20 characters.').required('Password field is required.')
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({resolver: yupResolver(schema) });
  const { setUser } = useContext(UserContext);
  const { login } = useAuthentication();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    console.log(errors);

    const result = await login(data);
    console.log(result);

    if (result.status) {
      localStorage.setItem('user', JSON.stringify(result.data));
      setUser(result.data);
      toast.success('Logged in successfully!');
    } else {
      toast.error('Login failed: Wrong email or password.');
    }
  }

  return (
    <>
      <div className='w-full max-w-md'>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <RoundedInput error={errors.email} attributes={{...register('email'), placeholder: 'Email address'}}/>
          <RoundedInput error={errors.password} attributes={{...register('password'), type: 'password', placeholder: 'Password'}}/>
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='dark' attributes={{type: 'submit'}}>Login</GradientButton>}
          </div>
        </Form>
        <p>Forgot password? <Link className='hover:underline font-semibold' href='/forgot-password'>Reset password</Link>.</p>
      </div>
      <div>
        <p>Do not have an account? <Link className='hover:underline font-semibold' href='/register'>Sign up</Link>.</p>
      </div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;