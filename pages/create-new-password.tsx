import Button from "@/components/button";
import Form from "@/components/form";
import Input from "@/components/input";
import SecondaryLayout from "@/layouts/SecondaryLayout";
import Link from "next/link";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";

const Page = () => {
  const [form, setForm] = useState<{[key: string]: string}>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(form);
  }

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setForm({...form, [name]: value});
    console.log(form);
  }

  return (
    <>
      <div className='w-1/2'>
        <p className='text-center'>Enter your new password.</p>
        <Form attributes={{onSubmit: handleSubmit}}>
          <Input attributes={{type:'password', name: 'password', placeholder: 'New password', value: form.password || '', onChange: handleChange}}/>
          <Input attributes={{type:'password', name: 'confirmPassword', placeholder: 'Confirm new password', value: form.confirmPassword || '', onChange: handleChange}}/>
          <Button attributes={{type: 'submit'}}>Submit</Button>
        </Form>
      </div>
      <div></div>
    </>
  );
}

// used in _app.tsx to render layout
Page.getLayout = (page: ReactNode) => <SecondaryLayout>{page}</SecondaryLayout>

export default Page;