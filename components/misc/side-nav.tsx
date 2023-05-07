import Link from "next/link";
import { PropsWithChildren, useContext } from "react";
import { IconType } from "react-icons";
import { BsBell, BsBoxArrowLeft, BsClockHistory, BsGraphUpArrow, BsHouseDoor, BsInfoSquare, BsPeople, BsPerson, BsX } from "react-icons/bs"
import ProfilePhoto from "../images/profile-photo";
import { UserContext } from "@/context/user-context";
import { toast } from "react-toastify";
import { NotificationsContext } from "@/context/notifications-context";
import { useRouter } from "next/router";
import { Notification } from "@/utils/types";

interface ElementProps {
  href: string,
  icon: IconType,
  onClick?: () => void,
  alertCount?: number
}

interface Props {
  hideSideNav: () => void
}

const SideNavUser = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='flex items-center gap-2'>
        <div className='w-16'>
          <ProfilePhoto />
        </div>
        <div>
          <Link href='/profile' className='hover:underline text-xl font-semibold'>
            {user.firstName} {user.lastName}
          </Link>
          <p className='text-sm'>{user.email}</p>
        </div>
      </div>
  );
}

const SideNavElement = ({href, onClick, icon: Icon, alertCount, children}: PropsWithChildren<ElementProps>) => {
  const router = useRouter();

  return (
    <Link onClick={onClick} href={href}>
      <div className={`${router.asPath.startsWith(href) ? 'bg-tournamento-800 text-white font-semibold' : 'hover:bg-tournamento-800 hover:font-semibold hover:text-white'} py-2 px-4 flex justify-between items-center duration-100`}>
        <div className='flex items-center gap-4'>
          <Icon className='text-2xl' />
          <p className='text-white'>{children}</p>
        </div>
        {alertCount ? <div className='text-white bg-red-500 flex items-center justify-center rounded-full w-6 h-6'>
          <p>{alertCount}</p>
        </div> : null}
      </div>
    </Link>
  );
}

const ElementSeparator = () => <div className='my-1 ml-2 border-b border-tournamento-100 w-3/4'></div>

const SideNav = ({ hideSideNav }: Props) => {
  const { setUser } = useContext(UserContext);
  const { notifications } = useContext(NotificationsContext);

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
        <SideNavElement href='/notifications' alertCount={notifications?.filter((n: Notification) => !n.read).length} icon={BsBell}>Notifications</SideNavElement>
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