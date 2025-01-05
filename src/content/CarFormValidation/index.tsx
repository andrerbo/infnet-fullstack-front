import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import DefaultSelect from '../../components/DefaultSelect';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import CarService from '../../services/CarService';
import ColorsService from '../../services/ColorsService';
import CountriesService from '../../services/CountriesService';
import ManufacturersService from '../../services/ManufacturersService';
import PageHeader from './PageHeader';


const CarFormValidation:React.FC = () => {
  interface IFormInput{
    id: number;
    modelo: string;
    pais: string,
    fabricante: string,
    cor: string,
    ano: number,
    cavalosDePotencia: number
  }

  const [formData, setFormData] = useState({
    modelo: "",
    pais: "",
    fabricante: "",
    cor: "",
    ano: 0,
    cavalosDePotencia: 0,
  })

  const schema = yup.object().shape({
    modelo: yup.string()
      .required("Modelo é obrigatório")
      .min(3, "Modelo deve ter mais de 3 letras.")
      .max(20, "Modelo deve ter até 20 letras."),
    pais: yup.string(),
    fabricante: yup.string(),
    cor: yup.string(),
    ano: yup.number()
      .moreThan(1949, "Ano não pode ser inferior a 1950")
      .lessThan(2026, "Ano não pode ser superiror a 2025"),
    cavalosDePotencia: yup.number()
      .moreThan(9, "HPs não pode ser inferior a 10")
      .lessThan(999, "HPs não pode ser superiror a 1000"),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)})

  const onSubmit = (data: IFormInput) =>{
    let carService :CarService = new CarService();
    console.log(data);
    carService.save(data).then((reponse =>{
      toastSucesso();
    })).catch((error) =>{
      toastError()
    })
  }

  const toastSucesso = () => toast.success("Carro cadastrado com sucesso",{position: 'top-center'})

  const toastError = () => toast.error("Ops, algo de errado aconteceu.",{position: 'top-center'})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
  <>
    <Helmet>
      <title>Novo Carro</title>
    </Helmet>
    <PageTitleWrapper>
      <PageHeader />
    </PageTitleWrapper>
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={6}
      >
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Preencha o formulario" />
            <Divider />
            <CardContent>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '42.7ch' }
                }}
                noValidate
                autoComplete="off"
              >
                  <TextField id="modelo"
                             required
                             label = "Modelo"
                             name = "modelo"
                             {...register("modelo")}
                             error={!! errors.modelo }
                             helperText={errors.modelo?.message}
                             value={formData.modelo}
                             onChange={handleChange}
                  />
                  <DefaultSelect name="pais"
                                 value={formData.pais}
                                 label="País"
                                 id="pais"
                                 handleChange={handleChange}
                                 service={new CountriesService()}
                                 register={register}
                  />
                <DefaultSelect name="fabricante"
                               value={formData.fabricante}
                               label="Fabricante"
                               id="fabricante"
                               handleChange={handleChange}
                               service={new ManufacturersService()}
                               register={register}
                />
                <DefaultSelect name="cor"
                               value={formData.cor}
                               label="Cor"
                               id="cor"
                               handleChange={handleChange}
                               service={new ColorsService()}
                               register={register}
                />
                <TextField id="ano"
                           required
                           label="Ano"
                           name="ano"
                           {...register("ano")}
                           error={!! errors.ano }
                           helperText={errors.ano?.message}
                           type="number"
                           value={formData.ano}
                           onChange={handleChange}
                />
                <TextField id="cavalosDePotencia"
                           required
                           label="Cavalos De Potência"
                           name="cavalosDePotencia"
                           {...register("cavalosDePotencia")}
                           error={!! errors.cavalosDePotencia }
                           helperText={errors.cavalosDePotencia?.message}
                           type="number"
                           value={formData.cavalosDePotencia}
                           onChange={handleChange}
                />
                <Grid container spacing={3}>
                  <Grid sm item>
                    <Button type="submit" fullWidth variant="contained">
                      Cadastrar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </>
  );
}
export default CarFormValidation;