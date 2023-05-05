import GradientButton from "@/components/buttons/gradient-button";
import Form from "@/components/forms/form";
import RoundedInput from "@/components/forms/rounded-input";
import { UserContext } from "@/context/user-context";
import SecondaryLayout from "@/layouts/secondary-layout";
import authenticationService from "@/services/authentication-service";
import { User } from "@/utils/types";
import Link from "next/link";
import { ChangeEvent, FormEvent, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [form, setForm] = useState<User>({email: '', password: ''});
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(form);

    const result = await authenticationService.login(form);
    console.log(result);

    if (result) {
      if (result.status) {
        toast.error('Login failed: An error happened.');
        return;
      }
      if (!result.verified) {
        toast.error('Login failed: User is not verified yet!');
        return;
      }
      
      localStorage.setItem('user', JSON.stringify(result));
      setUser(result);
      toast.success('Logged in successfully!');
    } else {
      toast.error('Login failed: Wrong email or password.');
    }
  }

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setForm({...form, [name]: value});
    console.log(form);
  }

  return (
    <>
      <div className='w-1/2'>
        <Form attributes={{onSubmit: handleSubmit}}>
          <RoundedInput attributes={{type:'email', name: 'email', placeholder: 'Email address', value: form.email, onChange: handleChange}}/>
          <RoundedInput attributes={{type:'password', name: 'password', placeholder: 'Password', value: form.password, onChange: handleChange}}/>
          <GradientButton type='dark' attributes={{type: 'submit'}}>Login</GradientButton>
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