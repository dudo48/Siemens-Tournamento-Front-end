import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";
import { IconType } from "react-icons";
import { BsBoxArrowLeft, BsClockHistory, BsGraphUpArrow, BsHouseDoor, BsInfoSquare, BsPeople, BsPerson } from "react-icons/bs"
import ProfilePhoto from "../images/profile-photo";

interface ElementProps {
  href: string,
  icon: IconType
}

const SideNavUser = () => {
  return (
    <div className='flex items-center p-2'>
        <div className='w-16'>
          <ProfilePhoto />
        </div>
        <div className='pl-2'>
          <Link href='/profile' className='hover:underline text-xl font-semibold'>
            Fady Emad
          </Link>
          <p className='text-sm'>fadyemad@tournamento.com</p>
        </div>
      </div>
  );
}

const SideNavElement = ({href, icon: Icon, children}: PropsWithChildren<ElementProps>) => {
  return (
    <Link href={href}>
      <div className='py-2 px-4 flex items-center gap-4 hover:bg-tournamento-800 hover:font-semibold duration-100 hover:text-white'>
        <Icon className='text-2xl' />
        <p className='text-white'>{children}</p>
      </div>
    </Link>
  );
}

const ElementSeparator = () => <div className='my-1 ml-2 border-b border-tournamento-100 w-3/4'></div>

const SideNav = () => {
  return (
    <section className='w-1/4 flex flex-col gap-8 bg-gradient-to-br from-tournamento-400 to-tournamento-600 break-all'>
      <SideNavUser />
      <nav>
        <SideNavElement href='/home' icon={BsHouseDoor}>Home</SideNavElement>
        <ElementSeparator/>
        <SideNavElement href='/profile' icon={BsPerson}>Profile</SideNavElement>
        <ElementSeparator/>
        <SideNavElement href='/history' icon={BsClockHistory}>History</SideNavElement>
        <ElementSeparator/>
        <SideNavElement href='/statistics' icon={BsGraphUpArrow}>Statistics</SideNavElement>
        <ElementSeparator/>
        <SideNavElement href='/connections' icon={BsPeople}>Connections</SideNavElement>
        <ElementSeparator/>
        <SideNavElement href='/about' icon={BsInfoSquare}>About</SideNavElement>
      </nav>
      <SideNavElement href='/login' icon={BsBoxArrowLeft}>Logout</SideNavElement>
    </section>
  );
}
 
export default SideNav;