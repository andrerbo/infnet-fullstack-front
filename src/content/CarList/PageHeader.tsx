import { Button, Grid, styled, Typography } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';
import CsvDownloader from '../../components/CsvDownloader';

const PageHeader:React.FC = () =>{
  const navigate = useNavigate();

  const SubmitButton = styled(Button)`
    margin-left: 10px;
    background-color: #3f51b5;
    color: white;
    &:hover {
        background-color: #303f9f;
    }
`;


  return (

    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
         <Typography variant="h3" component="h3" gutterBottom>
           Carros Cadastrados
         </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
          <Grid item>
            <SubmitButton
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              onClick={() => navigate("/home/new-car")}
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
            Novo Carro
            </SubmitButton>
          </Grid>
          <Grid item>
            <CsvDownloader/>
          </Grid>
        </Grid>
      <Grid/>
    </Grid>
    </Grid>
  );
}
export default PageHeader;