import { Button, styled } from '@mui/material';
import { DownloadOutlined } from '@mui/icons-material';
import CarService from '../../services/CarService';

const SubmitButton = styled(Button)`
    margin-left: 10px;
    background-color: #3f51b5;
    color: white;
    &:hover {
        background-color: #303f9f;
    }
`;


const CsvDownloader = () => {

  const downloadCsv = async (): Promise<void> => {
    try {
      const carService: CarService = new CarService();
      const response = await carService.csvDownload();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cars-list.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Erro ao fazer o download do CSV");
    }
  }

  return (
    <>
    <SubmitButton sx={{mt: {xs: 2, md: 0}}}
            variant="contained"
            onClick={downloadCsv}
            startIcon={<DownloadOutlined />}
    >
      Download
    </SubmitButton>
    </>
  )
}
export default CsvDownloader