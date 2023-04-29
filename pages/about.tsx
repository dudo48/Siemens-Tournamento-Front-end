import IconButton from "@/components/buttons/icon-button";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import FinishedTournamentLi from "@/components/list items/finished-tournament-li";
import GradientButton from "@/components/buttons/gradient-button";
import Link from "next/link";
import ConnectionLi from "@/components/list items/connection-li";

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