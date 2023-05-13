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
import { useProfileManagement } from "@/services/user-service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/misc/loading-spinner";

const schema = object({
  firstName: string().required('First name field is required.'),
  lastName: string().required('Last name field is required.'),
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { updateProfile } = useProfileManagement();

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        firstName: user?.firstName,
        lastName: user?.lastName
      }
  });

  const onSubmit = async (data: FormData) => {
    const result = await updateProfile(user.id, data);
    console.log(result);

    if (result.status) {
      // update local storage
      const oldUser = JSON.parse(localStorage.getItem('user') as string);
      const newUser = {...oldUser, ...data}
      localStorage.setItem('user', JSON.stringify(newUser));

      toast.success('Profile updated successfully!');
      router.push(`/profile/${user.id}`).then(() => router.reload());
    } else {
      toast.error(`Profile update failed.`);
    }
  }

  return (
    <>
      <Title>Edit Profile</Title>
      <section className='flex flex-col'>
        <div className='w-32 md:w-64 mx-auto'>
          <ProfilePhoto />
        </div>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <SquareInput error={errors.firstName} label='First name' attributes={{...register('firstName'), placeholder: 'First name'}}/>
          <SquareInput error={errors.lastName} label='Last name' attributes={{...register('lastName'), placeholder: 'Last name'}}/>
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='light' grayscale={!isDirty} attributes={{type: 'submit', disabled: !isDirty}}>Confirm</GradientButton>}
          </div>
        </Form>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;