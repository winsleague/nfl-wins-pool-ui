import React from 'react';
import useGoogleSheets from 'use-google-sheets';
import PlayerStandingModel from './PlayerStandingModel';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>T</TableCell>
              <TableCell>Pct</TableCell>
              <TableCell>+/-</TableCell>
              <TableCell>Week</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings.map(player => (
              <TableRow key={player.Player}>
                <TableCell>{player.Player}</TableCell>
                <TableCell>{player.Wins}</TableCell>
                <TableCell>{player.Losses}</TableCell>
                <TableCell>{player.Ties}</TableCell>
                <TableCell>{player.Pct}</TableCell>
                <TableCell>{player.PointDiff}</TableCell>
                <TableCell>{player.WeekResult}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br/><br/>
      
      <Box textAlign="center">
        <Button variant="outlined" onClick={refetch}>Refresh</Button>
      </Box>
    </>
  );
};

export default App;
