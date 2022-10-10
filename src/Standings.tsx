import React from 'react';
import {
  useLocation
} from "react-router-dom";

import useGoogleSheets from 'use-google-sheets';
import PlayerStandingModel from './PlayerStandingModel';

import poopIcon from './poop-9-32.png';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function diff_minutes(dt2: Date, dt1: Date) {
  const diff = (dt2.getTime() - dt1.getTime()) / 1000;
  return Math.abs(Math.round(diff / 60));
}

function playerIcon(weekResult: String) {
  if (weekResult === "0-4-0")
    return <div><img src={poopIcon} alt="poop!" /><>&nbsp;</></div>;
  else
    return <></>;
}

const Standings = () => {
  const { data, loading, error, refetch } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID!,
    sheetsOptions: [{ id: 'Standings' }],
  });

  let query = useQuery();
  const playerFocus = query.get("player");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  const standings = data[0].data.map(row => row as PlayerStandingModel);

  const lastUpdated = new Date((data[0].data[0] as PlayerStandingModel).LastUpdate);
  const minutesAgo = diff_minutes(lastUpdated, new Date());

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>T</TableCell>
              <TableCell>+/-</TableCell>
              <TableCell>Pct</TableCell>
              <TableCell>Week</TableCell>
              <TableCell>Week Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings.map(player => (
              <TableRow 
                key={player.Player} 
                selected={(player.Player === playerFocus)}
              >
                <TableCell style={{ whiteSpace: 'nowrap', position: 'sticky', left: 0, background: '#121212' }}>{playerIcon(player.WeekResult)}{player.Player}</TableCell>
                <TableCell>{player.Wins}</TableCell>
                <TableCell>{player.Losses}</TableCell>
                <TableCell>{player.Ties}</TableCell>
                <TableCell>{player.PointDiff}</TableCell>
                <TableCell>{player.Pct}</TableCell>
                <TableCell>{player.WeekResult}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{player.WeekTeams}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br/><br/>

      <Box textAlign="center">
        <div>
          Updated {minutesAgo} minutes ago
        </div>
        <br/>
        <Button variant="outlined" onClick={refetch}>Refresh</Button>
      </Box>
    </>
  );
}

export default Standings;