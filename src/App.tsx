import React from 'react';
import useGoogleSheets from 'use-google-sheets';
import PlayerStandingModel from './PlayerStandingModel';
import './App.css';

const App = () => {
  const { data, loading, error, refetch } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID!,
    sheetsOptions: [{ id: 'Standings' }],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  const standings = data[0].data.map(row => row as PlayerStandingModel);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Player</td>
            <td>Record</td>
            <td>Point Diff</td>
            <td>Week Result</td>
          </tr>
        </thead>
        <tbody>
          {standings.map(player => (
            <StandingsRow key={player.Player} player={player} />
          ))}
        </tbody>
      </table>

      <br/>
      <button onClick={refetch}>Refresh</button>
    </>
  );
};

const StandingsRow = ({ player }: { player: PlayerStandingModel }) => (
  <tr>
    <td>{player.Player}</td>
    <td>{player.Wins}-{player.Losses}-{player.Ties}</td>
    <td>{player.PointDiff}</td>
    <td>{player.WeekResult}</td>
  </tr>
);

export default App;
