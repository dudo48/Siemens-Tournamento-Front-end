import IconButton from "@/components/icon-button";
import Subtitle from "@/components/subtitle";
import Title from "@/components/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import FinishedTournamentLi from "@/components/finished-tournament-li";
import GradientButton from "@/components/gradient-button";
import Link from "next/link";
import ConnectionLi from "@/components/connection-li";

const Page = () => {
  return (
    <>
      <Title>About</Title>
      <section>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolorum voluptates dolore hic molestias consequuntur est cum maxime doloremque facilis, aut inventore, neque distinctio quos voluptas. Est ipsum veritatis iusto fugit sit, ad accusantium reiciendis dolorem provident laudantium temporibus voluptatibus corrupti, repellat officia nobis? A quam saepe quia commodi magnam.</p>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;