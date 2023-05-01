interface Props {
  headers: string[],
  teams: (string|number)[][]
}

const Standings = ({ headers, teams }: Props) => {
  return (
    <table className='w-full'>
      <tbody className='text-center'>
        <tr className='font-semibold bg-gradient-to-br from-tournamento-600 to-tournamento-400 text-white'>
          <td>Position</td>
          {headers.map((header, i) => <td key={i}>{header}</td>)}
        </tr>
        {teams.map((team, i) => <tr key={i} className='odd:bg-tournamento-100'>
          <td className='text-tournamento-400 font-bold text-lg'>{i + 1}</td>
          {team.map((data, j) => <td key={j}>{data}</td>)}
        </tr>)}
      </tbody>
    </table>
  );
}
 
export default Standings;