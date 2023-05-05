import Link from "next/link";
import { PropsWithChildren, useContext } from "react";
import { IconType } from "react-icons";
import { BsBell, BsBoxArrowLeft, BsClockHistory, BsGraphUpArrow, BsHouseDoor, BsInfoSquare, BsPeople, BsPerson, BsX } from "react-icons/bs"
import ProfilePhoto from "../images/profile-photo";
import { UserContext } from "@/context/user-context";
import { toast } from "react-toastify";

interface ElementProps {
  href: string,
  icon: IconType,
  onClick?: () => void
}

interface Props {
  hideSideNav: () => void
}

const SideNavUser = () => {
  return (
    <div className='flex items-center gap-2'>
        <div className='w-16'>
          <ProfilePhoto />
        </div>
        <div className=''>
          <Link href='/profile' className='hover:underline text-xl font-semibold'>
            Fady Emad
          </Link>
          <p className='text-sm'>fadyemad@tournamento.com</p>
        </div>
      </div>
  );
}

const SideNavElement = ({href, onClick, icon: Icon, children}: PropsWithChildren<ElementProps>) => {
  return (
    <Link onClick={onClick} href={href}>
      <div className='py-2 px-4 flex items-center gap-4 hover:bg-tournamento-800 hover:font-semibold duration-100 hover:text-white'>
        <Icon className='text-2xl' />
        <p className='text-white'>{children}</p>
      </div>
    </Link>
  );
}

const ElementSeparator = () => <div className='my-1 ml-2 border-b border-tournamento-100 w-3/4'></div>

const SideNav = ({ hideSideNav }: Props) => {
  const { setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Logged out.');
  }

  return (
    <>
      <div className='flex justify-between items-center pt-4 px-4'>
        <SideNavUser />
        <button className='md:hidden' onClick={hideSideNav}>
          <BsX className='text-4xl' />
        </button>
      </div>
      <nav>
        <SideNavElement href='/home' icon={BsHouseDoor}>Home</SideNavElement>
        <ElementSeparator/>
        <SideNavElement href='/notifications' icon={BsBell}>Notifications</SideNavElement>
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
      <SideNavElement onClick={logout} href='/login' icon={BsBoxArrowLeft}>Logout</SideNavElement>
    </>
  );
}
 
export default SideNav;