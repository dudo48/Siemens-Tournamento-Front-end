import { getRequest, postRequest } from "./services";

const baseUrl = 'http://localhost:5000/match';

export const useRoundManagement = () => ({
  nextRound: (tournamentId: number, matchId: number) => getRequest(`${baseUrl}/start/${tournamentId}/${matchId}`),
})