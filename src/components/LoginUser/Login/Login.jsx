import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../Singup/Signup';
import { axiosClient } from "../../../api/axios";
import Navbar from "../../Navbar/Navbar";

const Login = () => {
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();   // Initialize useHistory hook

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };

	await axiosClient.get('/sanctum/csrf-cookie')
	axiosClient.post('api/login', data)
    .then(response => {
        console.log('Login successful', response.data);
		localStorage.setItem('authToken', response.data.token);  // Store token in localStorage
        if (response.data.message) {
            alert(response.data.message);  // Displaying the success message
        }
        navigate('/VotingPage');
    })
    .catch(error => {
        console.error('Login error', error.response.data);
        if (error.response && error.response.data && error.response.data.error) {
            alert(error.response.data.error);  // Optionally, display error message
        }
    });
};


  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };


	return (<div><Navbar/>
		<div className={styles.login_container}>
			
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleLogin}>
						<h1>Connectez-vous à votre compte</h1>
						<input
						id="email"
						name="email"
						type="text"
						placeholder="Adresse e-mail ou numéro de tél."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						/>
						<input
						id="password"
						name="password"
						type="password"
						placeholder="Mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						/>
						<button type="submit" id="login-button"><h3>Se connecter</h3></button>
					</form>
					
				</div>
				<div className={styles.right}>
					<h1>FAIS ENTENDRE TA VOIX</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
						<h3>S'inscrire</h3>	
						</button>
					</Link>
				</div>
			</div>
		</div></div>
	);
};

export default Login;
