import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import PageHeader from './PageHeader';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select
} from '@mui/material';
import TextField from '@mui/material/TextField';
import DefaultSelect from '../../components/DefaultSelect';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CarService from '../../services/CarService';
import CountriesService from '../../services/CountriesService';
import ManufacturersService from '../../services/ManufacturersService';
import ColorsService from '../../services/ColorsService';
import { useParams } from 'react-router';
import { Car } from 'src/models/car';
import DefaultController from '../../components/DefaultController';

// interface TypePayload {
//   id: number;
//   name: string;
// }

const CarFormValidation:React.FC = () => {

  let carService :CarService = new CarService();

  const {id} = useParams();

  const [idCar, setIdCar] = useState(null)

  useEffect(() => {
    carService.getById(parseInt(id)).then((response) => {
      console.log(response.data)
      const car :Car = response.data
      setValue("modelo", car.modelo || "", {shouldTouch :true})
      setValue("pais", car.pais || "", {shouldTouch :true})
      setValue("fabricante", car.fabricante || "", {shouldTouch :true})
      setValue("cor", car.cor || "", {shouldTouch :true})
      setValue("ano", car.ano || 0, {shouldTouch :true})
      setValue("cavalosDePotencia", car.cavalosDePotencia || 0, {shouldTouch :true})
    })
  }, []);


  interface IFormInput{
    id: number;
    modelo: string;
    pais: string,
    fabricante: string,
    cor: string,
    ano: number,
    cavalosDePotencia: number
  }

  const schema = yup.object().shape({
    modelo: yup.string()
      .required()
      .min(3)
      .max(20),
    pais: yup.string()
      .required(),
    fabricante: yup.string(),
    cor: yup.string()
      .required(),
    ano: yup.number()
      .required()
      .moreThan(1949)
      .lessThan(2026),
    cavalosDePotencia: yup.number()
      .required()
      .moreThan(9)
      .lessThan(999),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    // trigger,
    control
  } = useForm({resolver: yupResolver(schema)})


  const onSubmit = (data: IFormInput) =>{
      carService.update(parseInt(id), data).then((reponse =>{
      console.log("Atualizado com sucesso");
      toastSucesso();
    })).catch((error) =>{
      console.log(error);
      toastError()
    })
  }

  const toastSucesso = () => toast.success("Carro atualizado com sucesso",{position: 'top-center'})

  const toastError = () => toast.error("Ops, algo de errado aconteceu.",{position: 'top-center'})

  return (
  <>
    <Helmet>
      <title>Update Carro</title>
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
            <CardHeader title="Atualize o formulário" />
            <Divider />
            <CardContent>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}

                sx={{
                  '& .MuiTextField-root': { m: 1, width: '40ch' }
                }}
                noValidate
                autoComplete="off"
              >

                <Grid container spacing={3}>
                  <Grid sm item>
                    <TextField
                        fullWidth
                        required
                        id="modelo"
                        name="modelo"
                        label="Modelo"
                        {...register("modelo")}
                        error={ !! errors.modelo }
                        helperText={errors.modelo?.message}
                    />
                  </Grid>
                  <Grid sm item>
                    <TextField id="ano"
                               required
                               label = "Ano"
                               name = "ano"
                               {...register("ano")}
                               error={!! errors.ano }
                               helperText={errors.ano?.message}
                               // value={formData.ano}
                               // onChange={handleChange}
                    />
                  </Grid>
                  <Grid sm item>
                    <TextField id="cavalosDePotencia"
                               required
                               label = "Cavalos De Potência"
                               name = "cavalosDePotencia"
                               {...register("cavalosDePotencia")}
                               error={!! errors.cavalosDePotencia }
                               helperText={errors.cavalosDePotencia?.message}
                               // value={formData.cavalosDePotencia}
                               // onChange={handleChange}
                    />
                  </Grid>
                  <Grid sm item>
                    <DefaultController name="pais"
                                       label="País"
                                       id="pais"
                                       control={control}
                                       errors={errors.pais}
                                       service={new CountriesService()}
                    />
                  </Grid>
                  <Grid sm item>
                    <DefaultController name="fabricante"
                                       label="Fabricante"
                                       id="fabricante"
                                       control={control}
                                       errors={errors.fabricante}
                                       service={new ManufacturersService()}
                    />
                  </Grid>
                  <Grid sm item>
                    <DefaultController name="cor"
                                       label="Cor"
                                       id="cor"
                                       control={control}
                                       errors={errors.cor}
                                       service={new ColorsService()}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid sm item>
                    <Button type="submit" fullWidth variant="contained">
                      Atualizar
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