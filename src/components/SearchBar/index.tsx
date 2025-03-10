import { Button, styled, TextField } from '@mui/material';
import { useState } from 'react';
import CarService from '../../services/CarService';

const SearchContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin-top: 1px;
    margin-bottom: 10px;
    padding: 20px;
    width: 100%;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    max-width: 200px;  /* Tamanho máximo dos inputs */
    margin: 0 10px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    .MuiInputBase-root {
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .MuiOutlinedInput-root.Mui-focused fieldset {
        border-color: #3f51b5;
    }

    input {
        font-size: 16px;
        color: #333;
    }
`;

const ClearButton = styled(Button)`
    margin-left: 10px;
    background-color: #f44336;
    color: white;
    &:hover {
        background-color: #d32f2f;
    }
`;

const SubmitButton = styled(Button)`
    margin-left: 10px;
    background-color: #3f51b5;
    color: white;
    &:hover {
        background-color: #303f9f;
    }
`;

const SearchBar = ({setCar, setTotal}) =>{
  const [formData, setFormData] = useState({
    pais: "",
    fabricante: "",
    modelo: ""
  })
  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormData((prevState) => {
      return { ...prevState, [name]:value}
    })
  }
  const handleClear = () =>{
    const clearedFormData ={
      pais: "",
      fabricante: "",
      modelo: ""
    };
    setFormData(clearedFormData)
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    let carService = new CarService();
    carService.search(formData).then((response) =>{
      setCar(response.data)
      setTotal(response.data.length)
    })
  }
  return (
    <SearchContainer>
      <form onSubmit={handleSubmit} style={{display: 'flex', alignItems:'center'}}>
        <StyledTextField
          label="Modelo"
          variant="outlined"
          name="modelo"
          onChange={handleChange}
          value={formData.modelo}
        >

        </StyledTextField>
        <StyledTextField
          label="Fabricante"
          variant="outlined"
          name="fabricante"
          onChange={handleChange}
          value={formData.fabricante}
        >

        </StyledTextField>

        <StyledTextField
          label="País"
          variant="outlined"
          name="pais"
          onChange={handleChange}
          value={formData.pais}
        >

        </StyledTextField>
      <ClearButton variant="contained" onClick={handleClear} >Limpar</ClearButton>
        <SubmitButton variant="contained" type="submit"> Buscar</SubmitButton>
      </form>

    </SearchContainer>
  )
}
export default SearchBar;