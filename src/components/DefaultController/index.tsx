import { MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

interface DefaultSelectProps {
  name: string;
  label: string;
  id: string;
  control: any;
  errors: any;
  service: any,
  children?: React.ReactNode;
}

const DefaultController: React.FC<DefaultSelectProps> = ({
                                                           name,
                                                           label,
                                                           id,
                                                           control,
                                                           errors,
                                                           service,
                                                           children
                                                         }) => {

  const [values, setValues] = useState([]);
  useEffect(() => {
    service.getAll().then((response) =>{
      setValues(response.data)
      console.log(response.data)
    })
  }, []);
  return <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <TextField
        id={id}
        select
        label={label}
        {...field}
        error={!!errors}
        helperText={errors?.message}
        fullWidth
      >
        {values.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    )}
  />;
};
export default DefaultController;