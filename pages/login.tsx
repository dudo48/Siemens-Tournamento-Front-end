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
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({resolver: yupResolver(schema) });
  const { setUser } = useContext(UserContext);
  const { login } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log(data);
    console.log(errors);

    const result = await login(data);
    console.log(result);

    if (!result || result.status) {
      toast.error('Login failed: Wrong email or password.');
    } else {
      localStorage.setItem('user', JSON.stringify(result));
      setUser(result);
      toast.success('Logged in successfully!');
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className='w-full max-w-md'>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <RoundedInput error={errors.email} attributes={{...register('email'), placeholder: 'Email address'}}/>
          <RoundedInput error={errors.password} attributes={{...register('password'), type: 'password', placeholder: 'Password'}}/>
          {isLoading ? <LoadingSpinner /> : <GradientButton type='dark' attributes={{type: 'submit'}}>Login</GradientButton>}
        </Form>
        <p>Forgot password? <Link className='hover:underline font-semibold' href='/reset-password'>Reset password</Link>.</p>
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