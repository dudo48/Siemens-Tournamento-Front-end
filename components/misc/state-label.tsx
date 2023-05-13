import GradientButton from "@/components/buttons/gradient-button";
import { Status } from "@/utils/types";
import { PropsWithChildren } from "react";

interface Props {
  status: Status
}

const StatusLabel = ({ status, children }: PropsWithChildren<Props>) => {
  return (
    <GradientButton type={status === Status.Pending ? 'orange' : status === Status.Started ? 'light' : 'gray'} attributes={{disabled: true}}>
      {children}
    </GradientButton>
  );
}
 
export default StatusLabel;