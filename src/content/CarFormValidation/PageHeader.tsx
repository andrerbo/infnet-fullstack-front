import { Grid, Typography } from '@mui/material';

const PageHeader:React.FC = () =>{
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
         <Typography variant="h3" component="h3" gutterBottom>
           Cadastrar Carro
         </Typography>
      </Grid>
    </Grid>
  );
}
export default PageHeader;