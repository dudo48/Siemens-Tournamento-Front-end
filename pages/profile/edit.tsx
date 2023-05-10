import Form from "@/components/forms/form";
import GradientButton from "@/components/buttons/gradient-button";
import ProfilePhoto from "@/components/images/profile-photo";
import SquareInput from "@/components/forms/square-input";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ChangeEvent, FormEvent, ReactNode, useContext, useState } from "react";
import { InferType, lazy, object, ref, string } from "yup";
import { useForm } from "react-hook-form";
import { UserContext } from "@/context/user-context";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = object({
  firstName: string().required('First name field is required.'),
  lastName: string().required('Last name field is required.'),
  password: lazy(value => { return value.length === 0 ? string().length(0) : string()
    .min(8, 'Password must be at least 8 characters.')
    .max(20, 'Password must be less than 20 characters.')
  }),
  confirmPassword: string().oneOf([ref('password')], 'Your passwords do not match.')
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const { user } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        password: '',
        confirmPassword: ''
      }
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  }

  return (
    <>
      <Title>Profile</Title>
      <section className='flex flex-col'>
        <div>
          <div className='w-1/4 mx-auto'>
            <ProfilePhoto />
          </div>
        </div>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <SquareInput error={errors.firstName} label='First name' attributes={{...register('firstName'), placeholder: 'First name'}}/>
          <SquareInput error={errors.lastName} label='Last name' attributes={{...register('lastName'), placeholder: 'Last name'}}/>
          <SquareInput error={errors.password} label='New password' attributes={{...register('password'), type:'password', placeholder: 'Password'}}/>
          <SquareInput error={errors.confirmPassword} label='Confirm new password' attributes={{...register('confirmPassword'), type:'password', placeholder: 'Confirm new password'}}/>
          <div className='self-center'>
            <GradientButton type='light' grayscale={!isDirty} attributes={{type: 'submit', disabled: !isDirty}}>Confirm</GradientButton>
          </div>
        </Form>
        <div>
          <GradientButton type='red'>DELETE ACCOUNT</GradientButton>
        </div>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;