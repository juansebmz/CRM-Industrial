import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

const Root = styled('div')(({ theme }) => ({
  '& .form': {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  '& .content': {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%',
  },
  '& .textFields': {
    margin: 10,
  },
}));

function Form() {
  const [form, setForm] = useState({
    name: '',
    lastname: '',
  });

  const onChangeText = event => {
    setForm(event.target.value);
  };

  const [error, setError] = useState(false);
  const [helpertext, setHelpertext] = useState(false);

  const sendInfo = () => {
    if (form.name === '' || form.lastname === '') {
      alert('No has llenado todos los campos');
      setError(true);
      setHelpertext(true);
    } else {
      alert('Tus datos se han enviado');
      setError(false);
      setHelpertext(false);
    }
  };

  return (
    <div>
      <Root>
        <div className="form">
          <div className="content">
            <TextField
              onChange={onChangeText}
              value={form.name}
              className="textFields"
              label="Nombre"
              error={error}
              helperText={helpertext === true ? 'Llena los campos' : false }
            />
            <TextField
              onChange={onChangeText}
              value={form.lastname}
              className="textFields"
              label="Apellido"
              error={error}
              helperText={helpertext === true ? 'Llena los campos' : false }
            />
            <Button variant="contained" onClick={sendInfo}>
              Enviar
            </Button>
          </div>
        </div>
      </Root>
    </div>
  );
}

export default Form;
