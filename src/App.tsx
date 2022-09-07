import React from 'react';
import useGoogleSheets from 'use-google-sheets';
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

  return (
    <div>
      <div>{JSON.stringify(data)}</div>

      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

export default App;
