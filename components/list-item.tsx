import { Sport } from "@/utils/types";
import { IconType } from "react-icons";
import getOrdinalSuffix from "@/utils/functions";
import { sportsIcons, sportsNames } from "@/utils/mappings";
import { PropsWithChildren } from "react";

interface Props {
  icon?: IconType,
  title: string,
  subtitle?: string
}

const ListItem = ({ icon: Icon, title, subtitle, children }: PropsWithChildren<Props>) => {
  return (
    <li className='flex justify-between group'>
      <div className='flex items-center'>
        {Icon && 
        <div className='border-2 p-0.5 border-tournamento-400 rounded-full'>
          <Icon className='text-4xl text-tournamento-400' />
        </div>
        }
        <div className='pl-2'>
          <p className='text-xl'>{title}</p>
          {subtitle && <p className='text-sm'>{subtitle}</p>}
        </div>
      </div>
      {children}
    </li>
  );
}
 
export default ListItem;