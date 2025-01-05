import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import VersionService from 'src/services/VersionService';

const Version: React.FC = () => {
  const [version, setVersion] = useState('');
  useEffect(() => {
    
    const versionService: VersionService = new VersionService()

    versionService.getVersion()
      .then((response) => {
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