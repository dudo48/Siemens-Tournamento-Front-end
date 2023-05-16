import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";

const Page = () => {
  return (
    <>
      <Title>About</Title>
      <section>
        <p>Created as a final project for Siemens Software Diploma course (JAN 2023 - MAY 2023).</p>
      </section>
      <section>
        <Subtitle>Credits</Subtitle>
        <p>Created by:</p>
        <ul className='underline italic list-disc pl-8'>
          <li><a href='mailto:fadyemad14705@gmail.com'>Fady Emad</a></li>
          <li><a href='mailto:turbo.pixelzz@gmail.com'>Muhammad Salah</a></li>
          <li><a href='mailto:ahmedelgarf94@gmail.com'>Ahmed Elgarf</a></li>
          <li><a href='mailto:abdalla.fadle2001@gmail.com'>Abdalla Fadl</a></li>
          <li><a href='mailto:abdalahamer1@gmail.com'>Abdalla Amer</a></li>
        </ul>
        <p>Under the supervision of:</p>
        <ul className='underline italic list-disc pl-8'>
          <li><a href='mailto:ahmed.younes@siemens.com'>Eng. Ahmed Younes</a></li>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;