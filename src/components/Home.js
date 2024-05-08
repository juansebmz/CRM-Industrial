import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';


const Root = styled('div')(({ theme }) => ({
	'& .form': {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	'& .content': {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		margin: 50,

	},
	'& .table': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

	},
	'& .textFields': {
		margin: '10px 10px 5px 10px',
		backgroundColor: '#CDDEE5',
	},
	'& .img': {
		boxShadow: '2px 3px 10px #b8bac1',
		marginTop: 100,
		width: 459
	},
	'& .box': {
		boxShadow: '2px 3px 10px #b8bac1',
		marginTop: 100,
		width: 450,
	},
	'& .boxint': {
		backgroundColor: 'white',

	},
}));


function Home() {

	const [form, setForm] = useState({
		user: '',
		password: '',
	});


	const onChangeText = prop => event => {
		setForm({ ...form, [prop]: event.target.value });
	};

	const [showPassword, setShowPassword] = React.useState(false);



	const [error, setError] = useState(false);

	const sendInfo = () => {

		if (form.user === "" || form.password === "") {
			alert('No has llenado todos los campos');
			setError(true);
		} else {
			alert('Tus datos se han enviado');
			window.location.href = "Customers";
			setError(false);
			setForm({
				...form, user: "", password: "",

			});

		}
	};


	return (
		<div style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
			<Root>
				<div className='table'>
					<img className='img' src='img2.png' />
					<div className="box">
						<div className="boxint">
							<div className="form">
								<div className="content">
									<img src='img1.png' />
									<div>Usuario</div>
									<TextField
										onChange={onChangeText('user')}
										value={form.user}
										className="textFields"
										error={error}
									/>
									<div>Contraseña</div>
									<TextField
										onChange={onChangeText('password')}
										value={form.password}
										className="textFields"
										error={error}
										id="filled-adornment-password"
										type={showPassword ? 'text' : 'password'}
									/>
									<div style={{ fontSize: 11, marginBlockEnd: 20 }}>¿has olvidado la Contraseña? haz click aquí </div>
									<Button variant="contained" onClick={sendInfo}>
										Iniciar sesión
									</Button>

								</div>
							</div>
						</div>
					</div>
				</div>
			</Root>
		</div>
	);
}

export default Home;
