import GradientButton from "@/components/buttons/gradient-button";
import { TournamentStatus } from "@/utils/types";
import { PropsWithChildren } from "react";

interface Props {
  status: TournamentStatus
}

const TournamentStatusLabel = ({ status, children }: PropsWithChildren<Props>) => {
  return (
    <GradientButton type={status === TournamentStatus.Pending ? 'orange' : status === TournamentStatus.Started ? 'light' : 'gray'} attributes={{disabled: true}}>
      {children}
    </GradientButton>
  );
}
 
export default TournamentStatusLabel;