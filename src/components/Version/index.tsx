import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

const Version: React.FC = () => {
  const [version, setVersion] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8080/api/version').then((response) => {
      setVersion(response.data.version);
    });
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item >
        <Typography fontWeight="bold">
          {version}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Version;