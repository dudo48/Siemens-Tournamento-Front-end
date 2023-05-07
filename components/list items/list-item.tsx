import { Sport } from "@/utils/types";
import { IconType } from "react-icons";
import getOrdinalSuffix from "@/utils/functions";
import { sportsIcons } from "@/utils/mappings";
import { PropsWithChildren } from "react";
import CircledIcon from "../misc/circled-icon";

interface Props {
  icon?: IconType,
  title: string,
  subtitle?: string,
  className?: string
}

const ListItem = ({ icon, title, subtitle, className, children }: PropsWithChildren<Props>) => {
  return (
    <li className={`flex justify-between items-center group relative ${className}`}>
      <div className='flex items-center'>
        {icon && <CircledIcon icon={icon} />}
        <div className='pl-2'>
          <p className='text-lg'>{title}</p>
          {subtitle && <p className='text-sm'>{subtitle}</p>}
        </div>
      </div>
      {children}
    </li>
  );
}
 
export default ListItem;