import GradientButton from "@/components/buttons/gradient-button";
import Form from "@/components/forms/form";
import RoundedInput from "@/components/forms/rounded-input";
import SecondaryLayout from "@/layouts/secondary-layout";
import { useAuthentication } from "@/services/authentication-service";
import { User } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();
  const { signup } = useAuthentication();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(form);

    if (form.password !== form.confirmPassword) {
      toast.error('Please re-enter your password in the confirm password field!');
      setForm({...form, confirmPassword: ''});
      return;
    }

    const result = await signup(form);
    console.log(result);
    
    if (result.id === -1) {
      toast.error('Email is already registered!');
    } else {
      router.push(`/verify-account?id=${result.id}`);
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
          <RoundedInput attributes={{type:'text', name: 'firstName', placeholder: 'First name', value: form.firstName, onChange: handleChange}}/>
          <RoundedInput attributes={{type:'text', name: 'lastName', placeholder: 'Last name', value: form.lastName, onChange: handleChange}}/>
          <RoundedInput attributes={{type:'email', name: 'email', placeholder: 'Email address', value: form.email, onChange: handleChange}}/>
          <RoundedInput attributes={{type:'password', name: 'password', placeholder: 'Password', value: form.password, onChange: handleChange}}/>
          <RoundedInput attributes={{type:'password', name: 'confirmPassword', placeholder: 'Confirm password', value: form.confirmPassword, onChange: handleChange}}/>
          <GradientButton type='dark' attributes={{type: 'submit'}}>Register</GradientButton>
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