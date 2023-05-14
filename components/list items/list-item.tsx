import { PropsWithChildren } from "react";
import { IconType } from "react-icons";
import CircledIcon from "../misc/circled-icon";
import Link from "next/link";

interface Props {
  icon?: IconType,
  title: string,
  subtitle?: string,
  href?: string
}

const ListItem = ({ icon, title, subtitle, href, children }: PropsWithChildren<Props>) => {
  return (
    <li className='flex justify-between items-center relative'>
      <div className='flex items-center'>
        {icon && <CircledIcon icon={icon} />}
        <div className='pl-2 flex flex-col items-start'>
          {href ? 
          <Link href={href}>
            <p className={`${subtitle && 'text-lg'} hover:underline`}>
              {title}
            </p>
          </Link> : <p className={subtitle && 'text-lg'}>{title}</p>}
          {subtitle && <p className='text-sm'>{subtitle}</p>}
        </div>
      </div>
      {children}
    </li>
  );
}
 
export default ListItem;