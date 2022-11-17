import React from 'react';
import {
  useLocation
} from "react-router-dom";

import useGoogleSheets from 'use-google-sheets';
import PickQualityTeamModel from './PickQualityTeamModel';

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

const PickQuality = () => {
  const { data, loading, error, refetch } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID!,
    sheetsOptions: [{ id: 'PickQuality' }],
  });

  let query = useQuery();
  const playerFocus = query.get("player");

  if (loading) {
    return <div>Loading Pick Quality...</div>;
  }

  if (error) {
    return <div>Error loading Pick Quality!</div>;
  }

  const picks = data[0].data.map(row => row as PickQualityTeamModel);

  const lastUpdated = new Date((data[0].data[0] as PickQualityTeamModel).LastUpdate);
  const minutesAgo = diff_minutes(lastUpdated, new Date());

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Drafted</TableCell>
              <TableCell>Wins</TableCell>
              <TableCell>Expected Wins</TableCell>
              <TableCell>Pick Value</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Wins/$</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {picks.map(pick => (
              <TableRow selected={(pick.Player === playerFocus)} key={pick.Team}>
                <TableCell style={{ whiteSpace: 'nowrap', position: 'sticky', left: 0, background: '#121212' }}>{pick.Team}</TableCell>
                <TableCell>{pick.Player}</TableCell>
                <TableCell>{pick.Drafted}</TableCell>
                <TableCell>{pick.Wins}</TableCell>
                <TableCell>{pick.ExpWins}</TableCell>
                <TableCell>{pick.PickValue}</TableCell>
                <TableCell>{pick.Paid}</TableCell>
                <TableCell>{pick.WinsPerDollar}</TableCell>
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

export default PickQuality;