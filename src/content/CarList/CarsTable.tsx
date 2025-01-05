import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteItemConfirmationModal from '../../components/DeleteItemConfirmationModal';
import toast from 'react-hot-toast';
import CarModal from './CarModal';
import { useNavigate } from 'react-router';
import { Car } from '../../models/car';
import CarService from '../../services/CarService';
import SearchBar from '../../components/SearchBar';


const CarsTable:React.FC = () =>{
  const navigate = useNavigate()

  const theme = useTheme();

  const [showDetails, setShowDetails] = useState(false)

  const handleCloseDetails = () => {
    setShowDetails(false)
  }

  const handleOpenDetails = (car :Car) => {
    setSelectedRow(car)
    setShowDetails(true)
  }

  const [cars, setCars] = useState<Car[]>([]);

  const [page, setPage] = useState<number>(0);

  const [limit, setLimit] = useState<number>(10);

  const [total, setTotal]= useState<number>(0);

  const carService :CarService = new CarService();

  const toastSucesso = () => toast.success("Carro deletado com sucesso",{position: 'top-center'})

  const toastError = () => toast.error("Ops, algo de errado aconteceu.",{position: 'top-center'})

  const [selectedRow, setSelectedRow] = useState(null)

  const [openDelete, setOpenDelete] = useState(false)

  const handleDelete = (car :Car) =>{
    setSelectedRow(car)
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const handleConfirmDelete = () => {
    carService.delete(selectedRow.id).then(() => {
      carService.getAllPaginated(page, limit).then((response) =>{
        setTotal(parseInt(response.headers['x-total-count']))
        setCars(response.data);
        setOpenDelete(false)
        toastSucesso()
      })
    }).catch((error) =>{
      setOpenDelete(false)
      toastError()
    })

  }

  const handlePageChange =(e,newPage) =>{
    carService.getAllPaginated(newPage,limit).then((response) =>{
      setTotal(parseInt(response.headers['x-total-count']))
      setCars(response.data);
    })
    setPage(newPage)
  }

  const openEditCar = (car :Car) =>{
    navigate(`/home/edit-car/${car.id}`, {state:{mode:'update'}})
  }

  const handleLimitChange = (e) =>{
    setPage(0)
    setLimit(parseInt(e.target.value))
    carService.getAllPaginated(0,parseInt(e.target.value)).then((response) =>{
      setTotal(parseInt(response.headers['x-total-count']))
      setCars(response.data);
    })
  }

  useEffect(() => {
    carService.getAllPaginated(0,10).then((response) =>{
       setTotal(parseInt(response.headers['x-total-count']))
       setCars(response.data);
     })
  }, []);

  return (
    <Card>
      <CardHeader />
      <SearchBar setCar={setCars} setTotal={setTotal} />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">MODELO</TableCell>
              {/*<TableCell align="left">PAÍS</TableCell>*/}
              <TableCell align="left">FABRICANTE</TableCell>
              <TableCell align="left">ANO</TableCell>
              {/*<TableCell align="left">HPs</TableCell>*/}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {cars.map((car: Car) =>{
                return (
                  <TableRow hover key={car.id}>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {car.id}
                    </Typography>
                  </TableCell>

                <TableCell align="left">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    noWrap>
                    {car.modelo}
                  </Typography>
                </TableCell>

                {/*<TableCell align="left">*/}
                {/*  <Typography*/}
                {/*    variant="body1"*/}
                {/*    color="text.secondary"*/}
                {/*    gutterBottom*/}
                {/*    noWrap>*/}
                {/*    {car.pais}*/}
                {/*  </Typography>*/}
                {/*</TableCell>*/}

                <TableCell align="left">
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                    noWrap>
                    {car.fabricante}
                  </Typography>
                </TableCell>

                {/*<TableCell align="left">*/}
                {/*  <Typography*/}
                {/*    variant="body1"*/}
                {/*    color="text.secondary"*/}
                {/*    gutterBottom*/}
                {/*    noWrap>*/}
                {/*    {car.cor}*/}
                {/*  </Typography>*/}
                {/*</TableCell>*/}

                <TableCell align="left">
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                    noWrap>
                    {car.ano}
                  </Typography>
                </TableCell>

                {/*<TableCell align="left">*/}
                {/*  <Typography*/}
                {/*    variant="body1"*/}
                {/*    color="text.secondary"*/}
                {/*    gutterBottom*/}
                {/*    noWrap>*/}
                {/*    {car.cavalosDePotencia}*/}
                {/*  </Typography>*/}
                {/*</TableCell>*/}

                <TableCell align="right">
                  <Tooltip title="Detalhes" arrow>
                    <IconButton
                      onClick={() => handleOpenDetails(car)}
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small">
                      <AddTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar" arrow>
                    <IconButton
                      onClick={() => openEditCar(car)}
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small">
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Excluir" arrow>
                    <IconButton
                      onClick={() => handleDelete(car)}
                      sx={{
                        '&:hover': {
                          background: theme.colors.error.lighter
                        },
                        color: theme.palette.error.main
                      }}
                      color="inherit"
                      size="small">
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
                )
              })}

          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={limit}
          onRowsPerPageChange={handleLimitChange}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[10,25,50,70]}
        >
        </TablePagination>
      </Box>

      <DeleteItemConfirmationModal
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete} />
        { showDetails && <CarModal car={selectedRow} onClose={handleCloseDetails} /> }
    </Card>
  )
}
export default CarsTable