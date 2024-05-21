import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import firebase from './firebaseconfing';


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
		width: 577
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


const Signup = () => {


	const [user, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submit = async(e) => {
		e.preventDefault()
		try {
			const user1 = await firebase.auth().createUserWithEmailAndPassword(email, password)
			if(user1){
				alert("cuenta creada exitosamente")
			}
		} catch (error) {
			alert(error)
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
										onChange={(e) => setUser(e.target.value)}
										value={user}
										className="textFields"
									/>
									<div>correo</div>
									<TextField
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										className="textFields"
									/>
									<div>Contraseña</div>
									<TextField
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										className="textFields"
									/>
									<div style={{ fontSize: 11, marginBlockEnd: 20 }}>¿ya estas registrado? haz click <a href='/'>aquí</a></div>
									<Button variant="contained" onClick={submit}>
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

export default Signup;
